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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 lg:py-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 lg:gap-x-5">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/belanjayuk-logo.svg"
            alt="BelanjaYuk"
            className="h-6 sm:h-8 lg:h-9 w-auto object-contain"
          />
        </a>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="order-last lg:order-none w-full lg:w-auto lg:flex-1 min-w-0 lg:max-w-2xl flex items-center relative"
        >
          <input
            name="q"
            type="search"
            placeholder="Cari produk, kategori, atau toko di BelanjaYuk..."
            className="w-full h-10 pl-3 pr-20 bg-gray-50 focus:bg-white text-sm font-normal placeholder:text-slate-400 placeholder:font-normal rounded-lg border border-emerald-600/30 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-1 h-8 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Cari</span>
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
          {/* Wishlist */}
          <a
            href="#wishlist"
            className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-all"
            title="Wishlist"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && <Badge count={wishlistCount} color="bg-rose-500" />}
          </a>

          {/* Cart */}
          <a
            href="#cart"
            className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg transition-all"
            title="Keranjang"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && <Badge count={cartCount} color="bg-emerald-600" />}
          </a>

          <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

          {/* Auth */}
          <a
            href="#login"
            className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all leading-5"
          >
            Masuk
          </a>
          <a
            href="#daftar"
            className="px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-lg shadow-xs transition-all leading-5"
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
    <span className={`absolute top-1 right-1 min-w-[18px] h-[18px] px-1 text-[11px] font-semibold text-white ${color} rounded-full flex items-center justify-center border-2 border-white`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}