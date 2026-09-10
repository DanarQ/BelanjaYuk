import { useState, useSyncExternalStore } from 'react'
import { allCategories } from '../../data/categories'

const imageGroups: [string, string[]][] = [
  ['/categories/elektronik.jpg', ['Elektronik', 'Handphone & Tablet', 'Komputer & Laptop', 'Aksesori Gadget', 'Audio & Musik', 'Gaming & Konsol', 'Produk Digital']],
  ['/categories/fashion.jpg', ['Fashion', 'Fashion Pria', 'Fashion Wanita', 'Fashion Anak', 'Fashion Muslim', 'Sepatu & Sandal', 'Tas & Dompet', 'Jam Tangan & Perhiasan', 'Kecantikan & Perawatan Diri']],
  ['/categories/rumah-dapur.jpg', ['Rumah & Dapur', 'Peralatan Dapur', 'Peralatan Rumah Tangga', 'Furnitur & Dekorasi', 'Kebersihan Rumah', 'Pertukangan & Perkakas', 'Taman & Tanaman']],
  ['/categories/ibu-anak.jpg', ['Ibu & Anak', 'Perlengkapan Bayi', 'Mainan Anak']],
  ['/categories/olahraga.jpg', ['Olahraga', 'Kesehatan', 'Otomotif', 'Sepeda & Aksesori', 'Outdoor & Camping']],
  ['/categories/hobi.jpg', ['Hobi & Gaya Hidup', 'Kamera & Fotografi', 'Buku & Alat Tulis', 'Perlengkapan Kantor', 'Kerajinan & Koleksi', 'Perlengkapan Hewan Peliharaan']],
  ['/categories/makanan.jpg', ['Makanan & Minuman', 'Sembako & Bahan Masakan', 'Makanan Ringan', 'Kopi & Teh']],
  ['/FrontHeroTas.png', ['Produk Lokal']],
  ['/FrontHeroTruck.png', ['Promo']],
]
const categoryImages = Object.fromEntries(
  imageGroups.flatMap(([image, names]) => names.map((name) => [name, image])),
)

function subscribeToLayout(onChange: () => void) {
  const queries = [window.matchMedia('(min-width: 640px)'), window.matchMedia('(min-width: 1024px)')]
  queries.forEach((query) => query.addEventListener('change', onChange))
  return () => queries.forEach((query) => query.removeEventListener('change', onChange))
}

function getPageSize() {
  return window.matchMedia('(min-width: 1024px)').matches ? 20
    : window.matchMedia('(min-width: 640px)').matches ? 10 : 6
}

interface CategorySectionProps {
  onCategorySelect?: (category: string) => void
}

export default function CategorySection({ onCategorySelect }: CategorySectionProps) {
  const pageSize = useSyncExternalStore(subscribeToLayout, getPageSize, () => 6)
  const [firstIndex, setFirstIndex] = useState(0)
  const page = Math.floor(firstIndex / pageSize)
  const pageCount = Math.ceil(allCategories.length / pageSize)
  const pages = Array.from({ length: pageCount }, (_, index) =>
    allCategories.slice(index * pageSize, (index + 1) * pageSize),
  )

  return (
    <section aria-labelledby="category-heading" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="bg-white">
        <div className="flex min-h-14 items-center justify-between gap-3 px-5">
          <h2 id="category-heading" className="text-sm font-medium uppercase tracking-wide text-slate-500 sm:text-base">Semua Kategori</h2>
          <span aria-live="polite" aria-atomic="true" className="text-xs text-slate-400">
            <span className="sr-only">Halaman kategori </span>{page + 1} / {pageCount}
          </span>
        </div>
        <div className="relative">
          <div id="category-grid" className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${page * 100}%)` }}>
              {pages.map((visibleCategories, pageIndex) => (
          <ul key={`${pageSize}-${pageIndex}`} inert={pageIndex !== page} aria-hidden={pageIndex !== page}
            className="grid w-full shrink-0 grid-cols-3 grid-rows-2 border-l border-t border-gray-100 sm:grid-cols-5 lg:grid-cols-10">
            {visibleCategories.map((category) => (
              <li key={category} className="min-w-0 border-b border-r border-gray-100">
                <button type="button" onClick={() => onCategorySelect?.(category)}
                  className="relative flex h-36 w-full cursor-pointer flex-col items-center px-2 pb-3 pt-4 transition-shadow hover:z-10 hover:shadow-[0_0_8px_rgba(0,0,0,0.12)] focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600 sm:h-40">
                  <img src={categoryImages[category]} alt="" width={80} height={80} loading="lazy"
                    className={`h-16 w-16 shrink-0 rounded-full bg-gray-50 object-cover sm:h-20 sm:w-20 ${category === 'Produk Lokal' || category === 'Promo' ? 'object-right' : 'object-center'}`} />
                  <span className={`mt-3 text-center text-xs font-normal leading-snug sm:text-[13px] ${category === 'Promo' ? 'text-orange-600' : 'text-slate-800'}`}>
                    {category}
                  </span>
                </button>
              </li>
            ))}
            {Array.from({ length: pageSize - visibleCategories.length }, (_, index) => (
              <li key={`empty-${index}`} aria-hidden="true" className="h-36 border-b border-r border-gray-100 sm:h-40" />
            ))}
          </ul>
              ))}
            </div>
          </div>
          <button type="button" aria-label="Kategori sebelumnya" aria-controls="category-grid" disabled={page === 0}
            onClick={() => setFirstIndex((page - 1) * pageSize)}
            className="absolute -left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-slate-600 shadow-[0_1px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:invisible">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 6-6 6 6 6" /></svg>
          </button>
          <button type="button" aria-label="Kategori berikutnya" aria-controls="category-grid" disabled={page === pageCount - 1}
            onClick={() => setFirstIndex((page + 1) * pageSize)}
            className="absolute -right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-slate-600 shadow-[0_1px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:invisible">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
