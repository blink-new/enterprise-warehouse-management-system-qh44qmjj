import React from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import { Warehouse, Login } from '@mui/icons-material'
import { blink } from '../../../blink/client'

const LoginScreen: React.FC = () => {
  const handleLogin = () => {
    blink.auth.login()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'primary.main',
              }}
            >
              <Warehouse sx={{ fontSize: 48 }} />
              <Typography variant="h3" component="h1" fontWeight="bold">
                WMS
              </Typography>
            </Box>
            
            <Typography variant="h4" component="h2" gutterBottom>
              Warehouse Management System
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Streamline your warehouse operations with our comprehensive
              management platform. Track inventory, manage orders, and optimize
              your warehouse efficiency.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<Login />}
              onClick={handleLogin}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
              }}
            >
              Sign In to Continue
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginScreen