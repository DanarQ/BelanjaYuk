interface NavbarProps {
  cartCount?: number
  wishlistCount?: number
  onSearch?: (query: string) => void
}

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  onSearch,
}: NavbarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = new FormData(e.currentTarget).get('q') as string
    onSearch?.(query?.trim() || '')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sm:gap-6">
        {/* Logo - Shopee scale */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/belanjayuk-logo.svg"
            alt="BelanjaYuk"
            className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
          />
        </a>

        {/* Search Bar - Shopee style wide & prominent */}
        <form
          onSubmit={handleSubmit}
          className="order-last sm:order-none w-full sm:w-auto flex-1 max-w-2xl flex items-center relative"
        >
          <input
            name="q"
            type="search"
            placeholder="Cari produk, kategori, atau toko di BelanjaYuk..."
            className="w-full pl-5 pr-24 py-2.5 sm:py-3 bg-gray-50 focus:bg-white text-sm sm:text-base rounded-xl border-2 border-emerald-600/30 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-5 sm:px-6 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Cari</span>
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Wishlist */}
          <a
            href="#wishlist"
            className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-all"
            title="Wishlist"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && <Badge count={wishlistCount} color="bg-rose-500" />}
          </a>

          {/* Cart */}
          <a
            href="#cart"
            className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all"
            title="Keranjang"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && <Badge count={cartCount} color="bg-emerald-600" />}
          </a>

          <div className="h-7 w-px bg-gray-200 mx-1 hidden sm:block" />

          {/* Auth */}
          <a
            href="#login"
            className="px-3.5 py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
          >
            Masuk
          </a>
          <a
            href="#daftar"
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-xs transition-all"
          >
            Daftar
          </a>
        </div>
      </div>
    </nav>
  )
}

function Badge({ count, color }: { count: number; color: string }) {
  return (
    <span className={`absolute top-1 right-1 min-w-4 h-4 px-1 text-[10px] font-bold text-white ${color} rounded-full flex items-center justify-center`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}