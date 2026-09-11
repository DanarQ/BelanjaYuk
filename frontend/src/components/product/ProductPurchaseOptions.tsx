import { useState } from 'react'
import type { Product } from '../../data/recommendations'
import type { ProductVariant } from './productTypes'

interface ProductPurchaseOptionsProps {
  product: Product
  variants: ProductVariant[]
  onAddToCart: (quantity: number, variant: ProductVariant) => void
  onBuyNow: (quantity: number, variant: ProductVariant) => void
}

export default function ProductPurchaseOptions({
  product,
  variants,
  onAddToCart,
  onBuyNow,
}: ProductPurchaseOptionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants[0] || { id: 'default', name: 'Standar' }
  )
  const [quantity, setQuantity] = useState(1)
  const maxStock = 48

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(maxStock, prev + 1))
  }

  return (
    <div className="space-y-5 text-sm">
      {/* 1. Pengiriman (Shipping Information) */}
      <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 pt-2 text-xs">
        <span className="font-semibold text-slate-500">Pengiriman:</span>
        <div className="space-y-1.5 text-slate-700">
          <div className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.948c0-.621-.504-1.125-1.125-1.125H4.5A1.125 1.125 0 0 0 3.375 6.625v7.625m10.875 0H3.375" />
            </svg>
            <span>
              Dikirim dari <strong className="font-semibold text-slate-900">{product.city}</strong> ke <strong className="font-semibold text-slate-900">Pontianak</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              {product.freeShipping ? 'Gratis Ongkir' : 'Ongkir Mulai Rp15.000'}
            </span>
            <span className="text-[11px] text-slate-500">Estimasi tiba: 2 - 4 hari kerja</span>
          </div>
        </div>
      </div>

      {/* 2. Pilihan Varian */}
      {variants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 pt-2 text-xs items-center">
          <span className="font-semibold text-slate-500">Pilihan:</span>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-100 font-semibold shadow-xs'
                      : 'border-gray-200 bg-white text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  {variant.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 3. Stepper Kuantitas & Sisa Stok */}
      <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 pt-2 text-xs items-center">
        <span className="font-semibold text-slate-500">Kuantitas:</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded border border-gray-300 bg-white">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Kurangi kuantitas"
              className="px-3 py-1 text-slate-600 hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="w-10 text-center font-semibold text-slate-800 text-xs">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= maxStock}
              aria-label="Tambah kuantitas"
              className="px-3 py-1 text-slate-600 hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          <span className="text-[11px] text-slate-500">
            Tersisa <strong className="font-semibold text-slate-700">{maxStock}</strong> buah
          </span>
        </div>
      </div>

      {/* 4. Desktop CTA Buttons */}
      <div className="hidden sm:flex items-center gap-3 pt-4">
        {/* Masukkan Keranjang */}
        <button
          type="button"
          onClick={() => onAddToCart(quantity, selectedVariant)}
          className="flex-1 flex items-center justify-center gap-2 rounded-md border-2 border-emerald-600 bg-emerald-50/80 px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100/80 transition-colors shadow-xs cursor-pointer"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span>Masukkan Keranjang</span>
        </button>

        {/* Beli Sekarang */}
        <button
          type="button"
          onClick={() => onBuyNow(quantity, selectedVariant)}
          className="flex-1 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
        >
          Beli Sekarang
        </button>
      </div>

      {/* 5. Trust Assurances (Jaminan BelanjaYuk) */}
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-[11px] text-slate-500 text-center">
        <div className="flex flex-col items-center gap-1">
          <svg aria-hidden="true" className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          <span>100% Produk Original</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <svg aria-hidden="true" className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>7 Hari Bebas Retur</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <svg aria-hidden="true" className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>Bebas Biaya Pengembalian</span>
        </div>
      </div>
    </div>
  )
}

