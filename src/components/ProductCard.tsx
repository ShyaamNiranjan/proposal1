import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { discountPercent, formatINR, type Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const discount = discountPercent(product.price, product.mrp)
  const defaultVariant = product.variants?.find((variant) => variant.stock > 0)

  function onAdd() {
    const ok = addItem(product.id, defaultVariant?.id)
    if (!ok) return
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1200)
  }

  const canAdd = product.variants?.length
    ? Boolean(defaultVariant)
    : product.stock > 0

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-canvas">
        {/* Signature: dual-image crossfade */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.images[1] ?? product.images[0]}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-brass opacity-80" />
        {product.stock < 5 || (defaultVariant && defaultVariant.stock < 5) ? (
          <span className="absolute right-3 top-3 rounded-full bg-paper/95 px-2 py-1 text-caption font-medium text-alert">
            Low stock
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-caption uppercase tracking-[0.14em] text-mist">{product.category}</p>
        <Link to={`/product/${product.id}`} className="font-display text-lg leading-snug text-ink hover:text-forest">
          {product.name}
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="font-medium text-ink">{formatINR(product.price)}</p>
            <p className="text-caption text-mist">
              <span className="line-through">{formatINR(product.mrp)}</span>
              <span className="ml-2 text-brass">{discount}% off</span>
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={canAdd ? { scale: 0.96 } : undefined}
            disabled={!canAdd}
            onClick={onAdd}
            className="rounded-md bg-forest px-3 py-2 text-caption font-medium text-paper transition hover:bg-moss disabled:cursor-not-allowed disabled:bg-line disabled:text-mist"
          >
            {added ? 'Added' : canAdd ? 'Add' : 'Sold out'}
          </motion.button>
        </div>
      </div>
    </article>
  )
}
