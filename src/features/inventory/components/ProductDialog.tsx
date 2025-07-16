import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import { Product } from '../../../types'

interface ProductDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void
  product?: Product
  title: string
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  onSubmit,
  product,
  title,
}) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    categoryId: '',
    unitPrice: 0,
    weight: 0,
    dimensions: '',
    barcode: '',
    reorderPoint: 10,
    reorderQuantity: 50,
    status: 'active' as 'active' | 'inactive',
  })

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        name: product.name,
        description: product.description || '',
        categoryId: product.categoryId || '',
        unitPrice: product.unitPrice,
        weight: product.weight || 0,
        dimensions: product.dimensions || '',
        barcode: product.barcode || '',
        reorderPoint: product.reorderPoint,
        reorderQuantity: product.reorderQuantity,
        status: product.status,
      })
    } else {
      setFormData({
        sku: '',
        name: '',
        description: '',
        categoryId: '',
        unitPrice: 0,
        weight: 0,
        dimensions: '',
        barcode: '',
        reorderPoint: 10,
        reorderQuantity: 50,
        status: 'active',
      })
    }
  }, [product, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  value={formData.sku}
                  onChange={handleChange('sku')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={handleChange('description')}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Unit Price"
                  type="number"
                  value={formData.unitPrice}
                  onChange={handleChange('unitPrice')}
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (lbs)"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  inputProps={{ min: 0, step: 0.1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dimensions"
                  value={formData.dimensions}
                  onChange={handleChange('dimensions')}
                  placeholder="L x W x H"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Barcode"
                  value={formData.barcode}
                  onChange={handleChange('barcode')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reorder Point"
                  type="number"
                  value={formData.reorderPoint}
                  onChange={handleChange('reorderPoint')}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reorder Quantity"
                  type="number"
                  value={formData.reorderQuantity}
                  onChange={handleChange('reorderQuantity')}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {product ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProductDialog