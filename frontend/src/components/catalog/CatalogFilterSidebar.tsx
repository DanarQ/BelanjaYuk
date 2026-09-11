import { useState } from 'react'
import type { CatalogFilterState } from './types'
import type { Product } from '../../data/recommendations'

interface CatalogFilterSidebarProps {
  filters: CatalogFilterState
  products: Product[]
  allProducts: Product[]
  onFilterChange: (newFilters: Partial<CatalogFilterState>) => void
  onResetFilters: () => void
  isMobile?: boolean
  onApplyMobile?: () => void
}

const PRESET_PRICES = [
  { label: '< Rp50rb', min: null, max: 50000 },
  { label: 'Rp50rb - Rp150rb', min: 50000, max: 150000 },
  { label: '> Rp150rb', min: 150000, max: null },
]

export default function CatalogFilterSidebar({
  filters,
  allProducts,
  onFilterChange,
  onResetFilters,
  isMobile = false,
  onApplyMobile,
}: CatalogFilterSidebarProps) {
  // Expandable section states
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllLocations, setShowAllLocations] = useState(false)

  // Extract unique categories with product counts
  const categoryCounts = allProducts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})
  const availableCategories = Object.keys(categoryCounts)
  const visibleCategories = showAllCategories
    ? availableCategories
    : availableCategories.slice(0, 5)

  // Extract unique locations with product counts
  const locationCounts = allProducts.reduce<Record<string, number>>((acc, p) => {
    acc[p.city] = (acc[p.city] || 0) + 1
    return acc
  }, {})
  const availableLocations = Object.keys(locationCounts)
  const visibleLocations = showAllLocations
    ? availableLocations
    : availableLocations.slice(0, 5)

  // Check if any filter is currently active
  const hasActiveFilters = Boolean(
    filters.category ||
    filters.locations.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minRating !== null ||
    filters.freeShipping ||
    filters.isCod ||
    filters.discountOnly
  )



  const toggleLocation = (city: string) => {
    const next = filters.locations.includes(city)
      ? filters.locations.filter((item) => item !== city)
      : [...filters.locations, city]
    onFilterChange({ locations: next })
  }

  return (
    <aside
      aria-label="Filter katalog produk"
      className={`${
        isMobile ? 'p-4' : 'sticky top-24 rounded-lg border border-gray-200 bg-white p-4 shadow-xs'
      }`}
    >
      {/* Header (Desktop only, drawer has its own header) */}
      {!isMobile && (
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm tracking-wide uppercase">
            <svg aria-hidden="true" className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.41A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <span>Filter</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Hapus Semua
            </button>
          )}
        </div>
      )}

      <div className="space-y-5 divide-y divide-gray-100 text-sm">
        {/* 1. Kategori */}
        <div className="pt-4">
          <h4 className="font-semibold text-slate-900 mb-2.5 flex items-center justify-between text-xs tracking-wider uppercase">
            <span>Kategori</span>
          </h4>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => onFilterChange({ category: '' })}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                  !filters.category
                    ? 'bg-emerald-50 font-bold text-emerald-700'
                    : 'text-slate-600 hover:bg-gray-50'
                }`}
              >
                <span>Semua Kategori</span>
                <span className="text-[11px] text-slate-400">({allProducts.length})</span>
              </button>
            </li>
            {visibleCategories.map((cat) => {
              const isSelected = filters.category === cat
              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onFilterChange({ category: isSelected ? '' : cat })}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 font-bold text-emerald-700'
                        : 'text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate text-left">{cat}</span>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-1">
                      ({categoryCounts[cat] || 0})
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {availableCategories.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{showAllCategories ? 'Tampilkan Lebih Sedikit' : 'Lihat Lainnya'}</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform ${showAllCategories ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          )}
        </div>

        {/* 2. Lokasi */}
        <div className="pt-4">
          <h4 className="font-semibold text-slate-900 mb-2.5 text-xs tracking-wider uppercase">
            Lokasi
          </h4>
          <div className="space-y-1.5">
            {visibleLocations.map((city) => {
              const isChecked = filters.locations.includes(city)
              return (
                <label
                  key={city}
                  className="flex items-center justify-between px-1 py-1 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleLocation(city)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className={`text-xs truncate ${isChecked ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                      {city}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">({locationCounts[city] || 0})</span>
                </label>
              )
            })}
          </div>
          {availableLocations.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllLocations((prev) => !prev)}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{showAllLocations ? 'Tampilkan Lebih Sedikit' : 'Lihat Lainnya'}</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform ${showAllLocations ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          )}
        </div>

        {/* 3. Batas Harga (Shopee Style: Min / Max inputs + Quick presets + Terapkan) */}
        <PriceRangeFilter
          key={`${filters.minPrice ?? ''}-${filters.maxPrice ?? ''}`}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onApply={(min, max) => onFilterChange({ minPrice: min, maxPrice: max })}
          onPreset={(min, max) => onFilterChange({ minPrice: min, maxPrice: max })}
        />

        {/* 4. Penilaian / Rating */}
        <div className="pt-4">
          <h4 className="font-semibold text-slate-900 mb-2.5 text-xs tracking-wider uppercase">
            Penilaian
          </h4>
          <div className="space-y-1">
            {[5, 4, 3].map((star) => {
              const isSelected = filters.minRating === star
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => onFilterChange({ minRating: isSelected ? null : star })}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 font-bold text-emerald-700 border border-emerald-200'
                      : 'hover:bg-gray-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 ${
                            i < star
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" />
                        </svg>
                      ))}
                    </div>
                    {star < 5 ? (
                      <span className="text-[11px] text-slate-600">ke atas</span>
                    ) : null}
                  </div>
                  {isSelected && (
                    <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 5. Layanan & Penawaran */}
        <div className="pt-4">
          <h4 className="font-semibold text-slate-900 mb-2.5 text-xs tracking-wider uppercase">
            Layanan & Promo
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 px-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.freeShipping}
                onChange={(e) => onFilterChange({ freeShipping: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 flex items-center gap-1.5">
                <span className="rounded bg-emerald-100 text-emerald-800 font-semibold px-1 py-0.2 text-[10px]">
                  FREE
                </span>
                Gratis Ongkir
              </span>
            </label>

            <label className="flex items-center gap-2.5 px-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isCod}
                onChange={(e) => onFilterChange({ isCod: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 flex items-center gap-1.5">
                <span className="rounded bg-amber-100 text-amber-800 font-semibold px-1 py-0.2 text-[10px]">
                  COD
                </span>
                Bayar di Tempat
              </span>
            </label>

            <label className="flex items-center gap-2.5 px-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.discountOnly}
                onChange={(e) => onFilterChange({ discountOnly: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 flex items-center gap-1.5">
                <span className="rounded bg-rose-100 text-rose-800 font-semibold px-1 py-0.2 text-[10px]">
                  %
                </span>
                Sedang Diskon
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Bottom Action */}
      {isMobile && onApplyMobile && (
        <div className="sticky bottom-0 mt-6 pt-3 pb-1 border-t border-gray-200 bg-white flex gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex-1 rounded border border-gray-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors"
          >
            Hapus Semua
          </button>
          <button
            type="button"
            onClick={onApplyMobile}
            className="flex-1 rounded bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-xs transition-colors"
          >
            Terapkan Filter
          </button>
        </div>
      )}
    </aside>
  )
}

function PriceRangeFilter({
  minPrice,
  maxPrice,
  onApply,
  onPreset,
}: {
  minPrice: number | null
  maxPrice: number | null
  onApply: (min: number | null, max: number | null) => void
  onPreset: (min: number | null, max: number | null) => void
}) {
  const [localMinPrice, setLocalMinPrice] = useState<string>(
    minPrice !== null ? minPrice.toString() : ''
  )
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(
    maxPrice !== null ? maxPrice.toString() : ''
  )
  const [priceError, setPriceError] = useState<string>('')

  const handleApplyPrice = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const min = localMinPrice ? parseInt(localMinPrice, 10) : null
    const max = localMaxPrice ? parseInt(localMaxPrice, 10) : null

    if (min !== null && isNaN(min)) return
    if (max !== null && isNaN(max)) return

    if (min !== null && max !== null && min > max) {
      setPriceError('Harga min tidak boleh lebih besar dari maks')
      return
    }

    setPriceError('')
    onApply(min, max)
  }

  const handleApplyPreset = (min: number | null, max: number | null) => {
    setLocalMinPrice(min !== null ? min.toString() : '')
    setLocalMaxPrice(max !== null ? max.toString() : '')
    setPriceError('')
    onPreset(min, max)
  }

  return (
    <div className="pt-4">
      <h4 className="font-semibold text-slate-900 mb-2 text-xs tracking-wider uppercase">
        Batas Harga
      </h4>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {PRESET_PRICES.map((preset) => {
          const isActive = minPrice === preset.min && maxPrice === preset.max
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleApplyPreset(preset.min, preset.max)}
              className={`rounded-full px-2 py-0.5 text-[11px] border transition-colors cursor-pointer ${
                isActive
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-semibold'
                  : 'border-gray-200 text-slate-600 hover:border-emerald-300 bg-white'
              }`}
            >
              {preset.label}
            </button>
          )
        })}
      </div>

      {/* Custom Price Form */}
      <form onSubmit={handleApplyPrice} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <span className="absolute left-2 top-2 text-[11px] text-slate-400 font-medium">Rp</span>
            <input
              type="number"
              min="0"
              placeholder="MIN"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              className="w-full rounded border border-gray-300 py-1.5 pl-7 pr-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <span className="text-slate-400 text-xs font-bold">—</span>
          <div className="relative flex-1">
            <span className="absolute left-2 top-2 text-[11px] text-slate-400 font-medium">Rp</span>
            <input
              type="number"
              min="0"
              placeholder="MAKS"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              className="w-full rounded border border-gray-300 py-1.5 pl-7 pr-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {priceError && (
          <p className="text-[11px] text-rose-600 font-medium">{priceError}</p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-emerald-600 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-xs cursor-pointer uppercase tracking-wider"
        >
          Terapkan
        </button>
      </form>
    </div>
  )
}

