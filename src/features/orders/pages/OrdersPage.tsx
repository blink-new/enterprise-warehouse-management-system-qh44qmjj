import React from 'react'
import { Box, Typography, Button, LinearProgress } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useGetOrdersQuery } from '../api/ordersApi'

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery()

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Orders Management
        </Typography>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Orders Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Create Order
        </Button>
      </Box>

      <Typography variant="body1" color="text.secondary">
        Orders management functionality will be implemented here.
        Total orders: {orders?.length || 0}
      </Typography>
    </Box>
  )
}