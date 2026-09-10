import { useState } from 'react'
import { bestSellers } from '../../data/bestSellers'

const categories = ['Semua', ...new Set(bestSellers.map((product) => product.category))]
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
})
const number = new Intl.NumberFormat('id-ID')

export default function ProdukTerlarisSection() {
  const [category, setCategory] = useState('Semua')
  const products = bestSellers
    .filter((product) => category === 'Semua' || product.category === category)
    .sort((a, b) => b.sold - a.sold)

  return (
    <section id="produk-terlaris" aria-labelledby="best-sellers-heading" className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="rounded-md border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div>
            <h2 id="best-sellers-heading" className="text-base font-semibold uppercase tracking-wide text-slate-700">Produk Terlaris</h2>
          </div>
        </div>

        <div role="group" aria-label="Filter kategori produk terlaris" className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} aria-controls="best-seller-products" onClick={() => setCategory(item)}
              className={`min-h-10 shrink-0 cursor-pointer rounded border px-4 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:text-sm ${category === item ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50'}`}>
              {item}
            </button>
          ))}
        </div>
        <p role="status" className="sr-only">{products.length} produk ditampilkan untuk kategori {category}.</p>

        <ul id="best-seller-products" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <li key={product.id} className="min-w-0 overflow-hidden rounded border border-gray-100 bg-white">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img src={product.image} alt={`Ilustrasi ${product.category}`} loading="lazy" width={240} height={240} className="h-full w-full object-cover" />
                <span className="absolute left-2 top-0 bg-orange-600 px-2 pb-3 pt-2 text-xs font-bold tracking-wide text-white [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]">TOP</span>
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-700">{product.name}</h3>
                <p className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">{rupiah.format(product.price)}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-slate-500">
                  <span aria-label={`Rating ${product.rating} dari 5`} className="inline-flex items-center gap-1 text-slate-700">
                    <svg aria-hidden="true" className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" /></svg>
                    {number.format(product.rating)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{number.format(product.sold)} terjual</span>
                </div>
                <p className="mt-2 truncate text-[11px] text-slate-400">{product.city}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] text-slate-400">Pratinjau produk · Data contoh dan gambar ilustrasi.</p>
      </div>
    </section>
  )
}
