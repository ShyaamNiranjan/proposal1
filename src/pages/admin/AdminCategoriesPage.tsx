import { useMemo, useState, type FormEvent } from 'react'
import { Package, Pencil, Plus, Tags, Trash2, X } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, renameCategory, deleteCategory } = useAdmin()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    categories.forEach((category) => map.set(category, 0))
    products.forEach((product) => map.set(product.category, (map.get(product.category) ?? 0) + 1))
    return map
  }, [categories, products])

  function openAdd() {
    setEditing(null)
    setName('')
    setModalOpen(true)
  }

  function openEdit(category: string) {
    setEditing(category)
    setName(category)
    setModalOpen(true)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const ok = editing ? renameCategory(editing, name) : addCategory(name)
    if (ok) {
      setModalOpen(false)
      setName('')
      setEditing(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-slate-600">Organize the catalog the storefront filters against.</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <Plus size={16} />
          Add category
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Tags className="text-slate-400" size={28} />
            <p className="font-medium text-slate-800">No categories yet</p>
            <p className="max-w-sm text-sm text-slate-500">Add Kitchen, Decor, or any aisle your assortment needs.</p>
            <button
              type="button"
              onClick={openAdd}
              className="mt-1 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Plus size={16} />
              Add category
            </button>
          </div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{category}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Package size={14} className="text-slate-400" />
                      {counts.get(category) ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {confirmDelete === category ? (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-600">Delete {category}?</span>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCategory(category)
                            setConfirmDelete(null)
                          }}
                          className="rounded bg-rose-600 px-2 py-1 font-medium text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
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
                          aria-label={`Rename ${category}`}
                          onClick={() => openEdit(category)}
                          className="rounded p-1.5 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${category}`}
                          onClick={() => setConfirmDelete(category)}
                          className="rounded p-1.5 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 sm:items-center" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">{editing ? 'Rename category' : 'Add category'}</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
                className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-slate-700">Name</span>
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  placeholder="e.g. Outdoor"
                  required
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  {editing ? 'Save' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
