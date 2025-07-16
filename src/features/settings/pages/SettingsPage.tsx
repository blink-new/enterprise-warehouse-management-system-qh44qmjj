import React from 'react'
import { Box, Typography, Card, CardContent, Grid, Switch, FormControlLabel } from '@mui/material'

export default function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Notifications
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email notifications for low stock"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Order status updates"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Weekly inventory reports"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                System Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-refresh dashboard"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show advanced filters"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Enable dark mode"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}