import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  AlertTriangle,
  Package,
  Warehouse,
  Edit,
  Eye
} from 'lucide-react'
import { AddProductModal } from '@/components/modals/AddProductModal'

// Mock inventory data
const mockInventory = [
  {
    id: '1',
    product: {
      id: 'p1',
      sku: 'SKU-001',
      name: 'Industrial Bearing Set',
      category: 'Mechanical Parts'
    },
    warehouse: {
      id: 'w1',
      name: 'Main Warehouse'
    },
    location: 'A-01-15',
    quantityOnHand: 45,
    quantityReserved: 10,
    quantityAvailable: 35,
    reorderPoint: 20,
    unitPrice: 125.50,
    totalValue: 5647.50,
    lastCounted: '2024-01-10',
    status: 'normal'
  },
  {
    id: '2',
    product: {
      id: 'p2',
      sku: 'SKU-002',
      name: 'Steel Bolts M8x50',
      category: 'Fasteners'
    },
    warehouse: {
      id: 'w1',
      name: 'Main Warehouse'
    },
    location: 'B-03-22',
    quantityOnHand: 15,
    quantityReserved: 5,
    quantityAvailable: 10,
    reorderPoint: 50,
    unitPrice: 2.25,
    totalValue: 33.75,
    lastCounted: '2024-01-12',
    status: 'low'
  },
  {
    id: '3',
    product: {
      id: 'p3',
      sku: 'SKU-003',
      name: 'Hydraulic Pump',
      category: 'Hydraulics'
    },
    warehouse: {
      id: 'w2',
      name: 'North Warehouse'
    },
    location: 'C-02-08',
    quantityOnHand: 2,
    quantityReserved: 1,
    quantityAvailable: 1,
    reorderPoint: 10,
    unitPrice: 850.00,
    totalValue: 1700.00,
    lastCounted: '2024-01-08',
    status: 'critical'
  },
  {
    id: '4',
    product: {
      id: 'p4',
      sku: 'SKU-004',
      name: 'Electric Motor 5HP',
      category: 'Motors'
    },
    warehouse: {
      id: 'w1',
      name: 'Main Warehouse'
    },
    location: 'D-01-05',
    quantityOnHand: 8,
    quantityReserved: 2,
    quantityAvailable: 6,
    reorderPoint: 5,
    unitPrice: 1250.00,
    totalValue: 10000.00,
    lastCounted: '2024-01-14',
    status: 'normal'
  }
]

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [filteredInventory, setFilteredInventory] = useState(mockInventory)

  // Filter inventory based on search and filters
  useEffect(() => {
    let filtered = mockInventory

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Warehouse filter
    if (selectedWarehouse !== 'all') {
      filtered = filtered.filter(item => item.warehouse.id === selectedWarehouse)
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => getStockStatus(item) === selectedStatus)
    }

    setFilteredInventory(filtered)
  }, [searchTerm, selectedWarehouse, selectedStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'low':
        return 'bg-orange-100 text-orange-800'
      case 'normal':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStockStatus = (item: any) => {
    if (item.quantityAvailable <= 0) return 'out-of-stock'
    if (item.quantityOnHand <= item.reorderPoint * 0.5) return 'critical'
    if (item.quantityOnHand <= item.reorderPoint) return 'low'
    return 'normal'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const totalInventoryValue = filteredInventory.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockCount = filteredInventory.filter(item => getStockStatus(item) === 'low' || getStockStatus(item) === 'critical').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your warehouse inventory</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddProductModal onProductAdded={(product) => {
            // In a real app, this would update the database and refresh the list
            console.log('New product added:', product)
          }} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredInventory.length}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInventoryValue)}</div>
            <p className="text-xs text-muted-foreground">Total stock value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products, SKU, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Warehouses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="w1">Main Warehouse</SelectItem>
                <SelectItem value="w2">North Warehouse</SelectItem>
                <SelectItem value="w3">South Warehouse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>On Hand</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => {
                  const status = getStockStatus(item)
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-500">{item.product.category}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{item.product.sku}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.location}</p>
                          <p className="text-sm text-gray-500">{item.warehouse.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.quantityOnHand}</TableCell>
                      <TableCell className="text-green-600 font-medium">{item.quantityAvailable}</TableCell>
                      <TableCell className="text-orange-600">{item.quantityReserved}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(status)}>
                          {status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(item.totalValue)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}