const categories = [
  'Elektronik', 'Fashion', 'Rumah & Dapur', 'Ibu & Anak', 'Olahraga',
  'Hobi & Gaya Hidup', 'Makanan & Minuman', 'Produk Lokal', 'Promo',
]

const allCategories = [
  ...categories.filter((category) => category !== 'Promo'),
  'Handphone & Tablet',
  'Komputer & Laptop',
  'Aksesori Gadget',
  'Kamera & Fotografi',
  'Audio & Musik',
  'Gaming & Konsol',
  'Fashion Pria',
  'Fashion Wanita',
  'Fashion Anak',
  'Fashion Muslim',
  'Sepatu & Sandal',
  'Tas & Dompet',
  'Jam Tangan & Perhiasan',
  'Kecantikan & Perawatan Diri',
  'Kesehatan',
  'Perlengkapan Bayi',
  'Mainan Anak',
  'Peralatan Dapur',
  'Peralatan Rumah Tangga',
  'Furnitur & Dekorasi',
  'Kebersihan Rumah',
  'Pertukangan & Perkakas',
  'Taman & Tanaman',
  'Otomotif',
  'Sepeda & Aksesori',
  'Outdoor & Camping',
  'Buku & Alat Tulis',
  'Perlengkapan Kantor',
  'Kerajinan & Koleksi',
  'Perlengkapan Hewan Peliharaan',
  'Sembako & Bahan Masakan',
  'Makanan Ringan',
  'Kopi & Teh',
  'Produk Digital',
  'Promo',
]

interface CategoryNavbarProps {
  location?: string
  onCategorySelect?: (category: string) => void
}

export default function CategoryNavbar({ location = 'Pontianak', onCategorySelect }: CategoryNavbarProps) {
  const categoryStyle = (category: string) => category === 'Promo'
    ? 'font-semibold text-rose-600 hover:text-rose-700'
    : 'text-slate-600 hover:text-emerald-600'

  return (
    <nav aria-label="Kategori produk" className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 px-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <details className="relative shrink-0">
          <summary className="flex cursor-pointer list-none items-center gap-2 py-4 text-sm font-semibold text-slate-700 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-600 [&::-webkit-details-marker]:hidden">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Semua Kategori
          </summary>
          <ul className="absolute left-0 top-full z-40 grid max-h-[65vh] w-[calc(100vw-2rem)] max-w-2xl grid-cols-1 gap-1 overflow-y-auto overscroll-contain rounded-xl border border-gray-100 bg-white p-2 shadow-lg sm:w-[36rem] sm:grid-cols-2 lg:w-[42rem] lg:grid-cols-3">
            {allCategories.map((category) => (
              <li key={category}>
                <button type="button" onClick={(event) => {
                  event.currentTarget.closest('details')?.removeAttribute('open')
                  onCategorySelect?.(category)
                }} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-600 ${categoryStyle(category)}`}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </details>

        <div className="order-last flex w-full min-w-0 items-center gap-5 overflow-x-auto border-t border-gray-100 lg:order-none lg:w-auto lg:flex-1 lg:border-t-0 lg:border-l lg:pl-4">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => onCategorySelect?.(category)}
              className={`type-nav-category shrink-0 whitespace-nowrap py-4 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600 ${categoryStyle(category)}`}>
              {category}
            </button>
          ))}
        </div>
        {/* Nanti implement lokasi tracker beneran */}
        <div className="ml-auto flex shrink-0 items-center gap-2 py-3 text-xs text-slate-500 lg:border-l lg:border-gray-100 lg:pl-4">
          <svg aria-hidden="true" className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1116 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>Kirim ke <strong className="font-semibold text-slate-700">{location}</strong></span>
        </div>
      </div>
    </nav>
  )
}
