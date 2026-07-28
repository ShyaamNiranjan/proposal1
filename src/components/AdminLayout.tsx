import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Boxes, ArrowLeft } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#EDEFF2] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-[230px_1fr]">
        <aside className="border-r border-slate-300 bg-slate-900 text-slate-100">
          <div className="border-b border-slate-700 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Internal</p>
            <p className="mt-1 text-lg font-semibold">Xoom Admin</p>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                <link.icon size={16} />
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto border-t border-slate-700 p-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
              <ArrowLeft size={14} /> Buyer storefront
            </Link>
          </div>
        </aside>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
