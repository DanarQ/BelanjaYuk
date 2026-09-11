import type { ProductSpecification } from './productTypes'

interface ProductDetailsProps {
  specifications: ProductSpecification[]
  description: string[]
  highlights: string[]
  packageContents: string[]
}

export default function ProductDetails({
  specifications,
  description,
  highlights,
  packageContents,
}: ProductDetailsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6 space-y-8">
      {/* 1. Spesifikasi Produk */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-3 border-b border-gray-100 flex items-center gap-2">
          <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          <span>Spesifikasi Produk</span>
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs sm:text-sm">
          {specifications.map((spec) => (
            <div key={spec.label} className="flex items-baseline py-1 border-b border-gray-50">
              <span className="w-36 sm:w-40 text-slate-400 shrink-0 font-medium">
                {spec.label}
              </span>
              <span className="text-slate-800 font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Deskripsi Produk */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-3 border-b border-gray-100 flex items-center gap-2">
          <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span>Deskripsi Produk</span>
        </h2>

        <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {description.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Keunggulan Utama */}
        {highlights.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 uppercase tracking-wide">
              Keunggulan Produk:
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Isi Paket */}
        {packageContents.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 uppercase tracking-wide">
              Kelengkapan Paket:
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-700">
              {packageContents.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

