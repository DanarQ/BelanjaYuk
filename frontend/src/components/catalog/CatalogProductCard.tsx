import { Link } from 'react-router'
import type { Product } from '../../data/recommendations'

interface CatalogProductCardProps {
  product: Product
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const formatSold = (sold: number): string => {
  if (sold >= 1000) {
    const formatted = (sold / 1000).toFixed(1).replace('.0', '')
    return `${formatted}rb+`
  }
  return sold.toString()
}

export default function CatalogProductCard({ product }: CatalogProductCardProps) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-600 hover:shadow-md">
      {/* Product Image & Badges */}
      <Link to={`/produk/${product.id}`} className="relative aspect-square w-full overflow-hidden bg-gray-100 block">
        <img
          src={product.image}
          alt={`Ilustrasi ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute right-0 top-0 rounded-bl bg-orange-500 px-1.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title */}
        <h3 className="line-clamp-2 min-h-10 text-xs sm:text-sm font-medium leading-snug text-slate-800">
          <Link to={`/produk/${product.id}`} className="hover:text-emerald-700 transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Price & Strikethrough */}
        <div className="mt-2.5">
          <p className="text-sm sm:text-base font-bold text-orange-600">
            {rupiah.format(product.price)}
          </p>
          {discount > 0 && (
            <p className="text-[11px] text-slate-400 line-through">
              {rupiah.format(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Badges / Shipping / COD */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {product.freeShipping && (
            <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
              Gratis Ongkir
            </span>
          )}
          {product.isCod && (
            <span className="inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200">
              COD
            </span>
          )}
        </div>

        {/* Rating & Sold & City Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-1 text-[11px] text-slate-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <svg aria-hidden="true" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" />
              </svg>
              <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
            </div>
            <span>{formatSold(product.sold)} terjual</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 truncate">
            <svg aria-hidden="true" className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="truncate">{product.city}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

