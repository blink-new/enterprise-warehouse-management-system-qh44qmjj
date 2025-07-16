import React from 'react'
import { Box, Button, Typography, Paper } from '@mui/material'
import { Warehouse } from '@mui/icons-material'
import { blink } from '../../blink/client'

export default function LoginScreen() {
  const handleLogin = () => {
    blink.auth.login()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'primary.main',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <Warehouse sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Enterprise WMS
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Comprehensive warehouse management system for enterprises to track inventory, 
          manage stock levels, and optimize operations.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          onClick={handleLogin}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Sign In to Continue
        </Button>
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
          Secure authentication powered by Blink
        </Typography>
      </Paper>
    </Box>
  )
}