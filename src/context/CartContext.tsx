import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProduct } from '../data/products'

export type CartItem = {
  key: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  variantId?: string
  variantLabel?: string
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  bump: boolean
  addItem: (productId: string, variantId?: string, quantity?: number) => boolean
  updateQty: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [bump, setBump] = useState(false)

  const triggerBump = useCallback(() => {
    setBump(true)
    window.setTimeout(() => setBump(false), 450)
  }, [])

  const addItem = useCallback(
    (productId: string, variantId?: string, quantity = 1) => {
      const product = getProduct(productId)
      if (!product) return false

      const variant = product.variants?.find((entry) => entry.id === variantId)
      if (product.variants?.length) {
        if (!variant || variant.stock <= 0) return false
      } else if (product.stock <= 0) {
        return false
      }

      const key = `${productId}:${variantId ?? 'default'}`
      setItems((previous) => {
        const existing = previous.find((entry) => entry.key === key)
        if (existing) {
          return previous.map((entry) =>
            entry.key === key ? { ...entry, quantity: entry.quantity + quantity } : entry,
          )
        }
        return [
          ...previous,
          {
            key,
            productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
            variantId,
            variantLabel: variant?.label,
          },
        ]
      })
      triggerBump()
      return true
    },
    [triggerBump],
  )

  const updateQty = useCallback((key: string, quantity: number) => {
    setItems((previous) =>
      previous
        .map((entry) => (entry.key === key ? { ...entry, quantity } : entry))
        .filter((entry) => entry.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((previous) => previous.filter((entry) => entry.key !== key))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { items, itemCount, subtotal, bump, addItem, updateQty, removeItem, clearCart }
  }, [items, bump, addItem, updateQty, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
