import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Warehouse, 
  MapPin, 
  Users, 
  Package,
  Plus,
  Edit,
  Eye,
  BarChart3
} from 'lucide-react'
import { AddWarehouseModal } from '@/components/modals/AddWarehouseModal'

const mockWarehouses = [
  {
    id: '1',
    name: 'Main Warehouse',
    address: '123 Industrial Blvd, New York, NY 10001',
    manager: 'John Smith',
    phone: '(555) 123-4567',
    capacity: 10000,
    currentUtilization: 7800,
    utilizationRate: 78,
    status: 'active',
    productCount: 1247,
    orderCount: 45
  },
  {
    id: '2',
    name: 'North Warehouse',
    address: '456 Storage Ave, Boston, MA 02101',
    manager: 'Sarah Johnson',
    phone: '(555) 234-5678',
    capacity: 8000,
    currentUtilization: 5600,
    utilizationRate: 70,
    status: 'active',
    productCount: 892,
    orderCount: 23
  },
  {
    id: '3',
    name: 'South Warehouse',
    address: '789 Logistics Dr, Atlanta, GA 30301',
    manager: 'Mike Davis',
    phone: '(555) 345-6789',
    capacity: 12000,
    currentUtilization: 9600,
    utilizationRate: 80,
    status: 'active',
    productCount: 1456,
    orderCount: 67
  }
]

export function Warehouses() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600'
    if (rate >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Warehouse Management</h1>
          <p className="text-gray-600">Manage your warehouse locations and capacity</p>
        </div>
        <AddWarehouseModal onWarehouseAdded={(warehouse) => {
          // In a real app, this would update the database and refresh the list
          console.log('New warehouse added:', warehouse)
        }} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Warehouses</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWarehouses.length}</div>
            <p className="text-xs text-muted-foreground">Active locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWarehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Square feet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Utilization</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWarehouses.reduce((sum, w) => sum + w.currentUtilization, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Square feet used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockWarehouses.reduce((sum, w) => sum + w.utilizationRate, 0) / mockWarehouses.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockWarehouses.map((warehouse) => (
          <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {warehouse.address}
                  </div>
                </div>
                <Badge className={getStatusColor(warehouse.status)}>
                  {warehouse.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Manager Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Manager</p>
                  <p className="text-sm text-gray-600">{warehouse.manager}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{warehouse.phone}</p>
                </div>
              </div>

              {/* Capacity Info */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Capacity Utilization</span>
                  <span className={getUtilizationColor(warehouse.utilizationRate)}>
                    {warehouse.utilizationRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      warehouse.utilizationRate >= 90 ? 'bg-red-500' :
                      warehouse.utilizationRate >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${warehouse.utilizationRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{warehouse.currentUtilization.toLocaleString()} sq ft</span>
                  <span>{warehouse.capacity.toLocaleString()} sq ft</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{warehouse.productCount}</p>
                  <p className="text-xs text-gray-500">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{warehouse.orderCount}</p>
                  <p className="text-xs text-gray-500">Active Orders</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}