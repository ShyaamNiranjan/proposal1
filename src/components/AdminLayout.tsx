import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Boxes, Store, Tags } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { AdminProvider } from '../context/AdminContext'

const links = [
  { to: '/admin', label: 'Dashboard', short: 'Home', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', short: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', short: 'Categories', icon: Tags },
  { to: '/admin/orders', label: 'Orders', short: 'Orders', icon: ShoppingBag },
  { to: '/admin/inventory', label: 'Inventory', short: 'Stock', icon: Boxes },
]

export function AdminLayout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#E8ECF1] text-slate-900 md:flex">
        {/* Desktop sidebar — flush to the left edge */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-100 md:flex">
          <div className="border-b border-slate-800 px-4 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Internal</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-white">Xoom Admin</p>
            <p className="mt-1 text-xs text-slate-400">Operations console</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1 p-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 ${
                    isActive
                      ? 'bg-slate-700 font-medium text-white shadow-sm'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
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
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              <Store size={15} />
              Buyer storefront
            </Link>
            <p className="mt-2 text-center text-[11px] text-slate-500">Demo navigation only</p>
          </div>
        </aside>

        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 md:hidden">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Internal</p>
            <p className="text-base font-semibold tracking-tight text-white">Xoom Admin</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <Store size={13} />
            Storefront
          </Link>
        </header>

        <main className="min-w-0 flex-1 px-4 pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-4 md:p-7 md:pb-7">
          <div className="mx-auto max-w-6xl">
            <motion.div
              key={location.pathname}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>

        {/* Mobile bottom tab bar */}
        <nav
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950 pb-[env(safe-area-inset-bottom)] md:hidden"
          aria-label="Admin sections"
        >
          <div className="grid grid-cols-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[10px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-slate-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                        isActive ? 'bg-slate-700 text-white' : 'text-slate-400'
                      }`}
                    >
                      <link.icon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
                    </span>
                    <span className="leading-none">{link.short}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </AdminProvider>
  )
}
