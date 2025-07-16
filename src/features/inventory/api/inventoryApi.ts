import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { blink } from '../../../blink/client'
import { Inventory, Product } from '../../../types'

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Inventory', 'Product'],
  endpoints: (builder) => ({
    getInventory: builder.query<Inventory[], void>({
      queryFn: async () => {
        try {
          const inventory = await blink.db.inventory.list({
            orderBy: { createdAt: 'desc' },
            limit: 1000,
          })

          // Fetch related products and warehouses
          const enrichedInventory = await Promise.all(
            inventory.map(async (item) => {
              const [product, warehouse] = await Promise.all([
                item.productId ? blink.db.products.list({ where: { id: item.productId }, limit: 1 }) : Promise.resolve([]),
                item.warehouseId ? blink.db.warehouses.list({ where: { id: item.warehouseId }, limit: 1 }) : Promise.resolve([]),
              ])

              return {
                ...item,
                product: product[0] || undefined,
                warehouse: warehouse[0] || undefined,
              }
            })
          )

          return { data: enrichedInventory }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Inventory'],
    }),

    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        try {
          const products = await blink.db.products.list({
            orderBy: { createdAt: 'desc' },
            limit: 1000,
          })
          return { data: products }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation<Product, Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>({
      queryFn: async (productData) => {
        try {
          const user = await blink.auth.me()
          const product = await blink.db.products.create({
            ...productData,
            userId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          return { data: product }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Product', 'Inventory'],
    }),

    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      queryFn: async ({ id, data }) => {
        try {
          const product = await blink.db.products.update(id, {
            ...data,
            updatedAt: new Date().toISOString(),
          })
          return { data: product }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Product', 'Inventory'],
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
      invalidatesTags: ['Product', 'Inventory'],
    }),

    updateInventory: builder.mutation<Inventory, { id: string; data: Partial<Inventory> }>({
      queryFn: async ({ id, data }) => {
        try {
          const inventory = await blink.db.inventory.update(id, {
            ...data,
            updatedAt: new Date().toISOString(),
          })
          return { data: inventory }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } }
        }
      },
      invalidatesTags: ['Inventory'],
    }),
  }),
})

export const {
  useGetInventoryQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateInventoryMutation,
} = inventoryApi