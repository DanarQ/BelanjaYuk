import { useNavigate } from 'react-router'
import Navbar from './Navbar'
import CategoryNavbar from './CategoryNavbar'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-50 bg-emerald-700">
      <Navbar />
      <CategoryNavbar onCategorySelect={(category) => navigate(`/produk?${new URLSearchParams({ kategori: category })}`)} />
    </header>
  )
}
