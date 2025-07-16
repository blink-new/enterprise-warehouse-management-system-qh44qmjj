import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { blink } from '../../../blink/client'
import { Warehouse } from '../../../types'

export const warehousesApi = createApi({
  reducerPath: 'warehousesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Warehouse'],
  endpoints: (builder) => ({
    getWarehouses: builder.query<Warehouse[], void>({
      queryFn: async () => {
        try {
          const warehouses = await blink.db.warehouses.list({
            orderBy: { name: 'asc' }
          })
          return { data: warehouses }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Warehouse'],
    }),

    getWarehouse: builder.query<Warehouse, string>({
      queryFn: async (id) => {
        try {
          const warehouses = await blink.db.warehouses.list({
            where: { id }
          })
          if (warehouses.length === 0) {
            return { error: { status: 'NOT_FOUND', error: 'Warehouse not found' } }
          }
          return { data: warehouses[0] }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: (result, error, id) => [{ type: 'Warehouse', id }],
    }),

    createWarehouse: builder.mutation<Warehouse, Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>({
      queryFn: async (warehouseData) => {
        try {
          const user = await blink.auth.me()
          const warehouse = await blink.db.warehouses.create({
            ...warehouseData,
            userId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          return { data: warehouse }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Warehouse'],
    }),

    updateWarehouse: builder.mutation<Warehouse, { id: string; data: Partial<Warehouse> }>({
      queryFn: async ({ id, data }) => {
        try {
          const updatedWarehouse = await blink.db.warehouses.update(id, {
            ...data,
            updatedAt: new Date().toISOString(),
          })
          return { data: updatedWarehouse }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Warehouse', id }],
    }),

    deleteWarehouse: builder.mutation<void, string>({
      queryFn: async (id) => {
        try {
          await blink.db.warehouses.delete(id)
          return { data: undefined }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Warehouse'],
    }),
  }),
})

export const {
  useGetWarehousesQuery,
  useGetWarehouseQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehousesApi