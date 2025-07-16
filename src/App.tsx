import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { store } from './app/store'
import { theme } from './app/theme'
import { blink } from './blink/client'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { setUser, setLoading } from './features/auth/slice/authSlice'

// Layout Components
import Layout from './shared/components/Layout'
import LoadingScreen from './shared/components/LoadingScreen'
import LoginScreen from './shared/components/LoginScreen'

// Feature Pages
import DashboardPage from './features/dashboard/pages/DashboardPage'
import InventoryPage from './features/inventory/pages/InventoryPage'
import OrdersPage from './features/orders/pages/OrdersPage'
import WarehousesPage from './features/warehouses/pages/WarehousesPage'
import ReportsPage from './features/reports/pages/ReportsPage'
import SettingsPage from './features/settings/pages/SettingsPage'

function AppContent() {
  const dispatch = useAppDispatch()
  const { user, isLoading, isAuthenticated } = useAppSelector(state => state.auth)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      dispatch(setUser(state.user))
      dispatch(setLoading(state.isLoading))
    })
    return unsubscribe
  }, [dispatch])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/warehouses" element={<WarehousesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  )
}

export default App