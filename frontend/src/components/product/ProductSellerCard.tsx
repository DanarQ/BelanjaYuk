import { Link } from 'react-router'
import type { ProductSeller } from './productTypes'

interface ProductSellerCardProps {
  seller: ProductSeller
  onChat: () => void
}

export default function ProductSellerCard({ seller, onChat }: ProductSellerCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-center">
        {/* Left: Store identity & CTA buttons */}
        <div className="flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0 lg:pr-6">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-center text-[9px] font-bold text-white py-0.5">
              OFFICIAL
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {seller.name}
              </h3>
            </div>

            <p className="text-[11px] text-slate-400">
              Aktif {seller.activeTime} · {seller.city}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={onChat}
                className="flex items-center gap-1 rounded border border-emerald-600 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.154-.755c.162-.977.409-1.928.73-2.836C3.593 15.938 3 14.053 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <span>Chat Sekarang</span>
              </button>

              <Link
                to="/produk"
                className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors"
              >
                Kunjungi Toko
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Seller Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Penilaian Toko</span>
            <span className="font-bold text-emerald-700 text-sm mt-0.5 block">
              ★ {seller.rating.toFixed(1)}{' '}
              <span className="font-normal text-slate-500 text-xs">({(seller.ratingCount / 1000).toFixed(1)}rb)</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Produk</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {seller.productCount}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Waktu Balas Chat</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {seller.responseRate}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Bergabung</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {seller.joinedTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

