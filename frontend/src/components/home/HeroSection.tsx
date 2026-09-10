export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      {/* Container utama: flex col di mobile, flex row di desktop */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:h-[360px] xl:h-[380px]">
        
        {/* Kiri: Banner Utama Ramadan (~70% lebar desktop) */}
        <div className="relative flex-1 w-full overflow-hidden rounded-2xl shadow-xs min-h-[300px] lg:min-h-0 bg-[#DCE7DF]">
          {/* Background Image */}
          <img
            src="/FrontHero.png"
            alt="Ramadan Lebih Bermakna — BelanjaYuk"
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
          {/* Latar pekat di area teks, memudar menuju gambar produk */}
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#eaf2ec] from-0% via-[#eaf2ec]/95 via-40% to-transparent to-80% pointer-events-none" />

          {/* Text Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-8 lg:p-10 max-w-sm sm:max-w-md">
            <p className="text-[11px] sm:text-xs font-bold tracking-widest text-slate-600 uppercase">
              Hidup Lebih Baik Awali Dari Rumah
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-950 leading-tight mt-1.5">
              Ramadan<br />Lebih Bermakna
            </h1>
            <p className="max-w-[32ch] text-xs sm:text-sm text-emerald-950 mt-2.5 leading-relaxed font-medium">
              Temukan kebutuhan terbaik untuk menyambut bulan suci dengan penawaran spesial hanya di Belanjayuk.
            </p>
            <div className="mt-5">
              <a
                href="#belanja"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5F00] hover:bg-[#EA5500] active:scale-98 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all"
              >
                <span>Belanja Sekarang</span>
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Kanan: 2 Banner Promo Bertumpuk (~30% lebar desktop) */}
        <div className="w-full lg:w-[31%] xl:w-[30%] shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 justify-between">
          
          {/* Banner 1: Gratis Ongkir (Truk) */}
          <div className="relative flex-1 overflow-hidden rounded-2xl shadow-xs min-h-[155px] sm:min-h-[170px] bg-[#FED7AA]">
            {/* Background Image: Truk di sebelah kanan */}
            <img
              src="/FrontHeroTruck.png"
              alt="Gratis Ongkir ke Seluruh Indonesia"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            {/* Gradient lembut agar teks selalu kontras */}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#ffedd5] from-0% via-[#ffedd5]/95 via-40% to-transparent to-80% pointer-events-none" />

            {/* Text Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5 max-w-[65%]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#EA580C] leading-tight">
                  Gratis Ongkir
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  ke Seluruh Indonesia
                </p>
                <p className="max-w-[22ch] text-xs text-amber-950 leading-relaxed font-medium mt-0.5">
                  Min. belanja Rp100.000
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="#promo"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 hover:bg-white text-[#EA580C] text-xs font-semibold rounded-lg shadow-xs transition-all hover:gap-1.5"
                >
                  <span>Lihat Promo</span>
                  <span className="text-xs leading-none">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Banner 2: Produk Lokal (Tas) */}
          <div className="relative flex-1 overflow-hidden rounded-2xl shadow-xs min-h-[155px] sm:min-h-[170px] bg-[#D1FAE5]">
            {/* Background Image: Tas & Tanaman di sebelah kanan */}
            <img
              src="/FrontHeroTas.png"
              alt="Produk Lokal Pilihan Terbaik"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            {/* Gradient lembut agar teks selalu kontras */}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#dcfce7] from-0% via-[#dcfce7]/95 via-40% to-transparent to-80% pointer-events-none" />

            {/* Text Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5 max-w-[65%]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-900 leading-tight">
                  Produk Lokal
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-snug">
                  Pilihan Terbaik
                </p>
                <p className="max-w-[22ch] text-xs text-emerald-950 leading-relaxed font-medium mt-0.5">
                  Dukung UMKM, Dukung Indonesia
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="#produk-lokal"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 hover:bg-white text-emerald-900 text-xs font-semibold rounded-lg shadow-xs transition-all hover:gap-1.5"
                >
                  <span>Lihat Koleksi</span>
                  <span className="text-xs leading-none">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
