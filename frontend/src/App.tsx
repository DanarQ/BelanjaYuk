import Navbar from './components/layout/Navbar'
import CategoryNavbar from './components/layout/CategoryNavbar'
import HeroSection from './components/home/HeroSection'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNavbar />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}

export default App
