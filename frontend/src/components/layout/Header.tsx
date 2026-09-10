import Navbar from './Navbar'
import CategoryNavbar from './CategoryNavbar'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <Navbar />
      <CategoryNavbar />
    </header>
  )
}
