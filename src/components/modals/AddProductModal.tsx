import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Save, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface AddProductModalProps {
  onProductAdded?: (product: any) => void
}

export function AddProductModal({ onProductAdded }: AddProductModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    unitPrice: '',
    weight: '',
    dimensions: '',
    barcode: '',
    reorderPoint: '',
    reorderQuantity: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newProduct = {
        id: `prod_${Date.now()}`,
        sku: formData.sku,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        unitPrice: parseFloat(formData.unitPrice) || 0,
        weight: parseFloat(formData.weight) || 0,
        dimensions: formData.dimensions,
        barcode: formData.barcode,
        reorderPoint: parseInt(formData.reorderPoint) || 0,
        reorderQuantity: parseInt(formData.reorderQuantity) || 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      onProductAdded?.(newProduct)
      toast.success('Product added successfully!')
      setOpen(false)
      setFormData({
        sku: '',
        name: '',
        description: '',
        category: '',
        unitPrice: '',
        weight: '',
        dimensions: '',
        barcode: '',
        reorderPoint: '',
        reorderQuantity: ''
      })
    } catch (error) {
      toast.error('Failed to add product')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="e.g., SKU-001"
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Industrial Bearing Set"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Product description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mechanical">Mechanical Parts</SelectItem>
                  <SelectItem value="fasteners">Fasteners</SelectItem>
                  <SelectItem value="hydraulics">Hydraulics</SelectItem>
                  <SelectItem value="motors">Motors</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price ($) *</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
                placeholder="e.g., 10x5x3 inches"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="barcode">Barcode/QR Code</Label>
            <Input
              id="barcode"
              value={formData.barcode}
              onChange={(e) => handleInputChange('barcode', e.target.value)}
              placeholder="Barcode or QR code"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reorderPoint">Reorder Point *</Label>
              <Input
                id="reorderPoint"
                type="number"
                value={formData.reorderPoint}
                onChange={(e) => handleInputChange('reorderPoint', e.target.value)}
                placeholder="Minimum stock level"
                required
              />
            </div>
            <div>
              <Label htmlFor="reorderQuantity">Reorder Quantity *</Label>
              <Input
                id="reorderQuantity"
                type="number"
                value={formData.reorderQuantity}
                onChange={(e) => handleInputChange('reorderQuantity', e.target.value)}
                placeholder="Quantity to reorder"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}