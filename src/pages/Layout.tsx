import { NavLink, Outlet } from 'react-router-dom'

function BrandMark() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="2.6" fill="var(--color-corail)" />
      <circle cx="6" cy="8" r="1.6" fill="var(--color-vert)" />
      <circle cx="22" cy="9" r="1.6" fill="var(--color-bleu)" />
      <circle cx="21" cy="20" r="1.6" fill="var(--color-violet)" />
      <g stroke="var(--color-paper)" strokeWidth="0.8" opacity="0.9">
        <line x1="14" y1="14" x2="6" y2="8" />
        <line x1="14" y1="14" x2="22" y2="9" />
        <line x1="14" y1="14" x2="21" y2="20" />
      </g>
    </svg>
  )
}

function Layout() {
  return (
    <div className="app-layout">
      <header className="site-header">
        <div className="container">
          <NavLink to="/" end className="brand">
            <span className="brand__mark">
              <BrandMark />
            </span>
            Atlas des métiers
          </NavLink>

          <nav className="site-nav" aria-label="Navigation principale">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Accueil
            </NavLink>
            <NavLink to="/metiers" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Explorer
            </NavLink>
            <NavLink to="/formulaire" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Rechercher
            </NavLink>
            <NavLink to="/comparateur" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Comparer
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        {/* Outlet : affiche la page correspondant à la route active */}
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Atlas des métiers — Projet Bachelor 2 React/TypeScript, à partir des données ROME 4.0 (France Travail).</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
