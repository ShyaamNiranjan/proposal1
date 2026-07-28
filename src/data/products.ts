export type Category = string

export type Variant = {
  id: string
  label: string
  stock: number
}

export type Product = {
  id: string
  name: string
  category: Category
  price: number
  mrp: number
  description: string
  stock: number
  images: [string, string, ...string[]]
  variants?: Variant[]
  featured?: boolean
  createdAt: string
}

export const categories: Category[] = ['Kitchen', 'Decor', 'Textiles', 'Lighting']

/** Placeholder imagery for products created in the admin demo */
export const defaultProductImages: [string, string] = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
]

export const salesTrend = [
  { day: '14 Jul', orders: 4, revenue: 12800 },
  { day: '15 Jul', orders: 6, revenue: 18450 },
  { day: '16 Jul', orders: 3, revenue: 9200 },
  { day: '17 Jul', orders: 8, revenue: 24100 },
  { day: '18 Jul', orders: 5, revenue: 15600 },
  { day: '19 Jul', orders: 7, revenue: 21340 },
  { day: '20 Jul', orders: 9, revenue: 27890 },
  { day: '21 Jul', orders: 4, revenue: 11200 },
  { day: '22 Jul', orders: 6, revenue: 16900 },
  { day: '23 Jul', orders: 8, revenue: 23150 },
  { day: '24 Jul', orders: 5, revenue: 14820 },
  { day: '25 Jul', orders: 7, revenue: 20500 },
  { day: '26 Jul', orders: 10, revenue: 31200 },
  { day: '27 Jul', orders: 6, revenue: 18740 },
]

