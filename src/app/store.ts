import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Feature APIs
import { dashboardApi } from '../features/dashboard/api/dashboardApi'
import { inventoryApi } from '../features/inventory/api/inventoryApi'
import { ordersApi } from '../features/orders/api/ordersApi'
import { warehousesApi } from '../features/warehouses/api/warehousesApi'
import { reportsApi } from '../features/reports/api/reportsApi'

// Feature Slices
import authReducer from '../features/auth/slice/authSlice'
import uiReducer from '../features/ui/slice/uiSlice'

export const store = configureStore({
  reducer: {
    // Feature slices
    auth: authReducer,
    ui: uiReducer,
    
    // API slices
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      inventoryApi.middleware,
      ordersApi.middleware,
      warehousesApi.middleware,
      reportsApi.middleware
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch