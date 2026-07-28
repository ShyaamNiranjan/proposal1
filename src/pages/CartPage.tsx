import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatINR } from '../data/products'
import { PageTransition, QtyStepper } from '../components/ui'

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem } = useCart()

  if (!items.length) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-xl px-4 py-20 text-center md:px-6">
          <div className="rounded-xl border border-dashed border-line bg-paper p-10">
            <p className="font-display text-3xl">Your cart is quiet</p>
            <p className="mt-3 text-mist">Add a few considered pieces and we&apos;ll keep the totals honest.</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-md bg-forest px-5 py-3 text-sm font-medium text-paper hover:bg-moss">
              Continue shopping
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.4fr_0.8fr] md:px-6">
        <section className="space-y-4">
          <h1 className="text-title">Cart</h1>
          {items.map((item) => (
            <article key={item.key} className="flex gap-4 rounded-lg border border-line bg-paper p-4">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.variantLabel ? <p className="text-caption text-mist">{item.variantLabel}</p> : null}
                    <p className="mt-1 text-sm">{formatINR(item.price)}</p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.key)} className="text-caption text-mist hover:text-alert">
                    Remove
                  </button>
                </div>
                <QtyStepper value={item.quantity} onChange={(value) => updateQty(item.key, value)} />
              </div>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-lg border border-line bg-paper p-5 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-2xl">Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-mist">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-mist">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-medium text-paper hover:bg-moss"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </PageTransition>
  )
}
