import { useState } from 'react'
import { mockOrders, formatINR, type OrderStatus } from '../data/products'
import { PageTransition } from '../components/ui'

const statusStyle: Record<OrderStatus, string> = {
  Processing: 'bg-brass/15 text-brass',
  Shipped: 'bg-forest/10 text-forest',
  Delivered: 'bg-moss/15 text-moss',
  Cancelled: 'bg-alert/10 text-alert',
}

export default function OrdersPage() {
  const [openId, setOpenId] = useState(mockOrders[0]?.id)

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <h1 className="text-title">Order history</h1>
        <p className="mt-2 text-sm text-mist">Mock past orders for proposal walkthroughs.</p>

        <div className="mt-6 space-y-3">
          {mockOrders.map((order) => {
            const open = openId === order.id
            return (
              <article key={order.id} className="overflow-hidden rounded-lg border border-line bg-paper">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? '' : order.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-caption text-mist">Placed {order.placedOn} · ETA {order.eta}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-1 text-caption font-medium ${statusStyle[order.status]}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-medium">{formatINR(order.total)}</span>
                  </div>
                </button>

                {open ? (
                  <div className="border-t border-line px-4 py-4">
                    <ul className="space-y-2 text-sm">
                      {order.items.map((item) => (
                        <li key={`${order.id}-${item.productId}`} className="flex justify-between gap-3">
                          <span>
                            {item.name}
                            {item.variant ? ` · ${item.variant}` : ''} × {item.quantity}
                          </span>
                          <span>{formatINR(item.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 space-y-2">
                      {order.timeline.map((step) => (
                        <div key={step.label} className={`flex items-center gap-2 text-sm ${step.done ? 'text-forest' : 'text-mist'}`}>
                          <span>{step.done ? '●' : '○'}</span>
                          <span>{step.label}</span>
                          {step.at ? <span className="text-caption text-mist">· {step.at}</span> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