export const products: Product[] = [
  {
    id: 'aurora-pour-over',
    name: 'Aurora Ceramic Pour-Over Set',
    category: 'Kitchen',
    price: 2899,
    mrp: 3499,
    stock: 18,
    featured: true,
    createdAt: '2026-06-12',
    description:
      'Hand-glazed stoneware dripper with a matching 600ml carafe. Slow-flow ridges extract a cleaner cup without bitterness.',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80',
    ],
    variants: [
      { id: 'clay', label: 'Clay', stock: 8 },
      { id: 'ink', label: 'Ink', stock: 6 },
      { id: 'sand', label: 'Sand', stock: 4 },
    ],
  },
  {
    id: 'hearth-cast-skillet',
    name: 'Hearth Cast Iron Skillet',
    category: 'Kitchen',
    price: 4299,
    mrp: 4999,
    stock: 11,
    featured: true,
    createdAt: '2026-05-28',
    description:
      'Pre-seasoned 26cm skillet with a helper handle. Even heat for searing vegetables and finishing in the oven.',
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80',
    ],
    variants: [
      { id: '26cm', label: '26 cm', stock: 7 },
      { id: '30cm', label: '30 cm', stock: 4 },
    ],
  },
  {
    id: 'linen-apron-studio',
    name: 'Studio Linen Chef Apron',
    category: 'Kitchen',
    price: 1799,
    mrp: 2199,
    stock: 3,
    featured: false,
    createdAt: '2026-07-01',
    description:
      'Heavyweight European linen apron with adjustable cross-back straps and a deep front pocket for tools.',
    images: [
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    ],
    variants: [
      { id: 'natural', label: 'Natural', stock: 2 },
      { id: 'olive', label: 'Olive', stock: 1 },
      { id: 'charcoal', label: 'Charcoal', stock: 0 },
    ],
  },
  {
    id: 'oak-serving-board',
    name: 'Live-Edge Oak Serving Board',
    category: 'Kitchen',
    price: 3199,
    mrp: 3799,
    stock: 9,
    featured: true,
    createdAt: '2026-04-18',
    description:
      'Solid oak board with a natural edge and food-safe oil finish. Ideal for cheese boards and brunch spreads.',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80',
    ],
  },
  {
    id: 'terra-vase-tall',
    name: 'Terra Tall Speckle Vase',
    category: 'Decor',
    price: 2499,
    mrp: 2999,
    stock: 14,
    featured: true,
    createdAt: '2026-06-02',
    description:
      'Wheel-thrown vase with a soft speckled glaze. Tall silhouette for dried grasses or a single stem statement.',
    images: [
      'https://images.unsplash.com/photo-1578500494198-444d5767e4f8?w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    ],
    variants: [
      { id: 'cream', label: 'Cream', stock: 8 },
      { id: 'sage', label: 'Sage', stock: 6 },
    ],
  },
  {
    id: 'woven-wall-disc',
    name: 'Woven Reed Wall Disc',
    category: 'Decor',
    price: 3899,
    mrp: 4499,
    stock: 7,
    featured: false,
    createdAt: '2026-05-09',
    description:
      'Handwoven reed disc with brass hanging hardware. Adds texture above a console or reading nook.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=80',
    ],
  },
  {
    id: 'marble-bookend-pair',
    name: 'Carrara Marble Bookend Pair',
    category: 'Decor',
    price: 4599,
    mrp: 5299,
    stock: 4,
    featured: true,
    createdAt: '2026-03-22',
    description:
      'Solid marble bookends with felted bases. Weight that keeps shelves tidy without visual noise.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
    ],
  },
  {
    id: 'brass-candle-pillar',
    name: 'Brass Column Candle Holders',
    category: 'Decor',
    price: 2199,
    mrp: 2699,
    stock: 16,
    featured: false,
    createdAt: '2026-07-08',
    description:
      'Set of two brushed-brass pillars. Warm ambient light for dining tables and evening shelves.',
    images: [
      'https://images.unsplash.com/photo-1602874801006-e26c4f4f0e0f?w=900&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=900&q=80',
    ],
  },
  {
    id: 'cloud-duvet-cover',
    name: 'Cloud Soft Cotton Duvet Cover',
    category: 'Textiles',
    price: 5499,
    mrp: 6499,
    stock: 10,
    featured: true,
    createdAt: '2026-06-20',
    description:
      '200-thread-count washed cotton with a matte hand-feel. Breathable year-round bedding in calm neutrals.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80',
    ],
    variants: [
      { id: 'queen-ivory', label: 'Queen · Ivory', stock: 5 },
      { id: 'queen-fog', label: 'Queen · Fog', stock: 3 },
      { id: 'king-ivory', label: 'King · Ivory', stock: 2 },
      { id: 'king-fog', label: 'King · Fog', stock: 0 },
    ],
  },
  {
    id: 'wool-throw-heather',
    name: 'Heather Wool Throw',
    category: 'Textiles',
    price: 3699,
    mrp: 4299,
    stock: 8,
    featured: true,
    createdAt: '2026-04-30',
    description:
      'Merino-blend throw with fringed ends. Soft enough for skin, dense enough for monsoon evenings.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
    ],
    variants: [
      { id: 'heather', label: 'Heather Grey', stock: 5 },
      { id: 'camel', label: 'Camel', stock: 3 },
    ],
  },
  {
    id: 'blockprint-cushion',
    name: 'Indigo Block-Print Cushion Cover',
    category: 'Textiles',
    price: 1299,
    mrp: 1599,
    stock: 2,
    featured: false,
    createdAt: '2026-07-14',
    description:
      'Hand block-printed cotton cover with hidden zipper. Fits a standard 45×45 cm insert.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80',
    ],
    variants: [
      { id: 'indigo', label: 'Indigo', stock: 2 },
      { id: 'rust', label: 'Rust', stock: 0 },
    ],
  },
  {
    id: 'bath-towel-set',
    name: 'Spa Weight Bath Towel Set',
    category: 'Textiles',
    price: 2799,
    mrp: 3299,
    stock: 13,
    featured: false,
    createdAt: '2026-05-15',
    description:
      'Four-piece set in long-staple cotton terry. Absorbent without bulk, stone-washed for softness.',
    images: [
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=900&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80',
    ],
    variants: [
      { id: 'stone', label: 'Stone', stock: 7 },
      { id: 'white', label: 'Optical White', stock: 6 },
    ],
  },
  {
    id: 'arc-floor-lamp',
    name: 'Arc Brass Floor Lamp',
    category: 'Lighting',
    price: 8999,
    mrp: 10999,
    stock: 5,
    featured: true,
    createdAt: '2026-03-08',
    description:
      'Overarching floor lamp with a linen shade and weighted marble base. Soft reading light for sofas.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e69d9?w=900&q=80',
    ],
  },
  {
    id: 'globe-table-lamp',
    name: 'Opaline Globe Table Lamp',
    category: 'Lighting',
    price: 4199,
    mrp: 4899,
    stock: 12,
    featured: false,
    createdAt: '2026-06-28',
    description:
      'Milk-glass globe on a matte black stem. Gentle ambient glow for nightstands and desks.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e69d9?w=900&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=900&q=80',
    ],
  },
  {
    id: 'pendant-rattan',
    name: 'Rattan Dome Pendant',
    category: 'Lighting',
    price: 5699,
    mrp: 6499,
    stock: 6,
    featured: true,
    createdAt: '2026-04-04',
    description:
      'Handwoven rattan dome with adjustable cord. Patterned light that warms dining corners.',
    images: [
      'https://images.unsplash.com/photo-1524484483549-c7a0c2b1c5f0?w=900&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    ],
  },
]

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function formatINR(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function discountPercent(price: number, mrp: number) {
  return Math.round(((mrp - price) / mrp) * 100)
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export type MockOrder = {
  id: string
  placedOn: string
  status: OrderStatus
  total: number
  eta: string
  customerName: string
  pendingDays: number
  items: { productId: string; name: string; quantity: number; price: number; variant?: string }[]
  timeline: { label: string; done: boolean; at?: string }[]
}

export const mockOrders: MockOrder[] = [
  {
    id: 'XM-24018',
    placedOn: '2026-07-20',
    status: 'Shipped',
    total: 7098,
    eta: '31 Jul 2026',
    customerName: 'Ananya Mehta',
    pendingDays: 0,
    items: [
      { productId: 'aurora-pour-over', name: 'Aurora Ceramic Pour-Over Set', quantity: 1, price: 2899, variant: 'Clay' },
      { productId: 'brass-candle-pillar', name: 'Brass Column Candle Holders', quantity: 1, price: 2199 },
      { productId: 'blockprint-cushion', name: 'Indigo Block-Print Cushion Cover', quantity: 1, price: 1299, variant: 'Indigo' },
    ],
    timeline: [
      { label: 'Ordered', done: true, at: '20 Jul' },
      { label: 'Packed', done: true, at: '21 Jul' },
      { label: 'Shipped', done: true, at: '22 Jul' },
      { label: 'Out for delivery', done: false },
      { label: 'Delivered', done: false },
    ],
  },
  {
    id: 'XM-23902',
    placedOn: '2026-07-08',
    status: 'Delivered',
    total: 5499,
    eta: 'Delivered 12 Jul',
    customerName: 'Rohan Kapoor',
    pendingDays: 0,
    items: [
      { productId: 'cloud-duvet-cover', name: 'Cloud Soft Cotton Duvet Cover', quantity: 1, price: 5499, variant: 'Queen · Ivory' },
    ],
    timeline: [
      { label: 'Ordered', done: true, at: '8 Jul' },
      { label: 'Packed', done: true, at: '9 Jul' },
      { label: 'Shipped', done: true, at: '10 Jul' },
      { label: 'Out for delivery', done: true, at: '12 Jul' },
      { label: 'Delivered', done: true, at: '12 Jul' },
    ],
  },
  {
    id: 'XM-23811',
    placedOn: '2026-06-28',
    status: 'Processing',
    total: 8999,
    eta: '2 Aug 2026',
    customerName: 'Priya Nair',
    pendingDays: 3,
    items: [{ productId: 'arc-floor-lamp', name: 'Arc Brass Floor Lamp', quantity: 1, price: 8999 }],
    timeline: [
      { label: 'Ordered', done: true, at: '28 Jun' },
      { label: 'Packed', done: false },
      { label: 'Shipped', done: false },
      { label: 'Out for delivery', done: false },
      { label: 'Delivered', done: false },
    ],
  },
  {
    id: 'XM-23744',
    placedOn: '2026-06-15',
    status: 'Cancelled',
    total: 1799,
    eta: 'Cancelled',
    customerName: 'Vikram Shah',
    pendingDays: 0,
    items: [
      { productId: 'linen-apron-studio', name: 'Studio Linen Chef Apron', quantity: 1, price: 1799, variant: 'Natural' },
    ],
    timeline: [
      { label: 'Ordered', done: true, at: '15 Jun' },
      { label: 'Cancelled', done: true, at: '16 Jun' },
    ],
  },
]
