import { useState } from 'react'
import { formatINR, mockOrders, type OrderStatus } from '../../data/products'

export default function AdminOrdersPage() {
  const [rows, setRows] = useState(mockOrders)

  function updateStatus(id: string, status: OrderStatus) {
    setRows((previous) => previous.map((row) => (row.id === id ? { ...row, status } : row)))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
      <p className="mt-1 text-sm text-slate-600">Status dropdowns are visual-only for the proposal demo.</p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Placed</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => (
              <tr key={order.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3 text-slate-600">{order.placedOn}</td>
                <td className="px-4 py-3">{formatINR(order.total)}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(event) => updateStatus(order.id, event.target.value as OrderStatus)}
                    className="rounded border border-slate-300 bg-white px-2 py-1 text-sm"
                  >
                    {(['Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
