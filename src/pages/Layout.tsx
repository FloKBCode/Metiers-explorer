import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-layout">
      <header>
        <nav>
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/metiers">Métiers</NavLink>
          <NavLink to="/comparateur">Comparateur</NavLink>
        </nav>
      </header>

      <main>
        {/* Outlet : affiche la page correspondant à la route active */}
        <Outlet />
      </main>

      <footer>
        <p>Métiers Explorer — Bachelor 2 React/TypeScript</p>
      </footer>
    </div>
  )
}

export default Layout