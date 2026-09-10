export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      {/* Container utama: flex col di mobile, flex row di desktop */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:h-[320px] xl:h-[340px]">
        
        {/* Kiri: Banner Utama Ramadan (~70% lebar desktop) */}
        <div className="relative flex-1 w-full overflow-hidden rounded-md  min-h-[280px] lg:min-h-0 bg-[#DCE7DF]">
          {/* Background Image */}
          <img
            src="/FrontHero.png"
            alt="Ramadan Lebih Bermakna — BelanjaYuk"
            className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-contain lg:object-right"
          />
          {/* Latar pekat di area teks, memudar menuju gambar produk */}
          <div aria-hidden="true" className="absolute inset-0 hidden bg-linear-to-r from-[#eaf2ec] from-0% via-[#eaf2ec]/95 via-40% to-transparent to-80% pointer-events-none lg:block" />

          {/* Text Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:h-full lg:p-8 lg:max-w-[48%]">
            <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-600 uppercase">
              Pilihan Ramadan
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-950 leading-tight mt-3">
              <span className="text-emerald-600">Ramadan</span><br />Lebih Bermakna
            </h1>
            <p className="max-w-[32ch] text-xs sm:text-sm text-emerald-950 mt-2.5 leading-relaxed font-medium">
              Lengkapi kebutuhan rumah dan keluarga dengan harga spesial Ramadan.
            </p>
            <div className="mt-5">
              <a
                href="#produk-terlaris"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5F00] hover:bg-[#EA5500]  text-white text-xs sm:text-sm font-semibold rounded-md  transition-colors"
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
          <div className="relative flex-1 overflow-hidden rounded-md  min-h-[155px] sm:min-h-[150px] bg-[#FED7AA]">
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
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#EA580C] leading-tight">
                  Gratis Ongkir
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                  ke Seluruh Indonesia
                </p>
                <p className="max-w-[22ch] text-xs text-amber-950 leading-relaxed font-normal mt-2">
                  Min. belanja Rp100.000
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="#flash-sale"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 hover:bg-white text-[#EA580C] text-xs font-semibold rounded-lg  transition-colors "
                >
                  <span>Lihat Promo</span>
                  <span className="text-xs leading-none">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Banner 2: Produk Lokal (Tas) */}
          <div className="relative flex-1 overflow-hidden rounded-md  min-h-[155px] sm:min-h-[150px] bg-[#D1FAE5]">
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
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-emerald-900 leading-tight">
                  Produk Lokal
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-emerald-950 leading-snug">
                  Pilihan Terbaik
                </p>
                <p className="max-w-[22ch] text-xs text-emerald-950 leading-relaxed font-medium mt-2">
                  Dukung UMKM,<br /> Dukung Indonesia
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="#produk-terlaris"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 hover:bg-white text-emerald-900 text-xs font-semibold rounded-lg  transition-colors "
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
