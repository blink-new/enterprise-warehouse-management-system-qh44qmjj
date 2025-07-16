import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
  dateRange: {
    start: string
    end: string
  }
  selectedMetrics: string[]
  refreshInterval: number
  chartType: 'line' | 'bar' | 'area'
}

const initialState: DashboardState = {
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    end: new Date().toISOString().split('T')[0], // today
  },
  selectedMetrics: ['revenue', 'orders', 'inventory'],
  refreshInterval: 30000, // 30 seconds
  chartType: 'line',
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.dateRange = action.payload
    },
    setSelectedMetrics: (state, action: PayloadAction<string[]>) => {
      state.selectedMetrics = action.payload
    },
    toggleMetric: (state, action: PayloadAction<string>) => {
      const metric = action.payload
      const index = state.selectedMetrics.indexOf(metric)
      if (index > -1) {
        state.selectedMetrics.splice(index, 1)
      } else {
        state.selectedMetrics.push(metric)
      }
    },
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload
    },
    setChartType: (state, action: PayloadAction<DashboardState['chartType']>) => {
      state.chartType = action.payload
    },
  },
})

export const {
  setDateRange,
  setSelectedMetrics,
  toggleMetric,
  setRefreshInterval,
  setChartType,
} = dashboardSlice.actions

export default dashboardSlice.reducer