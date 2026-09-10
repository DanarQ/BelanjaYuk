import { Link } from 'react-router'
const categoryGroups = [
  { title: 'Elektronik', items: ['Handphone & Tablet', 'Komputer & Laptop', 'Aksesori Gadget', 'Audio & Musik', 'Gaming & Konsol'] },
  { title: 'Fashion', items: ['Fashion Pria', 'Fashion Wanita', 'Fashion Muslim', 'Sepatu & Sandal', 'Tas & Dompet'] },
  { title: 'Rumah & Dapur', items: ['Peralatan Dapur', 'Peralatan Rumah Tangga', 'Furnitur & Dekorasi', 'Kebersihan Rumah', 'Taman & Tanaman'] },
  { title: 'Ibu & Anak', items: ['Perlengkapan Bayi', 'Mainan Anak', 'Fashion Anak', 'Kesehatan'] },
  { title: 'Hobi & Gaya Hidup', items: ['Kamera & Fotografi', 'Buku & Alat Tulis', 'Kerajinan & Koleksi', 'Perlengkapan Hewan Peliharaan'] },
  { title: 'Olahraga & Outdoor', items: ['Olahraga', 'Sepeda & Aksesori', 'Outdoor & Camping', 'Otomotif'] },
  { title: 'Makanan & Minuman', items: ['Sembako & Bahan Masakan', 'Makanan Ringan', 'Kopi & Teh'] },
  { title: 'Pilihan Lainnya', items: ['Produk Lokal', 'Kecantikan & Perawatan Diri', 'Perlengkapan Kantor', 'Produk Digital'] },
]

const shoppingLinks = [
  { label: 'Semua Kategori', href: '/#kategori' },
  { label: 'Flash Sale', href: '/#flash-sale' },
  { label: 'Produk Terlaris', href: '/#produk-terlaris' },
  { label: 'Rekomendasi Hari Ini', href: '/#rekomendasi' },
]

const helpTopics = [
  { title: 'Menjelajahi produk', description: 'Gunakan bagian kategori untuk melihat pilihan kebutuhan, atau buka Rekomendasi Hari Ini untuk menjelajahi produk yang ditampilkan.' },
  { title: 'Melihat promo', description: 'Buka Flash Sale untuk melihat harga promo, harga normal, dan waktu berakhirnya penawaran yang ditampilkan.' },
  { title: 'Mencari produk terlaris', description: 'Pilih kategori di bagian Produk Terlaris untuk mempersempit daftar produk sesuai kebutuhanmu.' },
]

export default function FooterSection() {
  return (
    <footer className="mt-8 border-t-2 border-emerald-700 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-8 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr] lg:gap-x-12 lg:py-10">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/#beranda" aria-label="BelanjaYuk, kembali ke atas" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
              <img src="/belanjayuk-logo.svg" alt="BelanjaYuk" width={150} height={40} loading="lazy" className="h-9 w-auto" />
            </Link>
            <p className="mt-3 text-sm font-medium text-slate-700">Lebih dekat, lebih baik.</p>
            <p className="mt-2 max-w-60 text-xs leading-5 text-slate-500">Pilihan belanja untuk rumah, keluarga, dan kebutuhan sehari-hari.</p>
          </div>

          <nav aria-labelledby="footer-shopping-heading">
            <h2 id="footer-shopping-heading" className="text-xs font-semibold uppercase tracking-wide text-slate-800">Jelajahi</h2>
            <ul className="mt-3 space-y-1">
              {shoppingLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="inline-block py-1.5 text-xs hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-800">Bantuan Belanja</h2>
            <div className="mt-3 space-y-1">
              {helpTopics.map((topic) => (
                <details key={topic.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-1.5 text-xs hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600 [&::-webkit-details-marker]:hidden">
                    {topic.title}
                    <svg aria-hidden="true" className="h-3 w-3 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </summary>
                  <p className="pb-3 pt-1 text-xs leading-5 text-slate-500">{topic.description}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-800">Layanan</h2>
            <dl className="mt-3 space-y-3 text-xs">
              <div><dt className="text-slate-700">Pembayaran & pengiriman</dt><dd className="mt-1 leading-5 text-slate-500">Belum tersedia.</dd></div>
              <div><dt className="text-slate-700">Akses BelanjaYuk</dt><dd className="mt-1 leading-5 text-slate-500">Browser ponsel dan desktop.</dd></div>
            </dl>
          </div>
        </div>

        <details className="group border-t border-gray-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs font-medium text-slate-700 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600 [&::-webkit-details-marker]:hidden">
            Direktori kategori
            <svg aria-hidden="true" className="h-4 w-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </summary>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 pb-6 lg:grid-cols-4">
            {categoryGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold text-slate-600">{group.title}</h3>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>
        </details>

        <div className="border-t border-gray-200 py-5 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} BelanjaYuk. Hak cipta dilindungi.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>Indonesia · Bahasa Indonesia</span>
              <Link to="/#beranda" className="py-1 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600">Kembali ke atas ↑</Link>
            </div>
          </div>
          <p className="mt-2 text-slate-400">Pratinjau BelanjaYuk menggunakan data produk dan promo contoh.</p>
        </div>
      </div>
    </footer>
  )
}