import { Pencil, Trash2 } from 'lucide-react'
import { formatINR, products } from '../../data/products'

function isLowStock(product: (typeof products)[number]) {
  if (product.variants?.length) return product.variants.some((variant) => variant.stock < 5) || product.stock < 5
  return product.stock < 5
}

function stockCount(product: (typeof products)[number]) {
  if (product.variants?.length) return product.variants.reduce((sum, variant) => sum + variant.stock, 0)
  return product.stock
}

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
      <p className="mt-1 text-sm text-slate-600">Visual admin table — edit/delete controls are non-functional in this prototype.</p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const low = isLowStock(product)
              return (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-slate-600">{product.category}</td>
                  <td className="px-4 py-3">{formatINR(product.price)}</td>
                  <td className="px-4 py-3">{stockCount(product)}</td>
                  <td className="px-4 py-3">
                    {low ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Low stock</span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">Healthy</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 text-slate-500">
                      <button type="button" aria-label="Edit" className="rounded p-1 hover:bg-slate-100"><Pencil size={14} /></button>
                      <button type="button" aria-label="Delete" className="rounded p-1 hover:bg-slate-100"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
