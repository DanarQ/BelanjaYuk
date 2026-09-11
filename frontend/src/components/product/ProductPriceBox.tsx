import type { Product } from '../../data/recommendations'

interface ProductPriceBoxProps {
  product: Product
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export default function ProductPriceBox({ product }: ProductPriceBoxProps) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const savings = product.originalPrice - product.price

  return (
    <div className="rounded-lg bg-orange-50/50 p-4 border border-orange-100 sm:p-5">
      {/* Pricing Header */}
      <div className="flex flex-wrap items-baseline gap-3">
        {discount > 0 && (
          <span className="text-sm sm:text-base text-slate-400 line-through">
            {rupiah.format(product.originalPrice)}
          </span>
        )}

        <div className="flex items-center gap-2.5">
          <span className="text-2xl sm:text-3xl font-bold text-orange-600 tracking-tight">
            {rupiah.format(product.price)}
          </span>

          {discount > 0 && (
            <span className="rounded bg-orange-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Savings note */}
      {savings > 0 && (
        <p className="mt-1 text-xs font-semibold text-emerald-700">
          Hemat {rupiah.format(savings)} dari harga normal
        </p>
      )}

      {/* Voucher Toko Row */}
      <div className="mt-3.5 pt-3 border-t border-orange-100/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-700 mr-1">Voucher Toko:</span>
        <span className="rounded border border-dashed border-orange-400 bg-white px-2 py-0.5 font-medium text-orange-700 text-[11px]">
          Diskon Rp10.000
        </span>
        <span className="rounded border border-dashed border-orange-400 bg-white px-2 py-0.5 font-medium text-orange-700 text-[11px]">
          Cashback 5% Koin
        </span>
      </div>

      {/* Guarantee banner */}
      <div className="mt-3 flex items-center gap-2 rounded bg-white/80 px-3 py-2 text-xs text-slate-700 border border-orange-100">
        <svg aria-hidden="true" className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        <span className="text-[11px] text-slate-600">
          <strong>Garansi Tiba Tepat Waktu:</strong> Dapatkan voucher kompensasi jika pesanan terlambat tiba.
        </span>
      </div>
    </div>
  )
}

