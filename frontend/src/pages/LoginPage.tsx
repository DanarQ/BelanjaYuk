import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

type LoginMode = 'password' | 'qrcode'

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
    const newErrors: { identifier?: string; password?: string } = {}
    if (!identifier.trim()) {
      newErrors.identifier = 'Email atau Nomor Handphone wajib diisi'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) &&
      !/^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(identifier) &&
      identifier.length < 3
    ) {
      newErrors.identifier = 'Format email atau no. handphone tidak valid'
    }

    if (!password) {
      newErrors.password = 'Kata sandi wajib diisi'
    } else if (password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLoginSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }, 1000)
  }

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-emerald-900/5 to-transparent py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Showcase (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-800">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                Pilihan Belanja Terpercaya No. 1
              </div>

              <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Belanja Lebih Dekat, Lebih Nyaman di{' '}
                <span className="text-emerald-700">BelanjaYuk</span>
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                Jutaan pilihan produk berkualitas dari penjual lokal dan brand resmi di seluruh nusantara. Nikmati promo eksklusif setiap hari!
              </p>
            </div>

            {/* Feature Perks */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 rounded-lg border border-gray-200/80 bg-white/90 p-3.5 shadow-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">100% Produk Original</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Jaminan barang asli langsung dari penjual terverifikasi & official store.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-lg border border-gray-200/80 bg-white/90 p-3.5 shadow-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.948c0-.621-.504-1.125-1.125-1.125H4.5A1.125 1.125 0 0 0 3.375 6.625v7.625m10.875 0H3.375" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Gratis Ongkir & Pengiriman Cepat</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Voucher gratis ongkir s.d. 100% dengan jaminan tiba tepat waktu.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-lg border border-gray-200/80 bg-white/90 p-3.5 shadow-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Transaksi Aman & Terlindungi</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Dana diteruskan ke penjual hanya setelah Anda menerima pesanan dengan baik.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md">
              {/* Corner Toggle (Shopee Style: Toggle between Password & QR Code) */}
              <button
                type="button"
                onClick={() => setMode((m) => (m === 'password' ? 'qrcode' : 'password'))}
                className="absolute top-0 right-0 group flex items-center gap-1.5 rounded-bl-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors border-l border-b border-emerald-200 cursor-pointer"
                title={mode === 'password' ? 'Masuk dengan QR Code' : 'Masuk dengan Kata Sandi'}
              >
                {mode === 'password' ? (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                    </svg>
                    <span>Scan QR</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span>Akun / Sandi</span>
                  </>
                )}
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {mode === 'password' ? 'Masuk ke BelanjaYuk' : 'Masuk dengan QR Code'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {mode === 'password'
                    ? 'Gunakan email atau nomor handphone Anda'
                    : 'Buka aplikasi BelanjaYuk di ponsel lalu pindai kode'}
                </p>
              </div>

              {/* Success Notification */}
              {loginSuccess && (
                <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <svg className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Berhasil masuk! Mengarahkan ke beranda...</span>
                </div>
              )}

              {/* Mode 1: Password Form */}
              {mode === 'password' ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Identifier Input */}
                  <div>
                    <label htmlFor="identifier" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      No. Handphone / Email
                    </label>
                    <input
                      id="identifier"
                      type="text"
                      autoComplete="username"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value)
                        if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }))
                      }}
                      placeholder="Contoh: user@email.com atau 08123456789"
                      className={`w-full rounded-md border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.identifier
                          ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                          : 'border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                      }`}
                    />
                    {errors.identifier && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.identifier}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                        Kata Sandi
                      </label>
                      <Link
                        to="/bantuan"
                        className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        Lupa kata sandi?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                        }}
                        placeholder="Masukkan kata sandi akun"
                        className={`w-full rounded-md border pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors ${
                          errors.password
                            ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                            : 'border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                      >
                        {showPassword ? (
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 accent-orange-600 focus:ring-orange-500 cursor-pointer"
                      />
                      <span>Ingat akun saya di perangkat ini</span>
                    </label>
                  </div>

                  {/* Submit Button (Primary Orange Brand Color) */}
                  <button
                    type="submit"
                    disabled={isLoading || loginSuccess}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-orange-600 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xs hover:bg-orange-700 active:bg-orange-800 disabled:opacity-70 transition-colors cursor-pointer mt-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <span>Masuk</span>
                    )}
                  </button>
                </form>
              ) : (
                /* Mode 2: QR Code Login */
                <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
                  <div className="relative rounded-xl border-2 border-emerald-600 bg-white p-4 shadow-sm">
                    {/* Simulated QR Code SVG */}
                    <div className="h-44 w-44 bg-gray-50 flex items-center justify-center rounded border border-gray-200">
                      <svg className="h-36 w-36 text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M10 10h30v30H10V10Zm5 5v20h20V15H15Z" />
                        <path d="M20 20h10v10H20V20Z" />
                        <path d="M60 10h30v30H60V10Zm5 5v20h20V15H65Z" />
                        <path d="M70 20h10v10H70V20Z" />
                        <path d="M10 60h30v30H10V60Zm5 5v20h20V65H15Z" />
                        <path d="M20 70h10v10H20V70Z" />
                        <path d="M45 10h10v10H45V10Zm0 15h10v10H45V25Zm0 15h10v10H45V40Zm0 15h10v10H45V55Zm0 15h10v10H45V70Zm0 15h10v10H45V85Z" />
                        <path d="M60 45h15v10H60V45Zm20 0h10v10H80V45Zm-20 15h10v10H60V60Zm15 0h15v10H75V60Zm-15 15h25v10H60V75Zm0 15h10v10H60V90Zm15 0h15v10H75V90Z" />
                        <path d="M10 45h30v5H10V45Zm0 10h10v5H10V55Z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-2.5 inset-x-0 mx-auto w-max rounded-full bg-emerald-700 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Pindai via Aplikasi
                    </span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <p className="text-xs text-slate-700 font-medium">
                      Buka aplikasi <strong>BelanjaYuk</strong> &gt; Pilih ikon <strong>Pindai QR</strong>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Kode QR diperbarui otomatis setiap 60 detik.
                    </p>
                  </div>
                </div>
              )}

              {/* Social Login Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  atau masuk dengan
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Google Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true)
                    setTimeout(() => {
                      setIsLoading(false)
                      setLoginSuccess(true)
                      setTimeout(() => navigate('/'), 1000)
                    }, 800)
                  }}
                  className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                {/* WhatsApp Quick OTP */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true)
                    setTimeout(() => {
                      setIsLoading(false)
                      setLoginSuccess(true)
                      setTimeout(() => navigate('/'), 1000)
                    }, 800)
                  }}
                  className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.2 0-.43.08-.66.33-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.96-.14.17-.29.19-.54.07-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48Z" />
                  </svg>
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Register Callout */}
              <p className="mt-6 text-center text-xs text-slate-500">
                Belum punya akun BelanjaYuk?{' '}
                <Link
                  to="/daftar"
                  className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
                >
                  Daftar Sekarang
                </Link>
              </p>

              {/* Disclaimer */}
              <p className="mt-4 text-center text-[11px] text-slate-400 leading-tight">
                Dengan masuk, Anda menyetujui{' '}
                <Link to="/syarat-ketentuan" className="underline hover:text-slate-600">
                  Syarat & Ketentuan
                </Link>{' '}
                serta{' '}
                <Link to="/kebijakan-privasi" className="underline hover:text-slate-600">
                  Kebijakan Privasi
                </Link>{' '}
                BelanjaYuk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

