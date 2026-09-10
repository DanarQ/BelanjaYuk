import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import FooterSection from '../home/FooterSection'

export default function StoreLayout() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, search, hash])

  return (
    <div id="beranda" className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-[45vh]"><Outlet /></main>
      <FooterSection />
    </div>
  )
}
