import { useState } from 'react'
import { recommendations } from '../../data/recommendations'

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
})
const number = new Intl.NumberFormat('id-ID')
const pageSize = 12

export default function RekomendasiSection() {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const products = recommendations.slice(0, visibleCount)

  return (
    <section id="rekomendasi" aria-labelledby="recommendations-heading" className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="border-b-4 border-emerald-600 bg-white px-4 py-4 text-center">
        <h2 id="recommendations-heading" className="text-base font-semibold uppercase tracking-wide text-emerald-700">Rekomendasi Hari Ini</h2>
      </div>

      <ul id="recommendation-products" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((product) => {
          const discount = Math.round((1 - product.price / product.originalPrice) * 100)
          return (
            <li key={product.id} className="min-w-0 overflow-hidden rounded-sm border border-gray-200 bg-white">
              <div className="relative aspect-square bg-gray-100">
                <img src={product.image} alt={`Ilustrasi ${product.name}`} width={240} height={240} loading="lazy" className="h-full w-full object-cover" />
                {discount > 0 && <span className="absolute right-0 top-0 bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">-{discount}%</span>}
              </div>
              <div className="p-2.5">
                <h3 className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-700">{product.name}</h3>
                <div className="mt-2 flex min-h-5 items-center">
                  {discount > 0 && <span className="border border-orange-200 px-1 text-[10px] leading-4 text-orange-700">Hemat {rupiah.format(product.originalPrice - product.price)}</span>}
                </div>
                <p className="mt-2 text-base font-semibold text-orange-600">{rupiah.format(product.price)}</p>
                <div className="mt-2 flex flex-wrap justify-between gap-x-2 gap-y-1 text-[11px] text-slate-500">
                  <span>{product.city}</span>
                  <span>{number.format(product.sold)} terjual</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="py-6 text-center">
        {products.length < recommendations.length ? (
          <button type="button" aria-controls="recommendation-products" onClick={() => setVisibleCount((count) => count + pageSize)}
            className="min-h-11 w-full max-w-sm cursor-pointer rounded-sm border border-gray-300 bg-white px-6 py-2.5 text-sm text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Lihat Lainnya
          </button>
        ) : <p className="text-sm text-slate-500">Semua rekomendasi sudah ditampilkan.</p>}
        <p role="status" className="sr-only">Menampilkan {products.length} dari {recommendations.length} produk.</p>
        <p className="mt-3 text-[11px] text-slate-400">Data contoh dan gambar ilustrasi.</p>
      </div>
    </section>
  )
}
