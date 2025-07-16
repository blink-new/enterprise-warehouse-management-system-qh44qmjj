import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InventoryState {
  selectedProducts: string[]
  filters: {
    category: string
    status: string
    search: string
    lowStock: boolean
  }
  sortBy: {
    field: string
    direction: 'asc' | 'desc'
  }
  viewMode: 'table' | 'grid'
}

const initialState: InventoryState = {
  selectedProducts: [],
  filters: {
    category: '',
    status: '',
    search: '',
    lowStock: false,
  },
  sortBy: {
    field: 'name',
    direction: 'asc',
  },
  viewMode: 'table',
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setSelectedProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload
    },
    toggleProductSelection: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      const index = state.selectedProducts.indexOf(productId)
      if (index > -1) {
        state.selectedProducts.splice(index, 1)
      } else {
        state.selectedProducts.push(productId)
      }
    },
    clearSelection: (state) => {
      state.selectedProducts = []
    },
    setFilters: (state, action: PayloadAction<Partial<InventoryState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        status: '',
        search: '',
        lowStock: false,
      }
    },
    setSortBy: (state, action: PayloadAction<InventoryState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setViewMode: (state, action: PayloadAction<InventoryState['viewMode']>) => {
      state.viewMode = action.payload
    },
  },
})

export const {
  setSelectedProducts,
  toggleProductSelection,
  clearSelection,
  setFilters,
  clearFilters,
  setSortBy,
  setViewMode,
} = inventorySlice.actions

export default inventorySlice.reducer