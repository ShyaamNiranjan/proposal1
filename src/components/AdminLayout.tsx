import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Boxes, Store } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#E8ECF1] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-[240px_1fr]">
        <aside className="flex min-h-screen flex-col border-r border-slate-800 bg-slate-950 text-slate-100">
          <div className="border-b border-slate-800 px-4 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Internal</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">Xoom Admin</p>
            <p className="mt-1 text-xs text-slate-500">Operations console</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1 p-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-slate-700 font-medium text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <link.icon size={16} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-slate-800 p-3">
            <Link
              to="/"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-700"
            >
              <Store size={15} />
              Buyer storefront
            </Link>
            <p className="mt-2 text-center text-[11px] text-slate-500">Demo navigation only</p>
          </div>
        </aside>

        <main className="min-w-0 p-4 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
