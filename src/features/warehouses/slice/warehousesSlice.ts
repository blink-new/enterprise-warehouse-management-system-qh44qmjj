import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WarehousesState {
  selectedWarehouses: string[]
  filters: {
    status: string
    search: string
    city: string
    state: string
  }
  sortBy: {
    field: string
    direction: 'asc' | 'desc'
  }
  currentWarehouseId: string | null
}

const initialState: WarehousesState = {
  selectedWarehouses: [],
  filters: {
    status: '',
    search: '',
    city: '',
    state: '',
  },
  sortBy: {
    field: 'name',
    direction: 'asc',
  },
  currentWarehouseId: null,
}

const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    setSelectedWarehouses: (state, action: PayloadAction<string[]>) => {
      state.selectedWarehouses = action.payload
    },
    toggleWarehouseSelection: (state, action: PayloadAction<string>) => {
      const warehouseId = action.payload
      const index = state.selectedWarehouses.indexOf(warehouseId)
      if (index > -1) {
        state.selectedWarehouses.splice(index, 1)
      } else {
        state.selectedWarehouses.push(warehouseId)
      }
    },
    clearSelection: (state) => {
      state.selectedWarehouses = []
    },
    setFilters: (state, action: PayloadAction<Partial<WarehousesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        search: '',
        city: '',
        state: '',
      }
    },
    setSortBy: (state, action: PayloadAction<WarehousesState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setCurrentWarehouseId: (state, action: PayloadAction<string | null>) => {
      state.currentWarehouseId = action.payload
    },
  },
})

export const {
  setSelectedWarehouses,
  toggleWarehouseSelection,
  clearSelection,
  setFilters,
  clearFilters,
  setSortBy,
  setCurrentWarehouseId,
} = warehousesSlice.actions

export default warehousesSlice.reducer