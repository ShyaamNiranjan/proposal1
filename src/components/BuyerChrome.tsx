import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'

export function BuyerNav() {
  const { itemCount, bump } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="font-display text-xl tracking-tight text-ink md:text-2xl">
          Xoom <span className="text-forest">Store</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-4 text-sm text-mist md:flex">
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'text-forest' : 'hover:text-ink')}>
            Shop
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? 'text-forest' : 'hover:text-ink')}>
            Orders
          </NavLink>
        </nav>

        <form onSubmit={onSearch} className="ml-auto flex min-w-0 flex-1 max-w-md items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2">
          <Search size={16} className="shrink-0 text-mist" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search home & lifestyle..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-mist"
            aria-label="Search products"
          />
        </form>

        <button type="button" className="hidden rounded-md p-2 text-mist hover:text-ink md:inline-flex" aria-label="Account">
          <User size={20} />
        </button>

        <Link to="/cart" className="relative rounded-md p-2 text-ink" aria-label={`Cart with ${itemCount} items`}>
          <motion.span animate={bump ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : { scale: 1 }} transition={{ duration: 0.4 }}>
            <ShoppingBag size={20} />
          </motion.span>
          {itemCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] font-semibold text-paper">
              {itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  )
}

export function BuyerFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-xl text-ink">Xoom Store</p>
          <p className="mt-2 max-w-sm text-sm text-mist">
            Placeholder brand name for this proposal prototype. In production this becomes the client&apos;s retail identity.
          </p>
        </div>
        <div className="text-sm text-mist">
          <p className="mb-2 font-medium text-ink">Explore</p>
          <div className="flex flex-col gap-1">
            <Link to="/shop">All products</Link>
            <Link to="/orders">Order history</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
        <div className="text-sm text-mist">
          <p className="mb-2 font-medium text-ink">Demo</p>
          <Link to="/admin" className="inline-flex items-center gap-1 text-forest hover:underline">
            Admin →
          </Link>
          <p className="mt-3 text-caption">UI concept prototype · not a production system</p>
        </div>
      </div>
    </footer>
  )
}
