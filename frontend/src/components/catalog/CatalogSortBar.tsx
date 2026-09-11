import type { CatalogFilterState, SortOption } from './types'

interface CatalogSortBarProps {
  totalResults: number
  filters: CatalogFilterState
  onFilterChange: (newFilters: Partial<CatalogFilterState>) => void
  onResetFilters: () => void
  onOpenMobileFilter: () => void
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export default function CatalogSortBar({
  totalResults,
  filters,
  onFilterChange,
  onResetFilters,
  onOpenMobileFilter,
}: CatalogSortBarProps) {
  // Count active filters (excluding query and sort)
  let activeFilterCount = 0
  if (filters.category) activeFilterCount++
  if (filters.locations.length > 0) activeFilterCount += filters.locations.length
  if (filters.minPrice !== null || filters.maxPrice !== null) activeFilterCount++
  if (filters.minRating !== null) activeFilterCount++
  if (filters.freeShipping) activeFilterCount++
  if (filters.isCod) activeFilterCount++
  if (filters.discountOnly) activeFilterCount++

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'relevance', label: 'Terkait' },
    { id: 'latest', label: 'Terbaru' },
    { id: 'top_sales', label: 'Terlaris' },
  ]

  const isPriceSort = filters.sort === 'price_asc' || filters.sort === 'price_desc'

  return (
    <div className="space-y-3 mb-4">
      {/* Main Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-xs">
        {/* Mobile Filter Trigger Button */}
        <div className="flex items-center gap-2 lg:hidden w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={onOpenMobileFilter}
            className="flex items-center gap-2 rounded-md border border-emerald-600 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.41A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs text-slate-500 sm:hidden">
            <strong>{totalResults}</strong> produk
          </span>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-1 flex-wrap items-center gap-2 text-xs">
          <span className="hidden lg:inline-block font-medium text-slate-500 mr-1">
            Urutkan:
          </span>

          {/* Shopee-style sort tabs on desktop */}
          <div className="hidden sm:flex items-center gap-1.5">
            {sortOptions.map((opt) => {
              const active = filters.sort === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onFilterChange({ sort: opt.id })}
                  className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Price Sort Dropdown / Selector */}
          <div className="relative">
            <select
              aria-label="Urutkan berdasarkan harga"
              value={isPriceSort ? filters.sort : ''}
              onChange={(e) => {
                if (e.target.value) {
                  onFilterChange({ sort: e.target.value as SortOption })
                }
              }}
              className={`rounded border px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors outline-none ${
                isPriceSort
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-semibold'
                  : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300'
              }`}
            >
              <option value="" disabled={!isPriceSort}>
                Harga {isPriceSort ? (filters.sort === 'price_asc' ? '(Termurah)' : '(Termahal)') : ''}
              </option>
              <option value="price_asc">Harga: Rendah ke Tinggi</option>
              <option value="price_desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>

          {/* Mobile Sort Dropdown for all sort options */}
          <div className="sm:hidden ml-auto">
            <select
              aria-label="Urutkan produk"
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value as SortOption })}
              className="rounded border border-gray-200 bg-white px-2 py-1.5 text-xs text-slate-700"
            >
              <option value="relevance">Terkait</option>
              <option value="latest">Terbaru</option>
              <option value="top_sales">Terlaris</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Results Counter (Desktop/Tablet) */}
        <div className="hidden sm:block text-xs text-slate-500">
          Menampilkan <strong className="font-semibold text-slate-800">{totalResults}</strong> produk
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-400 mr-1">Filter Aktif:</span>

          {/* Category Chip */}
          {filters.category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs text-emerald-800 font-medium">
              <span>{filters.category}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ category: '' })}
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title="Hapus kategori ini"
              >
                ✕
              </button>
            </span>
          )}

          {/* Locations Chips */}
          {filters.locations.map((city) => (
            <span
              key={city}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-700 font-medium"
            >
              <span>{city}</span>
              <button
                type="button"
                onClick={() =>
                  onFilterChange({
                    locations: filters.locations.filter((item) => item !== city),
                  })
                }
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title={`Hapus filter kota ${city}`}
              >
                ✕
              </button>
            </span>
          ))}

          {/* Price Range Chip */}
          {(filters.minPrice !== null || filters.maxPrice !== null) && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-700 font-medium">
              <span>
                {filters.minPrice !== null && filters.maxPrice !== null
                  ? `${rupiah.format(filters.minPrice)} - ${rupiah.format(filters.maxPrice)}`
                  : filters.minPrice !== null
                  ? `>= ${rupiah.format(filters.minPrice)}`
                  : `<= ${rupiah.format(filters.maxPrice!)}`}
              </span>
              <button
                type="button"
                onClick={() => onFilterChange({ minPrice: null, maxPrice: null })}
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title="Hapus filter rentang harga"
              >
                ✕
              </button>
            </span>
          )}

          {/* Rating Chip */}
          {filters.minRating !== null && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs text-amber-800 font-medium">
              <span>{filters.minRating}★ ke atas</span>
              <button
                type="button"
                onClick={() => onFilterChange({ minRating: null })}
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title="Hapus filter rating"
              >
                ✕
              </button>
            </span>
          )}

          {/* Shipping Chip */}
          {filters.freeShipping && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs text-emerald-800 font-medium">
              <span>Gratis Ongkir</span>
              <button
                type="button"
                onClick={() => onFilterChange({ freeShipping: false })}
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title="Hapus filter gratis ongkir"
              >
                ✕
              </button>
            </span>
          )}

          {/* COD Chip */}
          {filters.isCod && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs text-amber-800 font-medium">
              <span>COD</span>
              <button
                type="button"
                onClick={() => onFilterChange({ isCod: false })}
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title="Hapus filter COD"
              >
                ✕
              </button>
            </span>
          )}

          {/* Discount Chip */}
          {filters.discountOnly && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1 text-xs text-rose-800 font-medium">
              <span>Diskon</span>
              <button
                type="button"
                onClick={() => onFilterChange({ discountOnly: false })}
                className="hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                title="Hapus filter diskon"
              >
                ✕
              </button>
            </span>
          )}

          {/* Reset All Button */}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-0.5 transition-colors cursor-pointer"
          >
            Hapus Semua
          </button>
        </div>
      )}
    </div>
  )
}

