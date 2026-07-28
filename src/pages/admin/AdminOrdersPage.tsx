import { useState } from 'react'
import { ArrowRight, LayoutGrid, List, ShoppingBag } from 'lucide-react'
import { formatINR, type OrderStatus } from '../../data/products'
import { useAdmin } from '../../context/AdminContext'

const statuses: OrderStatus[] = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  Processing: 'Shipped',
  Shipped: 'Delivered',
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin()
  const [view, setView] = useState<'table' | 'board'>('table')

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="mt-1 text-sm text-slate-600">Fulfilment workflow — table or board, same live state.</p>
        </div>
        <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setView('table')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
              view === 'table' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <List size={14} />
            Table
          </button>
          <button
            type="button"
            onClick={() => setView('board')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
              view === 'board' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid size={14} />
            Board
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <ShoppingBag className="text-slate-400" size={28} />
          <p className="font-medium text-slate-800">No orders yet</p>
          <p className="max-w-sm text-sm text-slate-500">New storefront checkouts will appear here for packing and dispatch.</p>
        </div>
      ) : view === 'table' ? (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Placed</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-slate-600">{order.customerName}</td>
                  <td className="px-4 py-3 text-slate-600">{order.placedOn}</td>
                  <td className="px-4 py-3">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td className="px-4 py-3">{formatINR(order.total)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                      className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statuses.map((status) => {
            const column = orders.filter((order) => order.status === status)
            return (
              <section key={status} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <h2 className="text-sm font-semibold text-slate-800">{status}</h2>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-sm">
                    {column.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {column.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-slate-200 bg-white/60 px-3 py-6 text-center text-xs text-slate-500">
                      No orders
                    </p>
                  ) : (
                    column.map((order) => {
                      const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
                      const next = nextStatus[order.status]
                      return (
                        <article key={order.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-slate-900">{order.id}</p>
                            <select
                              value={order.status}
                              onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                              aria-label={`Status for ${order.id}`}
                              className="max-w-[7.5rem] rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] outline-none focus:border-slate-400"
                            >
                              {statuses.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{order.customerName}</p>
                          <p className="mt-2 text-sm text-slate-700">
                            {formatINR(order.total)} · {itemCount} item{itemCount === 1 ? '' : 's'}
                          </p>
                          {next ? (
                            <button
                              type="button"
                              onClick={() => updateOrderStatus(order.id, next)}
                              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                            >
                              Move to {next}
                              <ArrowRight size={12} />
                            </button>
                          ) : null}
                        </article>
                      )
                    })
                  )}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
