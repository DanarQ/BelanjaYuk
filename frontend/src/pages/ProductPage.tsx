import { Link, useParams } from 'react-router'
import { recommendations } from '../data/recommendations'
import StatusPage from './StatusPage'

export default function ProductPage() {
  const { productId } = useParams()
  const product = recommendations.find((item) => item.id === productId)
  if (!product) return <StatusPage title="Produk tidak ditemukan" description="Produk yang kamu cari tidak tersedia." />
  return <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <Link to="/produk" className="text-sm text-emerald-700">← Semua produk</Link>
    <div className="mt-5 grid gap-8 rounded border border-gray-200 bg-white p-5 md:grid-cols-2">
      <img src={product.image} alt={`Ilustrasi ${product.name}`} className="aspect-square w-full max-w-md object-cover" />
      <div><h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-orange-600">Rp{product.price.toLocaleString('id-ID')}</p>
        <p className="mt-4 text-sm text-slate-500">{product.city} · {product.sold.toLocaleString('id-ID')} terjual</p>
        <p className="mt-8 text-sm text-slate-500">Pratinjau produk dengan data contoh dan gambar ilustrasi. Pembelian belum tersedia.</p>
      </div>
    </div>
  </section>
}
