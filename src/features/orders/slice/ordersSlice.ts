import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrdersState {
  selectedOrders: string[]
  filters: {
    status: string
    priority: string
    dateRange: {
      start: string
      end: string
    }
    search: string
  }
  sortBy: {
    field: string
    direction: 'asc' | 'desc'
  }
  currentOrderId: string | null
}

const initialState: OrdersState = {
  selectedOrders: [],
  filters: {
    status: '',
    priority: '',
    dateRange: {
      start: '',
      end: '',
    },
    search: '',
  },
  sortBy: {
    field: 'orderDate',
    direction: 'desc',
  },
  currentOrderId: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrders: (state, action: PayloadAction<string[]>) => {
      state.selectedOrders = action.payload
    },
    toggleOrderSelection: (state, action: PayloadAction<string>) => {
      const orderId = action.payload
      const index = state.selectedOrders.indexOf(orderId)
      if (index > -1) {
        state.selectedOrders.splice(index, 1)
      } else {
        state.selectedOrders.push(orderId)
      }
    },
    clearSelection: (state) => {
      state.selectedOrders = []
    },
    setFilters: (state, action: PayloadAction<Partial<OrdersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        priority: '',
        dateRange: {
          start: '',
          end: '',
        },
        search: '',
      }
    },
    setSortBy: (state, action: PayloadAction<OrdersState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setCurrentOrderId: (state, action: PayloadAction<string | null>) => {
      state.currentOrderId = action.payload
    },
  },
})

export const {
  setSelectedOrders,
  toggleOrderSelection,
  clearSelection,
  setFilters,
  clearFilters,
  setSortBy,
  setCurrentOrderId,
} = ordersSlice.actions

export default ordersSlice.reducer