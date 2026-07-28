import { products } from '../../data/products'

export default function AdminInventoryPage() {
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

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
      <p className="mt-1 text-sm text-slate-600">Variant-level stock view — aligns with the RFQ inventory requirement.</p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
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
            {rows.map((row) => (
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
      </div>
    </div>
  )
}
