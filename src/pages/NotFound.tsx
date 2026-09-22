import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="container page-notfound">
      <p className="eyebrow">Erreur 404</p>
      <h1>Cette page n'existe pas</h1>
      <p>Le métier ou la page que tu cherches est introuvable.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </section>
  )
}

export default NotFound
