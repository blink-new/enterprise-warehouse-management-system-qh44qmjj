import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { blink } from '../../../blink/client'
import { DashboardStats } from '../../../types'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['DashboardStats'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      queryFn: async () => {
        try {
          // Get stats from multiple tables
          const [products, orders, warehouses, inventory] = await Promise.all([
            blink.db.products.list({ limit: 1000 }),
            blink.db.orders.list({ limit: 1000 }),
            blink.db.warehouses.list({ limit: 1000 }),
            blink.db.inventory.list({ limit: 1000 }),
          ])

          const lowStockItems = inventory.filter(item => 
            item.quantityAvailable <= (item.product?.reorderPoint || 10)
          ).length

          const pendingOrders = orders.filter(order => 
            order.status === 'pending' || order.status === 'processing'
          ).length

          const totalRevenue = orders
            .filter(order => order.status === 'delivered')
            .reduce((sum, order) => sum + order.totalAmount, 0)

          const inventoryValue = inventory.reduce((sum, item) => 
            sum + (item.quantityOnHand * (item.product?.unitPrice || 0)), 0
          )

          const totalCapacity = warehouses.reduce((sum, wh) => sum + wh.capacity, 0)
          const totalUtilization = warehouses.reduce((sum, wh) => sum + wh.currentUtilization, 0)
          const utilizationRate = totalCapacity > 0 ? (totalUtilization / totalCapacity) * 100 : 0

          const stats: DashboardStats = {
            totalProducts: products.length,
            totalOrders: orders.length,
            totalWarehouses: warehouses.length,
            lowStockItems,
            pendingOrders,
            totalRevenue,
            inventoryValue,
            utilizationRate,
          }

          return { data: stats }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['DashboardStats'],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi