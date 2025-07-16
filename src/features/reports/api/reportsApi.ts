import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { blink } from '../../../blink/client'

interface ReportData {
  id: string
  name: string
  type: 'inventory' | 'sales' | 'warehouse' | 'financial'
  data: any[]
  generatedAt: string
  parameters: Record<string, any>
}

export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    generateInventoryReport: builder.mutation<ReportData, {
      dateRange: { start: string; end: string }
      warehouseId?: string
      categoryId?: string
    }>({
      queryFn: async (params) => {
        try {
          const user = await blink.auth.me()
          
          let whereClause: any = { userId: user.id }
          if (params.warehouseId) {
            whereClause.warehouseId = params.warehouseId
          }

          const inventory = await blink.db.inventory.list({
            where: whereClause,
            orderBy: { updatedAt: 'desc' }
          })

          const products = await blink.db.products.list({
            where: { userId: user.id }
          })

          const warehouses = await blink.db.warehouses.list({
            where: { userId: user.id }
          })

          const reportData = inventory.map(item => {
            const product = products.find(p => p.id === item.productId)
            const warehouse = warehouses.find(w => w.id === item.warehouseId)
            
            return {
              productName: product?.name || 'Unknown',
              sku: product?.sku || 'N/A',
              warehouseName: warehouse?.name || 'Unknown',
              quantityOnHand: item.quantityOnHand,
              quantityReserved: item.quantityReserved,
              quantityAvailable: item.quantityAvailable,
              unitPrice: product?.unitPrice || 0,
              totalValue: item.quantityOnHand * (product?.unitPrice || 0),
              reorderPoint: product?.reorderPoint || 0,
              status: item.quantityAvailable <= (product?.reorderPoint || 0) ? 'Low Stock' : 'In Stock',
              lastUpdated: item.updatedAt,
            }
          })

          const report: ReportData = {
            id: `inv_${Date.now()}`,
            name: 'Inventory Report',
            type: 'inventory',
            data: reportData,
            generatedAt: new Date().toISOString(),
            parameters: params,
          }

          return { data: report }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
    }),

    generateSalesReport: builder.mutation<ReportData, {
      dateRange: { start: string; end: string }
      warehouseId?: string
    }>({
      queryFn: async (params) => {
        try {
          const user = await blink.auth.me()
          
          let whereClause: any = { 
            userId: user.id,
            orderDate: {
              gte: params.dateRange.start,
              lte: params.dateRange.end,
            }
          }
          
          if (params.warehouseId) {
            whereClause.warehouseId = params.warehouseId
          }

          const orders = await blink.db.orders.list({
            where: whereClause,
            orderBy: { orderDate: 'desc' }
          })

          const warehouses = await blink.db.warehouses.list({
            where: { userId: user.id }
          })

          const reportData = orders.map(order => {
            const warehouse = warehouses.find(w => w.id === order.warehouseId)
            
            return {
              orderNumber: order.orderNumber,
              customerName: order.customerName,
              orderDate: order.orderDate,
              status: order.status,
              priority: order.priority,
              warehouseName: warehouse?.name || 'Unknown',
              totalAmount: order.totalAmount,
              shippedDate: order.shippedDate,
              requiredDate: order.requiredDate,
            }
          })

          const totalRevenue = reportData.reduce((sum, order) => sum + order.totalAmount, 0)
          const averageOrderValue = reportData.length > 0 ? totalRevenue / reportData.length : 0

          const report: ReportData = {
            id: `sales_${Date.now()}`,
            name: 'Sales Report',
            type: 'sales',
            data: reportData,
            generatedAt: new Date().toISOString(),
            parameters: {
              ...params,
              summary: {
                totalOrders: reportData.length,
                totalRevenue,
                averageOrderValue,
              }
            },
          }

          return { data: report }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
    }),

    generateWarehouseReport: builder.mutation<ReportData, void>({
      queryFn: async () => {
        try {
          const user = await blink.auth.me()
          
          const warehouses = await blink.db.warehouses.list({
            where: { userId: user.id },
            orderBy: { name: 'asc' }
          })

          const inventory = await blink.db.inventory.list({
            where: { userId: user.id }
          })

          const reportData = warehouses.map(warehouse => {
            const warehouseInventory = inventory.filter(item => item.warehouseId === warehouse.id)
            const totalItems = warehouseInventory.reduce((sum, item) => sum + item.quantityOnHand, 0)
            
            return {
              name: warehouse.name,
              address: `${warehouse.address}, ${warehouse.city}, ${warehouse.state} ${warehouse.zipCode}`,
              managerName: warehouse.managerName || 'N/A',
              capacity: warehouse.capacity,
              currentUtilization: warehouse.currentUtilization,
              utilizationPercentage: (warehouse.currentUtilization / warehouse.capacity) * 100,
              totalItems,
              status: warehouse.status,
              phone: warehouse.phone || 'N/A',
              email: warehouse.email || 'N/A',
            }
          })

          const report: ReportData = {
            id: `warehouse_${Date.now()}`,
            name: 'Warehouse Report',
            type: 'warehouse',
            data: reportData,
            generatedAt: new Date().toISOString(),
            parameters: {},
          }

          return { data: report }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
    }),
  }),
})

export const {
  useGenerateInventoryReportMutation,
  useGenerateSalesReportMutation,
  useGenerateWarehouseReportMutation,
} = reportsApi