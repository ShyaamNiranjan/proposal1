import { Link } from 'react-router-dom'
import { AlertTriangle, Package } from 'lucide-react'
import { formatINR, salesTrend } from '../../data/products'
import { isProductLowStock, productStock, useAdmin } from '../../context/AdminContext'

function SalesChart() {
  const maxRevenue = Math.max(...salesTrend.map((point) => point.revenue))
  const width = 560
  const height = 180
  const padding = 24
  const points = salesTrend.map((point, index) => {
    const x = padding + (index / (salesTrend.length - 1)) * (width - padding * 2)
    const y = height - padding - (point.revenue / maxRevenue) * (height - padding * 2)
    return { ...point, x, y }
  })
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Sales trend</h2>
          <p className="text-sm text-slate-500">Revenue over the last 14 days</p>
        </div>
        <p className="text-sm font-medium text-slate-700">
          Peak {formatINR(maxRevenue)}
        </p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="Revenue trend chart">
        <path d={path} fill="none" stroke="#1F4D3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.day}>
            <circle cx={point.x} cy={point.y} r="3.5" fill="#9C7E4F" />
            <text x={point.x} y={height - 6} textAnchor="middle" className="fill-slate-400" fontSize="9">
              {point.day.split(' ')[0]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function AdminDashboardPage() {
  const { products, orders } = useAdmin()
  const lowStockProducts = products.filter(isProductLowStock)
  const pending = orders.filter((order) => order.status === 'Processing')
  const revenue = orders.filter((order) => order.status !== 'Cancelled').reduce((sum, order) => sum + order.total, 0)
  const recent = [...orders].sort((a, b) => b.placedOn.localeCompare(a.placedOn)).slice(0, 5)
  const stalePending = pending.filter((order) => order.pendingDays >= 2)

  const lowVariantHints = products.flatMap((product) => {
    if (product.variants?.length) {
      return product.variants
        .filter((variant) => variant.stock < 5)
        .map((variant) => `${product.name} · ${variant.label} (${variant.stock})`)
    }
    return product.stock < 5 ? [`${product.name} (${product.stock})`] : []
  }).slice(0, 4)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Today&apos;s operations snapshot for the internal team.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Total orders</p>
          <p className="mt-2 text-2xl font-semibold">{orders.length}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Revenue</p>
          <p className="mt-2 text-2xl font-semibold">{formatINR(revenue)}</p>
        </article>
        <Link
          to="/admin/inventory?filter=low-stock"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm transition hover:border-amber-300 hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <p className="text-xs uppercase tracking-[0.12em] text-amber-800">Low stock alerts</p>
          <p className="mt-2 text-2xl font-semibold text-amber-900">{lowStockProducts.length}</p>
          <p className="mt-1 text-xs text-amber-700">Open inventory filter →</p>
        </Link>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Pending orders</p>
          <p className="mt-2 text-2xl font-semibold">{pending.length}</p>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <SalesChart />

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight">Needs attention</h2>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <ul className="space-y-3 text-sm">
            {stalePending.map((order) => (
              <li key={order.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="font-medium text-slate-800">{order.id} still processing</p>
                <p className="text-xs text-slate-500">{order.pendingDays} days waiting · {order.customerName}</p>
              </li>
            ))}
            {lowVariantHints.map((hint) => (
              <li key={hint} className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-amber-900">
                Low stock · {hint}
              </li>
            ))}
            {!stalePending.length && !lowVariantHints.length ? (
              <li className="rounded-lg border border-dashed border-slate-200 px-3 py-6 text-center text-slate-500">
                Nothing urgent right now.
              </li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Recent orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-slate-700 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-2 py-2">Order</th>
                <th className="px-2 py-2">Customer</th>
                <th className="px-2 py-2">Items</th>
                <th className="px-2 py-2">Total</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id} className="border-b border-slate-50">
                  <td className="px-2 py-3 font-medium">{order.id}</td>
                  <td className="px-2 py-3 text-slate-600">{order.customerName}</td>
                  <td className="px-2 py-3">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td className="px-2 py-3">{formatINR(order.total)}</td>
                  <td className="px-2 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Package size={12} /> Tracking {products.length} catalog SKUs · {products.reduce((sum, product) => sum + productStock(product), 0)} units on hand
        </p>
      </section>
    </div>
  )
}
