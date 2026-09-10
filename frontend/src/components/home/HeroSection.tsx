export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Container utama menggunakan display: flex */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch">
        
        {/* Kiri / Utama: Gambar Paling Besar (FrontHero) */}
        <div className="flex-1 overflow-hidden rounded-2xl shadow-sm bg-gray-100 min-h-[220px] sm:min-h-[320px]">
          <img
            src="/FrontHero.png"
            alt="Promo Utama BelanjaYuk"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Samping Kanan: 2 Gambar Kecil (Truck & Tas) */}
        <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 w-full lg:w-1/3 shrink-0">
          <div className="flex-1 overflow-hidden rounded-2xl shadow-xs bg-gray-100">
            <img
              src="/FrontHeroTruck.png"
              alt="Promo Pengiriman BelanjaYuk"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl shadow-xs bg-gray-100">
            <img
              src="/FrontHeroTas.png"
              alt="Promo Fashion BelanjaYuk"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}