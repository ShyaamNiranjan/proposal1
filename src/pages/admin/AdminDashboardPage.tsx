import { mockOrders, products, formatINR } from '../../data/products'

export default function AdminDashboardPage() {
  const lowStock = products.filter((product) => {
    if (product.variants?.length) return product.variants.some((variant) => variant.stock < 5)
    return product.stock < 5
  }).length
  const pending = mockOrders.filter((order) => order.status === 'Processing').length
  const revenue = mockOrders.filter((order) => order.status !== 'Cancelled').reduce((sum, order) => sum + order.total, 0)

  const cards = [
    { label: 'Total orders', value: String(mockOrders.length) },
    { label: 'Revenue (mock)', value: formatINR(revenue) },
    { label: 'Low stock alerts', value: String(lowStock) },
    { label: 'Pending orders', value: String(pending) },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600">Operational snapshot for internal teams.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
