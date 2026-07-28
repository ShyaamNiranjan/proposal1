import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  categories as seedCategories,
  defaultProductImages,
  mockOrders,
  products as seedProducts,
  type MockOrder,
  type OrderStatus,
  type Product,
  type Variant,
} from '../data/products'

type ProductInput = {
  name: string
  category: string
  price: number
  mrp: number
  description: string
  stock: number
  variants: Variant[]
}

type AdminContextValue = {
  products: Product[]
  categories: string[]
  orders: MockOrder[]
  addCategory: (name: string) => boolean
  renameCategory: (from: string, to: string) => boolean
  deleteCategory: (name: string) => void
  addProduct: (input: ProductInput) => void
  updateProduct: (id: string, input: ProductInput) => void
  deleteProduct: (id: string) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => structuredClone(seedProducts))
  const [categories, setCategories] = useState<string[]>(() => [...seedCategories])
  const [orders, setOrders] = useState<MockOrder[]>(() => structuredClone(mockOrders))

  const addCategory = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return false
    setCategories((previous) => {
      if (previous.some((item) => item.toLowerCase() === trimmed.toLowerCase())) return previous
      return [...previous, trimmed]
    })
    return true
  }, [])

  const renameCategory = useCallback((from: string, to: string) => {
    const trimmed = to.trim()
    if (!trimmed) return false
    setCategories((previous) => previous.map((item) => (item === from ? trimmed : item)))
    setProducts((previous) =>
      previous.map((product) => (product.category === from ? { ...product, category: trimmed } : product)),
    )
    return true
  }, [])

  const deleteCategory = useCallback((name: string) => {
    setCategories((previous) => previous.filter((item) => item !== name))
  }, [])

  const addProduct = useCallback((input: ProductInput) => {
    const id = `${slugify(input.name) || 'product'}-${Date.now().toString().slice(-4)}`
    const variants = input.variants.filter((variant) => variant.label.trim())
    const stock = variants.length
      ? variants.reduce((sum, variant) => sum + variant.stock, 0)
      : input.stock
    const next: Product = {
      id,
      name: input.name.trim(),
      category: input.category,
      price: input.price,
      mrp: input.mrp,
      description: input.description.trim(),
      stock,
      images: defaultProductImages,
      variants: variants.length ? variants : undefined,
      featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProducts((previous) => [next, ...previous])
  }, [])

  const updateProduct = useCallback((id: string, input: ProductInput) => {
    setProducts((previous) =>
      previous.map((product) => {
        if (product.id !== id) return product
        const variants = input.variants.filter((variant) => variant.label.trim())
        const stock = variants.length
          ? variants.reduce((sum, variant) => sum + variant.stock, 0)
          : input.stock
        return {
          ...product,
          name: input.name.trim(),
          category: input.category,
          price: input.price,
          mrp: input.mrp,
          description: input.description.trim(),
          stock,
          variants: variants.length ? variants : undefined,
        }
      }),
    )
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((previous) => previous.filter((product) => product.id !== id))
  }, [])

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
              pendingDays: status === 'Processing' ? order.pendingDays : 0,
            }
          : order,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
      products,
      categories,
      orders,
      addCategory,
      renameCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
    }),
    [
      products,
      categories,
      orders,
      addCategory,
      renameCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
    ],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}

export function productStock(product: Product) {
  if (product.variants?.length) return product.variants.reduce((sum, variant) => sum + variant.stock, 0)
  return product.stock
}

export function isProductLowStock(product: Product) {
  if (product.variants?.length) return product.variants.some((variant) => variant.stock < 5)
  return product.stock < 5
}
