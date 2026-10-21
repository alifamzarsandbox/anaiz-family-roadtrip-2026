import { ArrowUpRight, Heart } from 'lucide-react'

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Terus ke kandungan</a>
      <header className="site-header flex items-center justify-between gap-4">
        <a className="wordmark" href="#main-content" aria-label="ANAIZ Family, halaman utama">
          anaiz<span className="wordmark-dot">.</span>
          <span className="wordmark-caption">FAMILY JOURNAL</span>
        </a>
        <span className="edition flex items-center gap-2">EDISI 2026 <ArrowUpRight size={14} aria-hidden="true" /></span>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer flex flex-wrap items-center justify-between gap-3">
        <span>ONE FAMILY. ONE JOURNEY.</span>
        <span className="flex items-center gap-2">Dicipta untuk kenangan <Heart size={12} aria-hidden="true" /></span>
      </footer>
    </div>
  )
}
