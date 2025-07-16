import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

interface StatsCardProps {
  title: string
  value: string | number
  icon: SvgIconComponent
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  subtitle?: string
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}.main`,
              width: 56,
              height: 56,
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

export default StatsCard