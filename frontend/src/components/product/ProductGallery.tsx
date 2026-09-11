import { useState } from 'react'
import type { Product } from '../../data/recommendations'

interface ProductGalleryProps {
  product: Product
  images: string[]
}

export default function ProductGallery({ product, images }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [favCount, setFavCount] = useState(248)
  const [copied, setCopied] = useState(false)

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev)
    setFavCount((prev) => (isFavorited ? prev - 1 : prev + 1))
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeImage = images[selectedImageIndex] || product.image

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <img
          src={activeImage}
          alt={`Foto utama ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.freeShipping && (
            <span className="rounded bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs">
              GRATIS ONGKIR
            </span>
          )}
          {product.isCod && (
            <span className="rounded bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs">
              COD
            </span>
          )}
        </div>

        {discount > 0 && (
          <span className="absolute right-0 top-0 rounded-bl bg-orange-500 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
            -{discount}%
          </span>
        )}
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImageIndex(idx)}
            onMouseEnter={() => setSelectedImageIndex(idx)}
            aria-label={`Pilih foto ${idx + 1}`}
            className={`relative aspect-square overflow-hidden rounded-md border-2 bg-white transition-all cursor-pointer ${
              selectedImageIndex === idx
                ? 'border-emerald-600 ring-2 ring-emerald-100'
                : 'border-gray-200 hover:border-emerald-300 opacity-80 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Social & Wishlist Actions */}
      <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-slate-600">
        {/* Wishlist */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="flex items-center gap-1.5 font-medium hover:text-rose-600 transition-colors cursor-pointer"
        >
          <svg
            className={`h-4 w-4 transition-colors ${
              isFavorited ? 'fill-rose-500 text-rose-500' : 'fill-none text-slate-500'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span>
            {isFavorited ? 'Tersimpan di Favorit' : 'Favoritkan'} ({favCount})
          </span>
        </button>

        {/* Share */}
        <div className="relative">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 font-medium hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <svg
              className="h-4 w-4 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            <span>{copied ? 'Tautan Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

