import { useNavigate } from 'react-router'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FlashSaleSection from '../components/home/FlashSaleSection'
import ProdukTerlarisSection from '../components/home/ProdukTerlarisSection'
import RekomendasiSection from '../components/home/RekomendasiSection'
export default function HomePage() {
  const navigate = useNavigate()
  return <><HeroSection /><CategorySection onCategorySelect={(category) => navigate(`/produk?${new URLSearchParams({ kategori: category })}`)} /><FlashSaleSection /><ProdukTerlarisSection /><RekomendasiSection /></>
}