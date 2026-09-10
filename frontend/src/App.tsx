import Header from './components/layout/Header'
import HeroSection from './components/home/HeroSection'
import CategorySection from './components/home/CategorySection'
import FlashSaleSection from './components/home/FlashSaleSection'
import ProdukTerlarisSection from './components/home/ProdukTerlarisSection'
import RekomendasiSection from './components/home/RekomendasiSection'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <FlashSaleSection />
        <ProdukTerlarisSection />
        <RekomendasiSection />
      </main>
    </div>
  )
}

export default App
