import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { blink } from '../../../blink/client'
import { Order, OrderItem } from '../../../types'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Order', 'OrderItem'],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      queryFn: async () => {
        try {
          const orders = await blink.db.orders.list({
            orderBy: { createdAt: 'desc' }
          })
          return { data: orders }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Order'],
    }),

    getOrder: builder.query<Order, string>({
      queryFn: async (id) => {
        try {
          const orders = await blink.db.orders.list({
            where: { id }
          })
          if (orders.length === 0) {
            return { error: { status: 'NOT_FOUND', error: 'Order not found' } }
          }
          return { data: orders[0] }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation<Order, Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>({
      queryFn: async (orderData) => {
        try {
          const user = await blink.auth.me()
          const order = await blink.db.orders.create({
            ...orderData,
            userId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          return { data: order }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Order'],
    }),

    updateOrder: builder.mutation<Order, { id: string; data: Partial<Order> }>({
      queryFn: async ({ id, data }) => {
        try {
          const updatedOrder = await blink.db.orders.update(id, {
            ...data,
            updatedAt: new Date().toISOString(),
          })
          return { data: updatedOrder }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),

    deleteOrder: builder.mutation<void, string>({
      queryFn: async (id) => {
        try {
          await blink.db.orders.delete(id)
          return { data: undefined }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Order'],
    }),

    getOrderItems: builder.query<OrderItem[], string>({
      queryFn: async (orderId) => {
        try {
          const items = await blink.db.orderItems.list({
            where: { orderId },
            orderBy: { createdAt: 'asc' }
          })
          return { data: items }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['OrderItem'],
    }),

    createOrderItem: builder.mutation<OrderItem, Omit<OrderItem, 'id' | 'createdAt' | 'userId'>>({
      queryFn: async (itemData) => {
        try {
          const user = await blink.auth.me()
          const item = await blink.db.orderItems.create({
            ...itemData,
            userId: user.id,
            createdAt: new Date().toISOString(),
          })
          return { data: item }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['OrderItem'],
    }),

    updateOrderItem: builder.mutation<OrderItem, { id: string; data: Partial<OrderItem> }>({
      queryFn: async ({ id, data }) => {
        try {
          const updatedItem = await blink.db.orderItems.update(id, data)
          return { data: updatedItem }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['OrderItem'],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderItemsQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
} = ordersApi