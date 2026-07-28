import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products, type Category } from '../data/products'
import { PageTransition } from '../components/ui'

type SortKey = 'newest' | 'price-asc' | 'price-desc'

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const initialCategory = (params.get('category') as Category | null) ?? 'All'
  const initialQuery = params.get('q') ?? ''

  const [category, setCategory] = useState<Category | 'All'>(
    categories.includes(initialCategory as Category) ? (initialCategory as Category) : 'All',
  )
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState<SortKey>('newest')
  const [maxPrice, setMaxPrice] = useState(12000)

  useEffect(() => {
    const nextQuery = params.get('q') ?? ''
    setQuery(nextQuery)
    const nextCategory = params.get('category')
    if (nextCategory && categories.includes(nextCategory as Category)) {
      setCategory(nextCategory as Category)
    }
  }, [params])

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const byCategory = category === 'All' || product.category === category
      const byQuery = product.name.toLowerCase().includes(query.toLowerCase())
      const byPrice = product.price <= maxPrice
      return byCategory && byQuery && byPrice
    })

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return b.createdAt.localeCompare(a.createdAt)
    })
    return list
  }, [category, query, sort, maxPrice])

  function updateCategory(next: Category | 'All') {
    setCategory(next)
    const nextParams = new URLSearchParams(params)
    if (next === 'All') nextParams.delete('category')
    else nextParams.set('category', next)
    setParams(nextParams)
  }

  return (
    <PageTransition>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[240px_1fr] md:px-6">
        <aside className="h-fit rounded-lg border border-line bg-paper p-4 shadow-[var(--shadow-soft)]">
          <h1 className="font-display text-2xl">Browse</h1>
          <p className="mt-1 text-sm text-mist">{filtered.length} pieces</p>

          <label className="mt-5 block text-caption uppercase tracking-[0.14em] text-mist">Search</label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm"
            placeholder="Filter by name"
          />

          <p className="mt-5 text-caption uppercase tracking-[0.14em] text-mist">Category</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(['All', ...categories] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => updateCategory(item)}
                className={`rounded-full border px-3 py-1.5 text-caption ${
                  category === item ? 'border-forest bg-forest text-paper' : 'border-line bg-canvas text-ink'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-caption uppercase tracking-[0.14em] text-mist">
            Max price · ₹{maxPrice.toLocaleString('en-IN')}
          </label>
          <input
            type="range"
            min={1000}
            max={12000}
            step={500}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="mt-2 w-full accent-forest"
          />

          <label className="mt-5 block text-caption uppercase tracking-[0.14em] text-mist">Sort</label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="mt-2 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </aside>

        <section>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-line bg-paper p-10 text-center">
              <p className="font-display text-2xl">No matches</p>
              <p className="mt-2 text-sm text-mist">Try clearing filters or searching a different keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  )
}
