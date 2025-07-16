import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { Add, Edit, Delete, Warning } from '@mui/icons-material'
import {
  useGetInventoryQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../api/inventoryApi'
import ProductDialog from '../components/ProductDialog'
import { Product } from '../../../types'

const InventoryPage: React.FC = () => {
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  const { data: inventory, isLoading: inventoryLoading, error: inventoryError } = useGetInventoryQuery()
  const { data: products, isLoading: productsLoading, error: productsError } = useGetProductsQuery()
  
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const handleCreateProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      await createProduct(productData).unwrap()
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  const handleUpdateProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!selectedProduct) return
    
    try {
      await updateProduct({
        id: selectedProduct.id,
        data: productData,
      }).unwrap()
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap()
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    }
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setProductDialogOpen(false)
    setSelectedProduct(undefined)
  }

  const inventoryColumns: GridColDef[] = [
    {
      field: 'product.sku',
      headerName: 'SKU',
      width: 120,
      valueGetter: (params) => params.row.product?.sku || 'N/A',
    },
    {
      field: 'product.name',
      headerName: 'Product Name',
      width: 200,
      valueGetter: (params) => params.row.product?.name || 'Unknown Product',
    },
    {
      field: 'warehouse.name',
      headerName: 'Warehouse',
      width: 150,
      valueGetter: (params) => params.row.warehouse?.name || 'Unknown Warehouse',
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 120,
    },
    {
      field: 'quantityOnHand',
      headerName: 'On Hand',
      width: 100,
      type: 'number',
    },
    {
      field: 'quantityReserved',
      headerName: 'Reserved',
      width: 100,
      type: 'number',
    },
    {
      field: 'quantityAvailable',
      headerName: 'Available',
      width: 100,
      type: 'number',
      renderCell: (params) => {
        const isLowStock = params.value <= (params.row.product?.reorderPoint || 10)
        return (
          <Box display="flex" alignItems="center" gap={1}>
            {params.value}
            {isLowStock && <Warning color="warning" fontSize="small" />}
          </Box>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const isLowStock = params.row.quantityAvailable <= (params.row.product?.reorderPoint || 10)
        return (
          <Chip
            label={isLowStock ? 'Low Stock' : 'In Stock'}
            color={isLowStock ? 'warning' : 'success'}
            size="small"
          />
        )
      },
    },
  ]

  const productColumns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 120 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    {
      field: 'unitPrice',
      headerName: 'Unit Price',
      width: 120,
      type: 'number',
      valueFormatter: (params) => `$${params.value?.toFixed(2) || '0.00'}`,
    },
    {
      field: 'reorderPoint',
      headerName: 'Reorder Point',
      width: 120,
      type: 'number',
    },
    {
      field: 'reorderQuantity',
      headerName: 'Reorder Qty',
      width: 120,
      type: 'number',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEditProduct(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDeleteProduct(params.row.id)}
        />,
      ],
    },
  ]

  if (inventoryLoading || productsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (inventoryError || productsError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load inventory data. Please try again.
      </Alert>
    )
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Inventory Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your products and track inventory levels across warehouses
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setProductDialogOpen(true)}
        >
          Add Product
        </Button>
      </Box>

      {/* Inventory Overview */}
      <Paper sx={{ mb: 3 }}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Current Inventory
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={inventory || []}
              columns={inventoryColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Products Management */}
      <Paper>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Product Catalog
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products || []}
              columns={productColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      <ProductDialog
        open={productDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
        product={selectedProduct}
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
      />
    </Box>
  )
}

export default InventoryPage