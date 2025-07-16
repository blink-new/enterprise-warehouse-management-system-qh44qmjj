import React from 'react'
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material'
import { Assessment, Download } from '@mui/icons-material'

export default function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Reports & Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Inventory Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generate detailed inventory reports with stock levels and valuations.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Download />}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Sales Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Analyze sales performance and order trends over time.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Download />}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Warehouse Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Review warehouse utilization and operational efficiency.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Download />}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}