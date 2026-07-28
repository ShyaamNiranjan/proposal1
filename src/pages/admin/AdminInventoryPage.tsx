import { Link, useSearchParams } from 'react-router-dom'
import { Boxes } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminInventoryPage() {
  const { products } = useAdmin()
  const [params, setParams] = useSearchParams()
  const filter = params.get('filter') === 'low-stock' ? 'low-stock' : 'all'

  const rows = products.flatMap((product) => {
    if (product.variants?.length) {
      return product.variants.map((variant) => ({
        key: `${product.id}-${variant.id}`,
        product: product.name,
        variant: variant.label,
        stock: variant.stock,
      }))
    }
    return [{ key: product.id, product: product.name, variant: 'Default', stock: product.stock }]
  })

  const visible = filter === 'low-stock' ? rows.filter((row) => row.stock < 5) : rows

  function setFilter(next: 'all' | 'low-stock') {
    if (next === 'low-stock') setParams({ filter: 'low-stock' })
    else setParams({})
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="mt-1 text-sm text-slate-600">Live stock across all variants and locations.</p>
        </div>
        <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All stock
          </button>
          <button
            type="button"
            onClick={() => setFilter('low-stock')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
              filter === 'low-stock' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Low / out
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Boxes className="text-slate-400" size={28} />
            <p className="font-medium text-slate-800">
              {filter === 'low-stock' ? 'No low-stock variants' : 'No inventory rows'}
            </p>
            <p className="max-w-sm text-sm text-slate-500">
              {filter === 'low-stock'
                ? 'Everything is above the alert threshold right now.'
                : 'Add products to see variant-level availability here.'}
            </p>
            {filter === 'low-stock' ? (
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="mt-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Show all stock
              </button>
            ) : (
              <Link
                to="/admin/products"
                className="mt-1 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Go to products
              </Link>
            )}
          </div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Variant</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Alert</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.key} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.variant}</td>
                  <td className="px-4 py-3">{row.stock}</td>
                  <td className="px-4 py-3">
                    {row.stock <= 0 ? (
                      <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">Out of stock</span>
                    ) : row.stock < 5 ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Low stock</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
