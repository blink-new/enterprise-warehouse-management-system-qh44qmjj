import { useState } from 'react'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  BarChart3, 
  Settings,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { blink } from '@/blink/client'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Inventory', icon: Package, id: 'inventory' },
  { name: 'Orders', icon: ShoppingCart, id: 'orders' },
  { name: 'Warehouses', icon: Warehouse, id: 'warehouses' },
  { name: 'Reports', icon: BarChart3, id: 'reports' },
  { name: 'Settings', icon: Settings, id: 'settings' },
]

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    blink.auth.logout()
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <div className={cn("flex items-center space-x-2", isCollapsed && "justify-center")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Warehouse className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-gray-900">WMS</h1>
              <p className="text-xs text-gray-500">Enterprise</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2",
                isActive && "bg-primary text-primary-foreground"
              )}
              onClick={() => {
                onPageChange(item.id)
                setIsMobileOpen(false)
              }}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && item.name}
            </Button>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className={cn("flex items-center space-x-3", isCollapsed && "justify-center")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <User className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@company.com</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-start text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64">
              <SidebarContent />
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300",
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <SidebarContent />
      </div>
    </>
  )
}