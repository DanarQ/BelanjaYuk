import { useEffect, useRef, useState } from 'react'
import { flashSaleProducts } from '../../data/flashSale'

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
})

export default function FlashSaleSection() {
  const list = useRef<HTMLUListElement>(null)
  // Demo deadline. Replace with the campaign deadline when connecting the API.
  const [endsAt] = useState(() => new Date().setHours(24, 0, 0, 0))
  const [remaining, setRemaining] = useState(() => Math.max(0, endsAt - Date.now()))

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, endsAt - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [endsAt])

  const seconds = Math.floor(remaining / 1000)
  const countdown = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]

  return (
    <section aria-labelledby="flash-sale-heading" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 bg-linear-to-r from-orange-50 to-white px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div>
              <h2 id="flash-sale-heading" className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-orange-600">
                <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" /></svg>
                Flash Sale
              </h2>
              <p className="mt-1 text-xs text-slate-500">Harga spesial, stok terbatas</p>
            </div>
            {remaining === 0 ? <p role="status" className="text-sm text-slate-500">Promo telah berakhir</p> : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Berakhir dalam</span>
                <div role="timer" aria-label={`${countdown[0]} jam ${countdown[1]} menit ${countdown[2]} detik`} className="flex items-center gap-1 text-sm font-semibold tabular-nums">
                  {countdown.map((value, index) => (
                    <span key={index} className="flex items-center gap-1">
                      {index > 0 && <span aria-hidden="true">:</span>}
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-slate-800 text-white">{String(value).padStart(2, '0')}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {([-1, 1] as const).map((direction) => (
              <button key={direction} type="button" aria-label={direction === -1 ? 'Produk sebelumnya' : 'Produk berikutnya'} aria-controls="flash-sale-products"
                onClick={() => list.current?.scrollBy({ left: direction * list.current.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-orange-600">
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={direction === -1 ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} /></svg>
              </button>
            ))}
          </div>
        </div>
        <ul id="flash-sale-products" ref={list} tabIndex={0} aria-label="Produk flash sale" className="flex snap-x snap-mandatory gap-3 overflow-x-auto p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-600 sm:gap-4 sm:p-5">
          {flashSaleProducts.map((product) => (
            <li key={product.id} className="w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-gray-100 sm:w-48">
              <div className="relative aspect-square bg-gray-50">
                <img src={product.image} alt={product.name} loading="lazy" width={240} height={240} className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-orange-600 px-2 py-1 text-xs font-bold text-white">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-700">{product.name}</h3>
                <p className="mt-2 text-lg font-bold text-orange-600">{rupiah.format(product.price)}</p>
                <p className="mt-0.5 text-xs text-slate-400"><span className="sr-only">Harga normal </span><s>{rupiah.format(product.originalPrice)}</s></p>
                <div className="relative mt-3 h-5 overflow-hidden rounded-full bg-orange-100">
                  <div aria-hidden="true" className="absolute inset-y-0 left-0 rounded-full bg-orange-300" style={{ width: `${product.sold / product.stock * 100}%` }} />
                  <p className="relative text-center text-[10px] font-semibold leading-5 text-orange-950">{remaining === 0 ? 'Promo berakhir' : `${product.sold} terjual · tersisa ${product.stock - product.sold}`}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="px-4 pb-3 text-[11px] text-slate-400 sm:px-5">Pratinjau promo · Data contoh dan gambar ilustrasi.</p>
      </div>
    </section>
  )
}
