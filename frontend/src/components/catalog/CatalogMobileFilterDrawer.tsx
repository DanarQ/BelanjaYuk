import { useEffect } from 'react'
import CatalogFilterSidebar from './CatalogFilterSidebar'
import type { CatalogFilterState } from './types'
import type { Product } from '../../data/recommendations'

interface CatalogMobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: CatalogFilterState
  products: Product[]
  allProducts: Product[]
  onFilterChange: (newFilters: Partial<CatalogFilterState>) => void
  onResetFilters: () => void
}

export default function CatalogMobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  products,
  allProducts,
  onFilterChange,
  onResetFilters,
}: CatalogMobileFilterDrawerProps) {
  // Lock body scroll and listen for Escape key when open
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filter-title"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-10 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.41A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <div>
              <h2 id="mobile-filter-title" className="text-sm font-bold text-slate-800">
                Filter Produk
              </h2>
              <p className="text-[11px] text-slate-500">{products.length} produk sesuai</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup filter"
            className="rounded-full p-1.5 text-slate-400 hover:bg-gray-100 hover:text-slate-600 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <CatalogFilterSidebar
            filters={filters}
            products={products}
            allProducts={allProducts}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            isMobile={true}
            onApplyMobile={onClose}
          />
        </div>
      </div>
    </div>
  )
}

