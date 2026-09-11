import type { Product } from '../../data/recommendations'

export interface ProductVariant {
  id: string
  name: string
  image?: string
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductSeller {
  name: string
  avatar: string
  badge: string
  city: string
  rating: number
  ratingCount: number
  responseRate: string
  productCount: number
  joinedTime: string
  activeTime: string
}

export interface ProductReview {
  id: string
  userName: string
  userAvatar: string
  rating: number
  date: string
  variantName: string
  comment: string
  helpfulCount: number
  images?: string[]
}

export interface DetailedProductInfo {
  product: Product
  galleryImages: string[]
  variants: ProductVariant[]
  specifications: ProductSpecification[]
  description: string[]
  highlights: string[]
  packageContents: string[]
  seller: ProductSeller
  reviews: ProductReview[]
  ratingCounts: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export function getProductDetails(product: Product): DetailedProductInfo {
  // Generate realistic, product-specific mock details based on product category & attributes
  const isFashion = product.category === 'Fashion'
  const isElektronik = product.category === 'Elektronik'
  const isSport = product.category === 'Olahraga'
  const isKitchen = product.category === 'Rumah & Dapur'
  const isHobi = product.category === 'Hobi & Gaya Hidup'

  let variants: ProductVariant[] = [
    { id: 'v1', name: 'Standar / Default' },
    { id: 'v2', name: 'Edisi Spesial' },
  ]

  if (isFashion) {
    variants = [
      { id: 'v1', name: 'Cream / All Size' },
      { id: 'v2', name: 'Hitam / All Size' },
      { id: 'v3', name: 'Mocca / All Size' },
    ]
  } else if (isElektronik) {
    variants = [
      { id: 'v1', name: 'Matte Black' },
      { id: 'v2', name: 'Silver Gray' },
      { id: 'v3', name: 'Midnight Blue' },
    ]
  } else if (isSport) {
    variants = [
      { id: 'v1', name: 'Ukuran 7 (Dewasa)' },
      { id: 'v2', name: 'Ukuran 6 (Remaja)' },
    ]
  } else if (isKitchen) {
    variants = [
      { id: 'v1', name: 'Set 4 Pcs' },
      { id: 'v2', name: 'Set Komplit 8 Pcs' },
    ]
  } else if (isHobi) {
    variants = [
      { id: 'v1', name: 'Paket Standar' },
      { id: 'v2', name: 'Paket Lengkap + Aksesori' },
    ]
  }

  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ]

  const specifications: ProductSpecification[] = [
    { label: 'Kategori', value: product.category },
    { label: 'Kondisi', value: 'Baru 100% Original' },
    { label: 'Dikirim Dari', value: product.city },
    { label: 'Merek', value: isElektronik ? 'BelanjaYuk Audio' : isFashion ? 'BelanjaYuk Wear' : 'Official Choice' },
    { label: 'Garansi', value: isElektronik ? '12 Bulan Resmi Distributor' : '7 Hari Pengembalian Barang' },
    { label: 'Stok Tersedia', value: '148 buah' },
    { label: 'Berat Pengiriman', value: isElektronik ? '450 gram' : isFashion ? '250 gram' : '850 gram' },
  ]

  const highlights = [
    'Material premium berkualitas tinggi dengan daya tahan maksimal.',
    'Desain ergonomis, stylish, dan sangat nyaman untuk penggunaan harian.',
    'Produk lolos uji kontrol kualitas resmi BelanjaYuk.',
    'Dukungan garansi resmi dan layanan pelanggan terpercaya.',
  ]

  const description = [
    `${product.name} dirancang khusus untuk memenuhi kebutuhan gaya hidup modern Anda dengan mengutamakan kualitas, ketahanan, serta kenyamanan pemakaian.`,
    `Diproduksi menggunakan bahan pilihan yang awet dan higienis, produk ini menjadi pilihan favorit ribuan pelanggan di seluruh Indonesia.`,
    `Setiap unit telah melalui proses pemeriksaan ketat sebelum dikemas dengan standar pengemasan aman (bubble wrap tebal) agar tiba di tangan Anda dalam kondisi sempurna.`,
  ]

  const packageContents = [
    `1x ${product.name}`,
    '1x Buku Panduan Penggunaan & Perawatan',
    '1x Kartu Garansi Resmi BelanjaYuk',
    '1x Paket Pengemasan Eksklusif',
  ]

  const seller: ProductSeller = {
    name: `${product.category} Official Store`,
    avatar: product.image,
    badge: 'Super Seller',
    city: product.city,
    rating: 4.9,
    ratingCount: 14200,
    responseRate: '98% (Hitungan Menit)',
    productCount: 185,
    joinedTime: '2 tahun lalu',
    activeTime: '10 menit lalu',
  }

  const reviews: ProductReview[] = [
    {
      id: 'rev-1',
      userName: 'Rian Pratama',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=60',
      rating: 5,
      date: '08 Maret 2026',
      variantName: variants[0]?.name || 'Standar',
      comment: 'Barang sampai cepat banget ke Pontianak! Pengemasan sangat rapi dengan bubble wrap tebal. Kualitasnya melebihi ekspektasi, sangat puas belanja di toko ini.',
      helpfulCount: 14,
    },
    {
      id: 'rev-2',
      userName: 'Dewi Anggraini',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
      rating: 5,
      date: '05 Maret 2026',
      variantName: variants[1]?.name || 'Edisi Spesial',
      comment: 'Sesuai dengan foto dan deskripsi. Bahannya bagus dan terasa premium. Pelayanan admin juga ramah dan responsif pas ditanya stok.',
      helpfulCount: 8,
    },
    {
      id: 'rev-3',
      userName: 'Budi Santoso',
      userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=60',
      rating: 4,
      date: '28 Februari 2026',
      variantName: variants[0]?.name || 'Standar',
      comment: 'Pengiriman agak lambat 1 hari karena kurir lokal, tapi barangnya sendiri berfungsi sangat baik. Recomended seller!',
      helpfulCount: 3,
    },
  ]

  return {
    product,
    galleryImages,
    variants,
    specifications,
    description,
    highlights,
    packageContents,
    seller,
    reviews,
    ratingCounts: {
      5: 98,
      4: 22,
      3: 3,
      2: 1,
      1: 0,
    },
  }
}
