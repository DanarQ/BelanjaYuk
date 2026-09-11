import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { recommendations } from '../data/recommendations'
import CatalogFilterSidebar from '../components/catalog/CatalogFilterSidebar'
import CatalogMobileFilterDrawer from '../components/catalog/CatalogMobileFilterDrawer'
import CatalogSortBar from '../components/catalog/CatalogSortBar'
import CatalogProductCard from '../components/catalog/CatalogProductCard'
import type { CatalogFilterState, SortOption } from '../components/catalog/types'

export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Parse filters from URL search parameters
  const currentFilters: CatalogFilterState = useMemo(() => {
    const rawLocations = params.get('lokasi')
    const locations = rawLocations ? rawLocations.split(',').filter(Boolean) : []
    const minPriceRaw = params.get('minPrice')
    const maxPriceRaw = params.get('maxPrice')
    const ratingRaw = params.get('rating')
    const sortRaw = params.get('sort') as SortOption | null

    return {
      query: params.get('q') || '',
      category: params.get('kategori') || '',
      locations,
      minPrice: minPriceRaw ? parseInt(minPriceRaw, 10) : null,
      maxPrice: maxPriceRaw ? parseInt(maxPriceRaw, 10) : null,
      minRating: ratingRaw ? parseInt(ratingRaw, 10) : null,
      freeShipping: params.get('ongkir') === '1',
      isCod: params.get('cod') === '1',
      discountOnly: params.get('diskon') === '1',
      sort: sortRaw || 'relevance',
    }
  }, [params])

  // Update URL params when filters change
  const handleFilterChange = (updates: Partial<CatalogFilterState>) => {
    const nextFilters = { ...currentFilters, ...updates }
    const nextParams = new URLSearchParams()

    if (nextFilters.query) nextParams.set('q', nextFilters.query)
    if (nextFilters.category) nextParams.set('kategori', nextFilters.category)
    if (nextFilters.locations.length > 0) {
      nextParams.set('lokasi', nextFilters.locations.join(','))
    }
    if (nextFilters.minPrice !== null && !isNaN(nextFilters.minPrice)) {
      nextParams.set('minPrice', nextFilters.minPrice.toString())
    }
    if (nextFilters.maxPrice !== null && !isNaN(nextFilters.maxPrice)) {
      nextParams.set('maxPrice', nextFilters.maxPrice.toString())
    }
    if (nextFilters.minRating !== null) {
      nextParams.set('rating', nextFilters.minRating.toString())
    }
    if (nextFilters.freeShipping) nextParams.set('ongkir', '1')
    if (nextFilters.isCod) nextParams.set('cod', '1')
    if (nextFilters.discountOnly) nextParams.set('diskon', '1')
    if (nextFilters.sort && nextFilters.sort !== 'relevance') {
      nextParams.set('sort', nextFilters.sort)
    }

    setParams(nextParams, { replace: true })
  }

  // Reset all filters except the active search query
  const handleResetFilters = () => {
    const nextParams = new URLSearchParams()
    if (currentFilters.query) {
      nextParams.set('q', currentFilters.query)
    }
    setParams(nextParams, { replace: true })
  }

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return recommendations
      .filter((product) => {
        // Query match
        if (currentFilters.query) {
          const matchName = product.name
            .toLocaleLowerCase('id-ID')
            .includes(currentFilters.query.toLocaleLowerCase('id-ID'))
          if (!matchName) return false
        }

        // Category match
        if (currentFilters.category && product.category !== currentFilters.category) {
          return false
        }

        // Location match
        if (
          currentFilters.locations.length > 0 &&
          !currentFilters.locations.includes(product.city)
        ) {
          return false
        }

        // Price range match
        if (currentFilters.minPrice !== null && product.price < currentFilters.minPrice) {
          return false
        }
        if (currentFilters.maxPrice !== null && product.price > currentFilters.maxPrice) {
          return false
        }

        // Rating match
        if (currentFilters.minRating !== null && product.rating < currentFilters.minRating) {
          return false
        }

        // Shipping and promo match
        if (currentFilters.freeShipping && !product.freeShipping) {
          return false
        }
        if (currentFilters.isCod && !product.isCod) {
          return false
        }
        if (currentFilters.discountOnly && product.originalPrice <= product.price) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (currentFilters.sort) {
          case 'latest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case 'top_sales':
            return b.sold - a.sold
          case 'price_asc':
            return a.price - b.price
          case 'price_desc':
            return b.price - a.price
          case 'relevance':
          default:
            return 0
        }
      })
  }, [currentFilters])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb / Search Title */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <nav aria-label="Breadcrumb" className="mb-1 text-xs text-slate-500">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link to="/" className="hover:text-emerald-700 transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>/</li>
                <li className="font-semibold text-slate-800">
                  {currentFilters.category || 'Katalog Produk'}
                </li>
              </ol>
            </nav>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentFilters.query
                ? `Hasil pencarian “${currentFilters.query}”`
                : currentFilters.category
                ? `Kategori: ${currentFilters.category}`
                : 'Semua Produk'}
            </h1>
          </div>

          <p role="status" className="text-xs text-slate-500">
            {filteredProducts.length} produk ditemukan
          </p>
        </div>

        {/* 2-Column Catalog Layout */}
        <div className="flex items-start gap-6">
          {/* Left Sidebar (Desktop Only) */}
          <div className="hidden lg:block w-64 xl:w-72 shrink-0">
            <CatalogFilterSidebar
              filters={currentFilters}
              products={filteredProducts}
              allProducts={recommendations}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Right Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Top Toolbar (Sorting, Active Chips, Mobile Filter Button) */}
            <CatalogSortBar
              totalResults={filteredProducts.length}
              filters={currentFilters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
            />

            {/* Product Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <li key={product.id} className="min-w-0">
                    <CatalogProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="my-8 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3">
                  <svg
                    aria-hidden="true"
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-800">
                  Tidak ada produk yang sesuai
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Coba ubah kata kunci pencarian, sesuaikan rentang harga, atau hapus beberapa filter yang aktif.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Hapus Semua Filter
                  </button>
                  <Link
                    to="/produk"
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors"
                  >
                    Lihat Semua Produk
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Slide-over Drawer */}
      <CatalogMobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={currentFilters}
        products={filteredProducts}
        allProducts={recommendations}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
    </div>
  )
}

