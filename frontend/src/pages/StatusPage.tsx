import { Link } from 'react-router'

export default function StatusPage({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
      <Link to="/" className="mt-6 inline-block rounded bg-emerald-700 px-5 py-3 text-sm text-white">Kembali ke beranda</Link>
    </section>
  )
}
