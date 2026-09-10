import { Link, useSearchParams } from 'react-router'
import { recommendations } from '../data/recommendations'
import { categories } from '../data/categories'

export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const category = params.get('kategori') || ''
  const products = recommendations.filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.toLocaleLowerCase('id-ID')) &&
    (!category || product.category === category),
  )
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold">{query ? `Hasil pencarian “${query}”` : 'Semua Produk'}</h1>
      <label className="mt-5 flex items-center gap-3 text-sm">Kategori
        <select value={category} onChange={(event) => {
          const next = new URLSearchParams(params)
          if (event.target.value) next.set('kategori', event.target.value)
          else next.delete('kategori')
          setParams(next)
        }} className="min-w-0 rounded border border-gray-300 bg-white p-2">
          <option value="">Semua kategori</option>
          {category && !categories.includes(category) && <option>{category}</option>}
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <p role="status" className="my-4 text-sm text-slate-500">{products.length} produk ditemukan · Data contoh</p>
      {products.length ? <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => <li key={product.id}>
          <Link to={`/produk/${product.id}`} className="block h-full overflow-hidden rounded border border-gray-200 bg-white hover:border-emerald-600">
            <img src={product.image} alt={`Ilustrasi ${product.name}`} className="aspect-square w-full object-cover" />
            <div className="p-3"><h2 className="text-sm">{product.name}</h2><p className="mt-3 font-semibold text-orange-600">Rp{product.price.toLocaleString('id-ID')}</p></div>
          </Link>
        </li>)}
      </ul> : <p className="py-10 text-slate-500">Belum ada produk yang sesuai. Coba kata kunci atau kategori lain.</p>}
    </section>
  )
}
