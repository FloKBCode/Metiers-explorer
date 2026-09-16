import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <h1>404 — Page introuvable</h1>
      <p>La page que vous cherchez n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </section>
  )
}

export default NotFound