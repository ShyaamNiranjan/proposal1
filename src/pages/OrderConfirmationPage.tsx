import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { formatINR } from '../data/products'
import { PageTransition } from '../components/ui'

type ConfirmationState = {
  orderId: string
  total: number
  method: string
  name: string
  itemCount: number
}

export default function OrderConfirmationPage() {
  const location = useLocation()
  const state = (location.state as ConfirmationState | null) ?? {
    orderId: 'XM-24000',
    total: 0,
    method: 'UPI',
    name: 'Guest',
    itemCount: 0,
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-xl px-4 py-16 text-center md:px-6">
        <div className="rounded-xl border border-line bg-paper p-8 shadow-[var(--shadow-soft)]">
          <CheckCircle2 className="mx-auto text-forest" size={42} />
          <h1 className="mt-4 text-title">Order confirmed</h1>
          <p className="mt-2 text-mist">
            Thanks {state.name}. We&apos;ve reserved your pieces and queued manual fulfilment.
          </p>
          <div className="mt-6 rounded-md bg-canvas p-4 text-left text-sm">
            <p><span className="text-mist">Order ID</span> · <strong>{state.orderId}</strong></p>
            <p className="mt-1"><span className="text-mist">Items</span> · {state.itemCount}</p>
            <p className="mt-1"><span className="text-mist">Paid via</span> · {state.method}</p>
            <p className="mt-1"><span className="text-mist">Total</span> · {formatINR(state.total)}</p>
            <p className="mt-1"><span className="text-mist">Estimated delivery</span> · 2–4 business days</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/orders" className="rounded-md bg-forest px-4 py-2.5 text-sm font-medium text-paper hover:bg-moss">
              Track order
            </Link>
            <Link to="/shop" className="rounded-md border border-line px-4 py-2.5 text-sm hover:bg-canvas">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
