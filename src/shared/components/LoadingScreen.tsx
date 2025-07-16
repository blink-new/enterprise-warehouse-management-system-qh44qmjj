import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Warehouse } from '@mui/icons-material'

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            bgcolor: 'primary.main',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Warehouse sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Enterprise WMS
        </Typography>
      </Box>
      
      <CircularProgress size={40} thickness={4} />
      
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 2, 
          color: 'text.secondary',
          textAlign: 'center' 
        }}
      >
        Loading your warehouse management system...
      </Typography>
    </Box>
  )
}