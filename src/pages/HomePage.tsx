import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'
import { PageTransition } from '../components/ui'

const categoryImages: Record<string, string> = {
  Kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700&q=80',
  Decor: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80',
  Textiles: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
  Lighting: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80',
}

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 8)

  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-line bg-ink text-paper">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-28">
          <div>
            <p className="text-caption uppercase tracking-[0.2em] text-brass">Monsoon Edit · 2026</p>
            <h1 className="mt-4 text-display">Quiet objects for considered homes.</h1>
            <p className="mt-4 max-w-xl text-lead text-paper/80">
              Premium kitchenware, textiles, lighting, and decor — curated for everyday ritual, not seasonal noise.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex rounded-md bg-forest px-5 py-3 text-sm font-medium text-paper transition hover:bg-moss"
            >
              Shop the collection
            </Link>
          </div>
          <div className="hidden self-end rounded-xl border border-paper/15 bg-paper/10 p-5 backdrop-blur md:block">
            <p className="text-caption uppercase tracking-[0.16em] text-brass">Featured</p>
            <p className="mt-2 font-display text-2xl">Arc Brass Floor Lamp</p>
            <p className="mt-1 text-sm text-paper/70">Statement lighting with a linen shade and marble base.</p>
            <Link to="/product/arc-floor-lamp" className="mt-4 inline-block text-sm text-brass underline-offset-4 hover:underline">
              View product
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-title">Shop by room mood</h2>
          <Link to="/shop" className="text-sm text-forest hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/shop?category=${category}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-line"
            >
              <img
                src={categoryImages[category]}
                alt={category}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-2xl text-paper">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <h2 className="mb-6 text-title">Featured pieces</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
