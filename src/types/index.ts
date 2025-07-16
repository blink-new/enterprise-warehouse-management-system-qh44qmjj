export interface Warehouse {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  managerName?: string
  phone?: string
  email?: string
  capacity: number
  currentUtilization: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Category {
  id: string
  name: string
  description?: string
  parentId?: string
  createdAt: string
  userId: string
}

export interface Product {
  id: string
  sku: string
  name: string
  description?: string
  categoryId?: string
  unitPrice: number
  weight?: number
  dimensions?: string
  barcode?: string
  reorderPoint: number
  reorderQuantity: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Inventory {
  id: string
  productId: string
  warehouseId: string
  location?: string
  quantityOnHand: number
  quantityReserved: number
  quantityAvailable: number
  lastCountedAt?: string
  createdAt: string
  updatedAt: string
  userId: string
  product?: Product
  warehouse?: Warehouse
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress: string
  orderDate: string
  requiredDate?: string
  shippedDate?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  totalAmount: number
  notes?: string
  warehouseId?: string
  createdAt: string
  updatedAt: string
  userId: string
  warehouse?: Warehouse
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  status: 'pending' | 'picked' | 'packed' | 'shipped'
  createdAt: string
  userId: string
  product?: Product
}

export interface StockMovement {
  id: string
  productId: string
  warehouseId: string
  movementType: 'in' | 'out' | 'transfer' | 'adjustment'
  quantity: number
  referenceId?: string
  referenceType?: string
  notes?: string
  createdAt: string
  userId: string
  product?: Product
  warehouse?: Warehouse
}

export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalWarehouses: number
  lowStockItems: number
  pendingOrders: number
  totalRevenue: number
  inventoryValue: number
  utilizationRate: number
}