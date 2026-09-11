import { useEffect } from 'react'
import { Link } from 'react-router'
import type { Product } from '../../data/recommendations'
import type { ProductVariant } from './productTypes'

interface CartSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
  variant: ProductVariant
  quantity: number
  isBuyNow?: boolean
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export default function CartSuccessModal({
  isOpen,
  onClose,
  product,
  variant,
  quantity,
  isBuyNow = false,
}: CartSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const subtotal = product.price * quantity

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Dialog Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-6">
        {/* Header with success icon */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 id="cart-modal-title" className="text-base font-bold text-slate-900">
                {isBuyNow ? 'Lanjutkan Pembelian' : 'Berhasil Ditambahkan!'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBuyNow
                  ? 'Produk siap diproses ke pembayaran'
                  : 'Barang telah masuk ke keranjang belanja Anda'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="rounded-full p-1 text-slate-400 hover:bg-gray-100 hover:text-slate-600 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product Preview Card */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-16 w-16 shrink-0 rounded-md object-cover border border-gray-200"
          />

          <div className="flex-1 min-w-0 text-xs">
            <h4 className="font-semibold text-slate-800 line-clamp-1">{product.name}</h4>
            <p className="text-slate-500 mt-0.5">
              Variasi: <span className="font-medium text-slate-700">{variant.name}</span>
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-slate-500">Jumlah: {quantity}x</span>
              <span className="font-bold text-orange-600 text-sm">{rupiah.format(subtotal)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 rounded-md border border-gray-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Lanjut Belanja
          </button>

          <Link
            to="/keranjang"
            onClick={onClose}
            className="w-full sm:flex-1 rounded-md bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-emerald-700 shadow-xs transition-colors"
          >
            {isBuyNow ? 'Ke Pembayaran' : 'Lihat Keranjang'}
          </Link>
        </div>
      </div>
    </div>
  )
}

