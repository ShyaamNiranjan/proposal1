import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import { Package, Pencil, Plus, Trash2, X } from 'lucide-react'
import { formatINR, type Product, type Variant } from '../../data/products'
import { isProductLowStock, productStock, useAdmin } from '../../context/AdminContext'

type FormState = {
  name: string
  category: string
  price: string
  mrp: string
  description: string
  stock: string
  variants: { id: string; label: string; stock: string }[]
}

function emptyForm(defaultCategory: string): FormState {
  return {
    name: '',
    category: defaultCategory,
    price: '',
    mrp: '',
    description: '',
    stock: '0',
    variants: [],
  }
}

function fromProduct(product: Product): FormState {
  return {
    name: product.name,
    category: product.category,
    price: String(product.price),
    mrp: String(product.mrp),
    description: product.description,
    stock: String(product.stock),
    variants: (product.variants ?? []).map((variant) => ({
      id: variant.id,
      label: variant.label,
      stock: String(variant.stock),
    })),
  }
}

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(() => emptyForm(categories[0] ?? 'Kitchen'))
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!drawerOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm(categories[0] ?? 'Kitchen'))
    setDrawerOpen(true)
  }

  function openEdit(product: Product) {
    setEditingId(product.id)
    setForm(fromProduct(product))
    setDrawerOpen(true)
  }

  function addVariantRow() {
    setForm((previous) => ({
      ...previous,
      variants: [...previous.variants, { id: `v-${Date.now()}`, label: '', stock: '0' }],
    }))
  }

  function updateVariant(index: number, patch: Partial<{ label: string; stock: string }>) {
    setForm((previous) => ({
      ...previous,
      variants: previous.variants.map((variant, i) => (i === index ? { ...variant, ...patch } : variant)),
    }))
  }

  function removeVariant(index: number) {
    setForm((previous) => ({
      ...previous,
      variants: previous.variants.filter((_, i) => i !== index),
    }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const variants: Variant[] = form.variants
      .filter((variant) => variant.label.trim())
      .map((variant) => ({
        id: variant.id || variant.label.toLowerCase().replace(/\s+/g, '-'),
        label: variant.label.trim(),
        stock: Number(variant.stock) || 0,
      }))
    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price) || 0,
      mrp: Number(form.mrp) || 0,
      description: form.description,
      stock: Number(form.stock) || 0,
      variants,
    }
    if (editingId) updateProduct(editingId, payload)
    else addProduct(payload)
    setDrawerOpen(false)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-slate-600">Create, edit, and retire catalog items for the storefront.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <Plus size={16} />
          Add product
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Package className="text-slate-400" size={28} />
            <p className="font-medium text-slate-800">No products in the catalog</p>
            <p className="max-w-sm text-sm text-slate-500">Add your first SKU to populate shop and inventory views.</p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-1 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Plus size={16} />
              Add product
            </button>
          </div>
        ) : (
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
                const low = isProductLowStock(product)
                return (
                  <tr key={product.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-slate-600">{product.category}</td>
                    <td className="px-4 py-3">{formatINR(product.price)}</td>
                    <td className="px-4 py-3">{productStock(product)}</td>
                    <td className="px-4 py-3">
                      {low ? (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Low stock</span>
                      ) : (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">Healthy</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {confirmDelete === product.id ? (
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-slate-600">Remove?</span>
                          <button
                            type="button"
                            onClick={() => {
                              deleteProduct(product.id)
                              setConfirmDelete(null)
                            }}
                            className="rounded bg-rose-600 px-2 py-1 font-medium text-white hover:bg-rose-500"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(null)}
                            className="rounded border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 text-slate-500">
                          <button
                            type="button"
                            aria-label={`Edit ${product.name}`}
                            onClick={() => openEdit(product)}
                            className="rounded p-1.5 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${product.name}`}
                            onClick={() => setConfirmDelete(product.id)}
                            className="rounded p-1.5 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button type="button" className="flex-1 cursor-default" aria-label="Close drawer" onClick={() => setDrawerOpen(false)} />
          <div className="flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 id={titleId} className="text-lg font-semibold tracking-tight">
                {editingId ? 'Edit product' : 'Add product'}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
                className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submit} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </Field>
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(event) => setForm((previous) => ({ ...previous, category: event.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price (₹)">
                    <input
                      required
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(event) => setForm((previous) => ({ ...previous, price: event.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </Field>
                  <Field label="MRP (₹)">
                    <input
                      required
                      type="number"
                      min="0"
                      value={form.mrp}
                      onChange={(event) => setForm((previous) => ({ ...previous, mrp: event.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(event) => setForm((previous) => ({ ...previous, description: event.target.value }))}
                    className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </Field>
                <Field label="Base stock (used when no variants)">
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(event) => setForm((previous) => ({ ...previous, stock: event.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </Field>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">Variants</p>
                    <button
                      type="button"
                      onClick={addVariantRow}
                      className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Plus size={12} />
                      Add row
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.variants.length === 0 ? (
                      <p className="rounded-lg border border-dashed border-slate-200 px-3 py-3 text-xs text-slate-500">
                        Optional — add size or color rows with their own stock.
                      </p>
                    ) : (
                      form.variants.map((variant, index) => (
                        <div key={variant.id} className="grid grid-cols-[1fr_88px_auto] gap-2">
                          <input
                            placeholder="Label"
                            value={variant.label}
                            onChange={(event) => updateVariant(index, { label: event.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                          />
                          <input
                            type="number"
                            min="0"
                            placeholder="Stock"
                            value={variant.stock}
                            onChange={(event) => updateVariant(index, { stock: event.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                          />
                          <button
                            type="button"
                            aria-label="Remove variant"
                            onClick={() => removeVariant(index)}
                            className="rounded-lg border border-slate-200 px-2 text-slate-500 hover:bg-rose-50 hover:text-rose-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  {editingId ? 'Save changes' : 'Create product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}
