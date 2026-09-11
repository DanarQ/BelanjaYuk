import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

type LoginMode = 'password' | 'qrcode'

const EyeIcon = ({ hidden = false }: { hidden?: boolean }) => (
  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d={hidden ? 'M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.7A10.7 10.7 0 0 1 12 4.5c4.6 0 8.6 3 10 7.2a1 1 0 0 1 0 .6 10.8 10.8 0 0 1-3.2 4.7M6.2 6.2A10.8 10.8 0 0 0 2 11.7a1 1 0 0 0 0 .6c1.4 4.2 5.4 7.2 10 7.2 1.2 0 2.3-.2 3.3-.5' : 'M2 12s3.5-7.5 10-7.5S22 12 22 12s-3.5 7.5-10 7.5S2 12 2 12Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'} />
  </svg>
)

const GoogleIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.2 3.31v2.77h3.56c2.09-1.92 3.28-4.74 3.28-8.09Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.99.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.58 10.58 0 0 0 12 1a11 11 0 0 0-9.82 6.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2a9.91 9.91 0 0 0-8.59 14.86L2.05 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.16a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.99 3.86Zm4.84-6.17c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.96-.14.17-.29.19-.54.07-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29Z" />
  </svg>
)

const QrCode = () => (
  <svg aria-label="Contoh kode QR BelanjaYuk" className="h-44 w-44 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
    <path d="M8 8h30v30H8V8Zm6 6v18h18V14H14Zm6 6h6v6h-6v-6ZM62 8h30v30H62V8Zm6 6v18h18V14H68Zm6 6h6v6h-6v-6ZM8 62h30v30H8V62Zm6 6v18h18V68H14Zm6 6h6v6h-6v-6ZM45 8h9v9h-9V8Zm0 16h9v14h-9V24Zm0 21h9v9h-9v-9Zm0 16h9v31h-9V61ZM61 45h14v9H61v-9Zm21 0h10v9H82v-9ZM61 61h9v9h-9v-9Zm16 0h15v9H77v-9ZM61 77h25v9H61v-9Zm31 0v15h-9v-8h-7v-7h16ZM8 45h30v9H8v-9Zm0 16h9v-7h9v7H8Z" />
  </svg>
)

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<LoginMode>('password')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const validate = () => {
    const nextErrors: typeof errors = {}
    if (!identifier.trim()) nextErrors.identifier = 'Email atau nomor handphone wajib diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) && !/^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(identifier)) nextErrors.identifier = 'Format email atau nomor handphone tidak valid'
    if (!password) nextErrors.password = 'Kata sandi wajib diisi'
    else if (password.length < 6) nextErrors.password = 'Kata sandi minimal 6 karakter'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const finishLogin = (delay = 1000) => {
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setLoginSuccess(true)
      window.setTimeout(() => navigate('/'), 1000)
    }, delay)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (validate()) finishLogin()
  }

  const inputClass = (hasError: boolean) => `w-full border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 ${hasError ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-emerald-700 focus:ring-emerald-100'}`

  return (
    <section
      className="px-4 py-8 sm:px-6 sm:py-12 lg:py-16"
      style={{ backgroundColor: '#f4f1e9' }}
    >
      <div className="mx-auto grid min-h-[640px] max-w-5xl overflow-hidden border border-slate-200 bg-white lg:grid-cols-2">
        <aside
          className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between"
          style={{ backgroundColor: '#006b4f' }}
        >
          <div>
            <Link to="/" aria-label="Kembali ke beranda BelanjaYuk" className="inline-block">
              <img src="/belanjayuk-logo.svg" alt="BelanjaYuk" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <h1 className="mt-8 max-w-sm text-4xl font-bold leading-[1.12] tracking-[-0.035em]">Lebih dekat.<br />Lebih baik.</h1>
            <p className="mt-5 max-w-xs text-sm leading-6 text-emerald-100/80">Satu akun untuk belanja, melacak pesanan, dan menyimpan barang yang kamu suka.</p>
          </div>
        
          <span
            aria-hidden="true"
            className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[48px]"
            style={{ borderColor: '#087b5e' }}
          />
        </aside>

        <div className="flex items-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" aria-label="Kembali ke beranda BelanjaYuk" className="mb-9 inline-block lg:hidden">
              <img src="/belanjayuk-logo.svg" alt="BelanjaYuk" className="h-9 w-auto" />
            </Link>
            <div className="flex items-end justify-between gap-4 border-b border-slate-200">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Selamat datang kembali</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-950">Masuk ke akunmu</h2></div>
              <button type="button" onClick={() => setMode(mode === 'password' ? 'qrcode' : 'password')} className="shrink-0 border-b-2 border-emerald-700 pb-3 text-xs font-bold text-emerald-800">{mode === 'password' ? 'Pakai QR' : 'Pakai sandi'}</button>
            </div>

            {loginSuccess && <div role="status" className="mt-6 border-l-4 border-emerald-600 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">Berhasil masuk. Membuka beranda…</div>}

            {mode === 'password' ? (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div>
                  <label htmlFor="identifier" className="mb-2 block text-sm font-semibold text-slate-800">Email atau nomor handphone</label>
                  <input id="identifier" type="text" autoComplete="username" value={identifier} onChange={(event) => { setIdentifier(event.target.value); setErrors((current) => ({ ...current, identifier: undefined })) }} placeholder="nama@email.com" aria-invalid={Boolean(errors.identifier)} className={inputClass(Boolean(errors.identifier))} />
                  {errors.identifier && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.identifier}</p>}
                </div>
                <div>
                  <div className="mb-2 flex justify-between gap-4"><label htmlFor="password" className="text-sm font-semibold text-slate-800">Kata sandi</label><Link to="/bantuan" className="text-xs font-semibold text-emerald-700 hover:underline">Lupa kata sandi?</Link></div>
                  <div className="relative">
                    <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })) }} placeholder="Minimal 6 karakter" aria-invalid={Boolean(errors.password)} className={`${inputClass(Boolean(errors.password))} pr-12`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0 grid h-full w-12 place-items-center text-slate-500 hover:text-slate-900" aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}><EyeIcon hidden={showPassword} /></button>
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>}
                </div>
                <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-emerald-700" />Ingat saya di perangkat ini</label>
                <button type="submit" disabled={isLoading || loginSuccess} className="w-full bg-orange-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Sedang masuk…' : 'Masuk'}</button>
              </form>
            ) : (
              <div className="mt-8 flex flex-col items-center border border-slate-200 bg-slate-50 px-6 py-8 text-center">
                <div className="border border-slate-300 bg-white p-3"><QrCode /></div>
                <h3 className="mt-5 font-bold text-slate-900">Pindai lewat aplikasi BelanjaYuk</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">Buka menu Akun, pilih Pindai QR, lalu arahkan kamera ke kode ini.</p>
              </div>
            )}

            <div className="my-7 flex items-center gap-4 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />atau<span className="h-px flex-1 bg-slate-200" /></div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => finishLogin(800)} disabled={isLoading} className="flex items-center justify-center gap-2.5 border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500 disabled:opacity-60"><GoogleIcon />Google</button>
              <button type="button" onClick={() => finishLogin(800)} disabled={isLoading} className="flex items-center justify-center gap-2.5 border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500 disabled:opacity-60"><WhatsAppIcon />WhatsApp</button>
            </div>
            <p className="mt-8 text-center text-sm text-slate-600">Belum punya akun? <Link to="/daftar" className="font-bold text-emerald-700 hover:underline">Daftar gratis</Link></p>
            <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">Dengan masuk, kamu menyetujui <Link to="/syarat-ketentuan" className="underline">Syarat & Ketentuan</Link> dan <Link to="/kebijakan-privasi" className="underline">Kebijakan Privasi</Link>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
