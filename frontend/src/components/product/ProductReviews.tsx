import { useState } from 'react'
import type { ProductReview } from './productTypes'

interface ProductReviewsProps {
  rating: number
  totalReviews: number
  ratingCounts: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  reviews: ProductReview[]
}

export default function ProductReviews({
  rating,
  totalReviews,
  ratingCounts,
  reviews,
}: ProductReviewsProps) {
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null)
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({})

  const filteredReviews = selectedStarFilter !== null
    ? reviews.filter((r) => r.rating === selectedStarFilter)
    : reviews

  const toggleHelpful = (id: string) => {
    setHelpfulMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6 space-y-6">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          <span>Penilaian Produk</span>
        </div>
        <span className="text-xs font-normal text-slate-500">
          Total {totalReviews} ulasan pembeli
        </span>
      </h2>

      {/* Rating Summary Box */}
      <div className="rounded-lg bg-emerald-50/40 p-4 sm:p-5 border border-emerald-100/60 flex flex-col md:flex-row items-center gap-6">
        {/* Left: Rating number & stars */}
        <div className="flex flex-col items-center justify-center shrink-0 text-center">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ 5</span>
          </div>

          <div className="mt-1 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
                viewBox="0 0 24 24"
              >
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" />
              </svg>
            ))}
          </div>

          <span className="mt-1 text-[11px] text-slate-500 font-medium">
            Berdasarkan {totalReviews} ulasan
          </span>
        </div>

        {/* Right: Filter Buttons */}
        <div className="flex-1 flex flex-wrap gap-2 w-full justify-center md:justify-start">
          <button
            type="button"
            onClick={() => setSelectedStarFilter(null)}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              selectedStarFilter === null
                ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                : 'border-gray-200 bg-white text-slate-700 hover:border-emerald-300'
            }`}
          >
            Semua ({totalReviews})
          </button>

          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star as keyof typeof ratingCounts] || 0
            if (count === 0 && star <= 2) return null
            const isSelected = selectedStarFilter === star
            return (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedStarFilter(isSelected ? null : star)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                    : 'border-gray-200 bg-white text-slate-700 hover:border-emerald-300'
                }`}
              >
                {star} Bintang ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4 divide-y divide-gray-100">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => {
            const isHelpful = Boolean(helpfulMap[rev.id])
            return (
              <div key={rev.id} className="pt-4 first:pt-0">
                <div className="flex items-start gap-3">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="h-9 w-9 shrink-0 rounded-full object-cover border border-gray-200"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {rev.userName}
                      </span>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    {/* Stars */}
                    <div className="mt-1 flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" />
                        </svg>
                      ))}
                    </div>

                    {/* Variant tag */}
                    <p className="mt-1 text-[11px] text-slate-400">
                      Variasi: <span className="text-slate-600">{rev.variantName}</span>
                    </p>

                    {/* Comment */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {rev.comment}
                    </p>

                    {/* Helpful button */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleHelpful(rev.id)}
                        className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium transition-colors cursor-pointer ${
                          isHelpful
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 bg-white text-slate-500 hover:border-gray-300'
                        }`}
                      >
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.434.88 1.243 1.498 2.215 1.648h.001c.29.044.58.07.87.078H13.5M5.904 18.5V9.75m0 8.75H3.75A1.5 1.5 0 0 1 2.25 17V11.25a1.5 1.5 0 0 1 1.5-1.5h2.154" />
                        </svg>
                        <span>Membantu ({rev.helpfulCount + (isHelpful ? 1 : 0)})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p className="py-6 text-center text-xs text-slate-400">
            Belum ada ulasan untuk filter rating ini.
          </p>
        )}
      </div>
    </div>
  )
}

