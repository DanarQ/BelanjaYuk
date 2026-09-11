import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { recommendations } from '../data/recommendations'
import StatusPage from './StatusPage'
import ProductGallery from '../components/product/ProductGallery'
import ProductPriceBox from '../components/product/ProductPriceBox'
import ProductPurchaseOptions from '../components/product/ProductPurchaseOptions'
import ProductSellerCard from '../components/product/ProductSellerCard'
import ProductDetails from '../components/product/ProductDetails'
import ProductReviews from '../components/product/ProductReviews'
import ProductStickyBottomBar from '../components/product/ProductStickyBottomBar'
import CartSuccessModal from '../components/product/CartSuccessModal'
import CatalogProductCard from '../components/catalog/CatalogProductCard'
import { getProductDetails } from '../components/product/productTypes'
import type { ProductVariant } from '../components/product/productTypes'

const numberFormat = new Intl.NumberFormat('id-ID')

export default function ProductPage() {
  const { productId } = useParams()
  const product = recommendations.find((item) => item.id === productId)

  // State for modals
  const [cartModalState, setCartModalState] = useState<{
    isOpen: boolean
    variant: ProductVariant
    quantity: number
    isBuyNow: boolean
  }>({
    isOpen: false,
    variant: { id: 'default', name: 'Standar' },
    quantity: 1,
    isBuyNow: false,
  })

  const [chatFeedback, setChatFeedback] = useState(false)

  // Memoized rich product details
  const details = useMemo(() => {
    if (!product) return null
    return getProductDetails(product)
  }, [product])

  // Related products from same category or recommendations
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return recommendations
      .filter((item) => item.id !== product.id)
      .slice(0, 4)
  }, [product])

  if (!product || !details) {
    return (
      <StatusPage
        title="Produk tidak ditemukan"
        description="Produk yang kamu cari tidak tersedia atau sudah dihapus."
      />
    )
  }

  const handleAddToCart = (quantity: number, variant: ProductVariant) => {
    setCartModalState({
      isOpen: true,
      variant,
      quantity,
      isBuyNow: false,
    })
  }

  const handleBuyNow = (quantity: number, variant: ProductVariant) => {
    setCartModalState({
      isOpen: true,
      variant,
      quantity,
      isBuyNow: true,
    })
  }

  const handleChatSeller = () => {
    setChatFeedback(true)
    setTimeout(() => setChatFeedback(false), 3000)
  }

  const formatSold = (sold: number): string => {
    if (sold >= 1000) {
      const formatted = (sold / 1000).toFixed(1).replace('.0', '')
      return `${formatted}rb+`
    }
    return sold.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50/60 pb-20 sm:pb-16">
      {/* Toast Alert for Chat action */}
      {chatFeedback && (
        <div className="fixed top-20 right-4 z-50 rounded-lg bg-slate-900 px-4 py-2.5 text-xs text-white shadow-xl animate-in fade-in flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          <span>Fitur chat dengan penjual sedang disiapkan.</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-emerald-700 transition-colors">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to={`/produk?kategori=${encodeURIComponent(product.category)}`}
                className="hover:text-emerald-700 transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-800 line-clamp-1 max-w-xs sm:max-w-md">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* 1. Main Product Card (Gallery + Purchasing info) */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery (Left: 5 cols) */}
            <div className="md:col-span-5">
              <ProductGallery product={product} images={details.galleryImages} />
            </div>

            {/* Purchasing Info (Right: 7 cols) */}
            <div className="md:col-span-7 flex flex-col space-y-4">
              {/* Badge & Title */}
              <div>
                <span className="inline-block rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 mb-1.5">
                  PILIHAN BELANJAYUK
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Rating & Sold bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-900 border-b border-slate-900 pb-0.5">
                    {product.rating.toFixed(1)}
                  </span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <span className="text-slate-300">|</span>

                <div>
                  <span className="font-bold text-slate-900 border-b border-slate-900 pb-0.5">
                    {numberFormat.format(details.reviews.length * 40)}
                  </span>{' '}
                  <span className="text-slate-500">Penilaian</span>
                </div>

                <span className="text-slate-300">|</span>

                <div>
                  <span className="font-bold text-slate-900">
                    {formatSold(product.sold)}
                  </span>{' '}
                  <span className="text-slate-500">Terjual</span>
                </div>
              </div>

              {/* Price Highlight Container */}
              <ProductPriceBox product={product} />

              {/* Purchase Options (Shipping, Variant, Quantity, Action CTA) */}
              <ProductPurchaseOptions
                product={product}
                variants={details.variants}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>
        </div>

        {/* 2. Seller Profile Card */}
        <ProductSellerCard seller={details.seller} onChat={handleChatSeller} />

        {/* 3. Specifications & Description */}
        <ProductDetails
          specifications={details.specifications}
          description={details.description}
          highlights={details.highlights}
          packageContents={details.packageContents}
        />

        {/* 4. Customer Reviews Section */}
        <ProductReviews
          rating={product.rating}
          totalReviews={details.reviews.length * 40}
          ratingCounts={details.ratingCounts}
          reviews={details.reviews}
        />

        {/* 5. Rekomendasi Produk Terkait */}
        {relatedProducts.length > 0 && (
          <section aria-labelledby="related-products-heading" className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 id="related-products-heading" className="text-base sm:text-lg font-bold text-slate-900">
                Produk Lainnya yang Mungkin Kamu Suka
              </h2>
              <Link
                to={`/produk?kategori=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Lihat Semua Kategori →
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <li key={item.id} className="min-w-0">
                  <CatalogProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <ProductStickyBottomBar
        product={product}
        onAddToCart={() => handleAddToCart(1, details.variants[0] || { id: 'default', name: 'Standar' })}
        onBuyNow={() => handleBuyNow(1, details.variants[0] || { id: 'default', name: 'Standar' })}
        onChat={handleChatSeller}
      />

      {/* Cart & Purchase Success Feedback Modal */}
      <CartSuccessModal
        isOpen={cartModalState.isOpen}
        onClose={() => setCartModalState((prev) => ({ ...prev, isOpen: false }))}
        product={product}
        variant={cartModalState.variant}
        quantity={cartModalState.quantity}
        isBuyNow={cartModalState.isBuyNow}
      />
    </div>
  )
}

