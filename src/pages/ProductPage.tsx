import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { discountPercent, formatINR, getProduct, products } from '../data/products'
import { PageTransition, QtyStepper } from '../components/ui'

export default function ProductPage() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [imageIndex, setImageIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setImageIndex(0)
    setQty(1)
    setVariantId(product?.variants?.[0]?.id)
    setAdded(false)
  }, [product?.id, product?.variants])

  const selectedVariant = product?.variants?.find((variant) => variant.id === variantId)
  const inStock = product?.variants?.length
    ? Boolean(selectedVariant && selectedVariant.stock > 0)
    : Boolean(product && product.stock > 0)

  const related = useMemo(() => {
    if (!product) return []
    return products.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <h1 className="text-title">Product not found</h1>
          <Link to="/shop" className="mt-4 inline-block text-forest hover:underline">
            Back to shop
          </Link>
        </div>
      </PageTransition>
    )
  }

  const discount = discountPercent(product.price, product.mrp)

  function onAdd() {
    const ok = addItem(product!.id, variantId, qty)
    if (!ok) return
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <PageTransition>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            <img src={product.images[imageIndex]} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setImageIndex(index)}
                className={`h-16 w-16 overflow-hidden rounded-md border ${
                  imageIndex === index ? 'border-forest' : 'border-line'
                }`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-caption uppercase tracking-[0.16em] text-mist">{product.category}</p>
          <h1 className="mt-2 text-title">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium text-ink">{formatINR(product.price)}</span>
            <span className="text-mist line-through">{formatINR(product.mrp)}</span>
            <span className="rounded-full bg-brass/15 px-2 py-0.5 text-caption font-medium text-brass">{discount}% off</span>
          </div>
          <p className="mt-5 max-w-prose text-lead text-mist">{product.description}</p>

          {product.variants?.length ? (
            <div className="mt-6">
              <p className="text-sm font-medium">Select variant</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setVariantId(variant.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      variantId === variant.id ? 'border-forest bg-forest text-paper' : 'border-line bg-paper'
                    } ${variant.stock <= 0 ? 'opacity-45' : ''}`}
                  >
                    {variant.label}
                    {variant.stock <= 0 ? ' · Out' : ''}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-caption text-mist">
                {selectedVariant
                  ? selectedVariant.stock > 0
                    ? `${selectedVariant.stock} in stock`
                    : 'Out of stock'
                  : null}
              </p>
            </div>
          ) : (
            <p className="mt-6 text-caption text-mist">{product.stock} in stock</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQty} />
            <motion.button
              type="button"
              whileTap={inStock ? { scale: 0.97 } : undefined}
              disabled={!inStock}
              onClick={onAdd}
              className="rounded-md bg-forest px-5 py-3 text-sm font-medium text-paper transition hover:bg-moss disabled:cursor-not-allowed disabled:bg-line disabled:text-mist"
            >
              {!inStock ? 'Out of stock' : added ? 'Added to cart' : 'Add to cart'}
            </motion.button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <h2 className="mb-5 text-title">You may also like</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((entry) => (
            <ProductCard key={entry.id} product={entry} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
