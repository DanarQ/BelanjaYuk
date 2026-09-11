import { Link } from 'react-router'
import type { Product } from '../../data/recommendations'

interface ProductStickyBottomBarProps {
  product: Product
  onAddToCart: () => void
  onBuyNow: () => void
  onChat: () => void
}

export default function ProductStickyBottomBar({
  onAddToCart,
  onBuyNow,
  onChat,
}: ProductStickyBottomBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-gray-200 bg-white px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        {/* Chat Icon Button */}
        <button
          type="button"
          onClick={onChat}
          className="flex flex-col items-center justify-center px-2 py-1 text-slate-600 hover:text-emerald-700 transition-colors"
          title="Chat Penjual"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.154-.755c.162-.977.409-1.928.73-2.836C3.593 15.938 3 14.053 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span className="text-[10px] font-medium">Chat</span>
        </button>

        {/* Keranjang Link */}
        <Link
          to="/keranjang"
          className="relative flex flex-col items-center justify-center px-2 py-1 text-slate-600 hover:text-emerald-700 transition-colors"
          title="Lihat Keranjang"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span className="text-[10px] font-medium">Keranjang</span>
        </Link>

        {/* Actions */}
        <div className="flex flex-1 items-center gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="flex-1 rounded-md border border-emerald-600 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            + Keranjang
          </button>

          <button
            type="button"
            onClick={onBuyNow}
            className="flex-1 rounded-md bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-xs transition-colors"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}

