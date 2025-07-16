import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Inventory,
  ShoppingCart,
  Warehouse,
  Warning,
  PendingActions,
  AttachMoney,
  Assessment,
  TrendingUp,
} from '@mui/icons-material'
import { useGetDashboardStatsQuery } from '../api/dashboardApi'
import StatsCard from '../components/StatsCard'

const DashboardPage: React.FC = () => {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery()

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load dashboard data. Please try again.
      </Alert>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Overview of your warehouse operations and key metrics
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon={Inventory}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={ShoppingCart}
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Warehouses"
            value={stats?.totalWarehouses || 0}
            icon={Warehouse}
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Low Stock Items"
            value={stats?.lowStockItems || 0}
            icon={Warning}
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Pending Orders"
            value={stats?.pendingOrders || 0}
            icon={PendingActions}
            color="error"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats?.totalRevenue || 0)}
            icon={AttachMoney}
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Inventory Value"
            value={formatCurrency(stats?.inventoryValue || 0)}
            icon={Assessment}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Utilization Rate"
            value={formatPercentage(stats?.utilizationRate || 0)}
            icon={TrendingUp}
            color="info"
          />
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="300px"
              color="text.secondary"
            >
              <Typography>Order history will be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Alerts
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="300px"
              color="text.secondary"
            >
              <Typography>Low stock alerts will be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage