import React from 'react'
import { Box, Typography, Button, LinearProgress } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useGetWarehousesQuery } from '../api/warehousesApi'

export default function WarehousesPage() {
  const { data: warehouses, isLoading } = useGetWarehousesQuery()

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Warehouses Management
        </Typography>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Warehouses Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Add Warehouse
        </Button>
      </Box>

      <Typography variant="body1" color="text.secondary">
        Warehouses management functionality will be implemented here.
        Total warehouses: {warehouses?.length || 0}
      </Typography>
    </Box>
  )
}