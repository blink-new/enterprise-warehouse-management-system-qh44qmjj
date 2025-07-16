import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Download,
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  Warehouse
} from 'lucide-react'

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Analyze your warehouse performance and trends</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$145,670</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Processed</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+0.3x</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouse Efficiency</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Inventory Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Track stock levels, movements, and valuation</p>
            <ul className="space-y-2 text-sm">
              <li>• Stock Level Report</li>
              <li>• Inventory Valuation</li>
              <li>• Stock Movement History</li>
              <li>• Low Stock Alert Report</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-green-500" />
              Order Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Analyze order patterns and fulfillment</p>
            <ul className="space-y-2 text-sm">
              <li>• Order Summary Report</li>
              <li>• Fulfillment Performance</li>
              <li>• Customer Order History</li>
              <li>• Order Status Analysis</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Warehouse className="h-5 w-5 mr-2 text-purple-500" />
              Warehouse Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor warehouse utilization and efficiency</p>
            <ul className="space-y-2 text-sm">
              <li>• Capacity Utilization</li>
              <li>• Warehouse Performance</li>
              <li>• Location Analysis</li>
              <li>• Operational Efficiency</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Track revenue, costs, and profitability</p>
            <ul className="space-y-2 text-sm">
              <li>• Revenue Analysis</li>
              <li>• Cost Breakdown</li>
              <li>• Profit Margins</li>
              <li>• Financial Summary</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-red-500" />
              Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Identify patterns and forecast trends</p>
            <ul className="space-y-2 text-sm">
              <li>• Sales Trends</li>
              <li>• Seasonal Analysis</li>
              <li>• Demand Forecasting</li>
              <li>• Performance Trends</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
              Custom Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create custom reports for specific needs</p>
            <ul className="space-y-2 text-sm">
              <li>• Custom Date Ranges</li>
              <li>• Filtered Data Sets</li>
              <li>• Custom Metrics</li>
              <li>• Scheduled Reports</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Create Custom
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Monthly Inventory Report</p>
                <p className="text-sm text-gray-600">Generated on Jan 15, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Order Fulfillment Analysis</p>
                <p className="text-sm text-gray-600">Generated on Jan 12, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Warehouse Utilization Report</p>
                <p className="text-sm text-gray-600">Generated on Jan 10, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}