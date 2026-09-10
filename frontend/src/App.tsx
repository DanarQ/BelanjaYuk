import { Route, Routes } from 'react-router'
import StoreLayout from './components/layout/StoreLayout'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import StatusPage from './pages/StatusPage'

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produk" element={<CatalogPage />} />
        <Route path="produk/:productId" element={<ProductPage />} />
        <Route path="keranjang" element={<StatusPage title="Keranjang" description="Fitur keranjang belum tersedia." />} />
        <Route path="wishlist" element={<StatusPage title="Wishlist" description="Fitur menyimpan produk favorit belum tersedia." />} />
        <Route path="masuk" element={<StatusPage title="Masuk" description="Layanan masuk akun belum tersedia." />} />
        <Route path="daftar" element={<StatusPage title="Daftar" description="Pendaftaran akun belum tersedia." />} />
        <Route path="*" element={<StatusPage title="Halaman tidak ditemukan" description="Periksa alamat halaman atau kembali ke beranda." />} />
      </Route>
    </Routes>
  )
}