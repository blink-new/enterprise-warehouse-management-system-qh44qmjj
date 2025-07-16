import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createClient } from '@blinkdotnew/sdk'

const blink = createClient({
  projectId: 'enterprise-warehouse-management-system-qh44qmjj',
  authRequired: true
})

// Base query using Blink SDK
const blinkBaseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: async (headers) => {
    const user = await blink.auth.me()
    if (user) {
      headers.set('authorization', `Bearer ${user.id}`)
    }
    return headers
  },
})

export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: blinkBaseQuery,
  tagTypes: ['Product', 'Order', 'Warehouse', 'User'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const products = await blink.db.products.list({
            orderBy: { created_at: 'desc' }
          })
          return { data: products }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Product'],
    }),
    
    addProduct: builder.mutation<any, any>({
      queryFn: async (product) => {
        try {
          const user = await blink.auth.me()
          const newProduct = await blink.db.products.create({
            ...product,
            userId: user.id,
            createdAt: new Date().toISOString(),
          })
          return { data: newProduct }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Product'],
    }),
    
    updateProduct: builder.mutation<any, { id: string; updates: any }>({
      queryFn: async ({ id, updates }) => {
        try {
          await blink.db.products.update(id, updates)
          return { data: { id, ...updates } }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Product'],
    }),
    
    deleteProduct: builder.mutation<void, string>({
      queryFn: async (id) => {
        try {
          await blink.db.products.delete(id)
          return { data: undefined }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Product'],
    }),
    
    // Orders
    getOrders: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const orders = await blink.db.orders.list({
            orderBy: { created_at: 'desc' }
          })
          return { data: orders }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Order'],
    }),
    
    addOrder: builder.mutation<any, any>({
      queryFn: async (order) => {
        try {
          const user = await blink.auth.me()
          const newOrder = await blink.db.orders.create({
            ...order,
            userId: user.id,
            createdAt: new Date().toISOString(),
          })
          return { data: newOrder }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Order'],
    }),
    
    updateOrder: builder.mutation<any, { id: string; updates: any }>({
      queryFn: async ({ id, updates }) => {
        try {
          await blink.db.orders.update(id, updates)
          return { data: { id, ...updates } }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Order'],
    }),
    
    // Warehouses
    getWarehouses: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const warehouses = await blink.db.warehouses.list({
            orderBy: { created_at: 'desc' }
          })
          return { data: warehouses }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Warehouse'],
    }),
    
    addWarehouse: builder.mutation<any, any>({
      queryFn: async (warehouse) => {
        try {
          const user = await blink.auth.me()
          const newWarehouse = await blink.db.warehouses.create({
            ...warehouse,
            userId: user.id,
            createdAt: new Date().toISOString(),
          })
          return { data: newWarehouse }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Warehouse'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useGetWarehousesQuery,
  useAddWarehouseMutation,
} = warehouseApi