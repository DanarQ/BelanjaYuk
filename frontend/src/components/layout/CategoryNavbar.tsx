import { useEffect, useRef } from 'react'
import { categories, allCategories } from '../../data/categories'

interface CategoryNavbarProps {
  location?: string
  onCategorySelect?: (category: string) => void
}

export default function CategoryNavbar({ location = 'Pontianak', onCategorySelect }: CategoryNavbarProps) {
  const menuRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const menu = menuRef.current
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const categoryStyle = (category: string) => category === 'Promo'
    ? 'font-semibold text-orange-600 hover:text-rose-700 cursor-pointer'
    : 'text-slate-600 hover:text-emerald-600 cursor-pointer'

  return (
    <nav aria-label="Kategori produk" className="bg-transparent text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 px-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <details ref={menuRef} className="relative shrink-0">
          <summary className="flex cursor-pointer list-none items-center gap-2 py-2.5 text-sm font-semibold text-white hover:text-emerald-100 focus-visible:outline-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Semua Kategori
          </summary>
          <ul className="absolute left-0 top-full z-40 grid max-h-[65vh] w-[calc(100vw-2rem)] max-w-2xl grid-cols-1 gap-1 overflow-y-auto overscroll-contain rounded-md border border-gray-100 bg-white p-2 shadow-lg sm:w-[36rem] sm:grid-cols-2 lg:w-[42rem] lg:grid-cols-3">
            {allCategories.map((category) => (
              <li key={category}>
                <button type="button" onClick={(event) => {
                  event.currentTarget.closest('details')?.removeAttribute('open')
                  onCategorySelect?.(category)
                }} className={`w-full rounded px-3 py-2.5 text-left text-sm hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-600 ${categoryStyle(category)}`}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </details>

        <div className="order-last flex w-full min-w-0 items-center gap-5 overflow-x-auto lg:order-none lg:w-auto lg:flex-1 lg:pl-4">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => onCategorySelect?.(category)}
              className={`type-nav-category shrink-0 whitespace-nowrap py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white cursor-pointer hover:text-emerald-100 ${category === 'Promo' ? 'font-semibold text-amber-200' : 'text-white'}`}>
              {category}
            </button>
          ))}
        </div>
        {/* Nanti implement lokasi tracker beneran */}
        <div className="ml-auto flex shrink-0 items-center gap-2 py-3 text-xs text-emerald-50 lg:pl-4">
          <svg aria-hidden="true" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1116 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>Kirim ke <strong className="font-semibold text-white">{location}</strong></span>
        </div>
      </div>
    </nav>
  )
}
