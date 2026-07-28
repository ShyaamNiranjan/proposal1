import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../data/products'
import { PageTransition } from '../components/ui'

type PayMethod = 'UPI' | 'Card' | 'Netbanking'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [method, setMethod] = useState<PayMethod>('UPI')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const shipping = subtotal > 0 ? 99 : 0
  const total = subtotal + shipping

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!items.length) {
      setError('Your cart is empty.')
      return
    }
    if (!name.trim() || !phone.trim() || !pincode.trim() || !address.trim()) {
      setError('Please fill all delivery fields.')
      return
    }
    setError('')
    setSubmitting(true)
    window.setTimeout(() => {
      const orderId = `XM-${Math.floor(24000 + Math.random() * 900)}`
      clearCart()
      navigate('/order-confirmation', {
        state: {
          orderId,
          total,
          method,
          name,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        },
      })
    }, 1500)
  }

  if (!items.length && !submitting) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <p className="font-display text-3xl">Nothing to checkout</p>
          <button type="button" onClick={() => navigate('/shop')} className="mt-4 text-forest hover:underline">
            Continue shopping
          </button>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <form onSubmit={onSubmit} className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr] md:px-6">
        <div className="space-y-6">
          <h1 className="text-title">Checkout</h1>

          <section className="rounded-lg border border-line bg-paper p-5">
            <h2 className="font-display text-xl">1. Delivery address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-md border border-line bg-canvas px-3 py-2 text-sm" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-md border border-line bg-canvas px-3 py-2 text-sm" />
              <input required value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" className="rounded-md border border-line bg-canvas px-3 py-2 text-sm" />
              <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="rounded-md border border-line bg-canvas px-3 py-2 text-sm sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-lg border border-line bg-paper p-5">
            <h2 className="font-display text-xl">2. Payment method</h2>
            <p className="mt-1 text-caption text-mist">Simulated gateway options — not a live processor.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(['UPI', 'Card', 'Netbanking'] as PayMethod[]).map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer rounded-md border p-4 text-sm ${
                    method === option ? 'border-forest bg-forest/5' : 'border-line bg-canvas'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="sr-only"
                    checked={method === option}
                    onChange={() => setMethod(option)}
                  />
                  <span className="font-medium">{option}</span>
                  <span className="mt-1 block text-caption text-mist">
                    {option === 'UPI' ? 'Instant bank apps' : option === 'Card' ? 'Visa / Mastercard / RuPay' : 'All major banks'}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-paper p-5 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-xl">3. Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.key} className="flex justify-between gap-3">
                <span className="text-mist">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatINR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><span className="text-mist">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-mist">Shipping</span><span>{formatINR(shipping)}</span></div>
            <div className="flex justify-between font-medium"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
          {error ? <p className="mt-3 text-caption text-alert">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-forest px-4 py-3 text-sm font-medium text-paper hover:bg-moss disabled:opacity-70"
          >
            {submitting ? (
              <>
                <LoaderCircle className="animate-spin" size={16} /> Placing order...
              </>
            ) : (
              'Place order'
            )}
          </button>
        </aside>
      </form>
    </PageTransition>
  )
}
