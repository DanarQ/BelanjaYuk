import Header from './components/layout/Header'
import HeroSection from './components/home/HeroSection'
import CategorySection from './components/home/CategorySection'
import FlashSaleSection from './components/home/FlashSaleSection'
import ProdukTerlarisSection from './components/home/ProdukTerlarisSection'
import RekomendasiSection from './components/home/RekomendasiSection'
import FooterSection from './components/home/FooterSection'

function App() {
  return (
    <div id="beranda" className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <FlashSaleSection />
        <ProdukTerlarisSection />
        <RekomendasiSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default App
