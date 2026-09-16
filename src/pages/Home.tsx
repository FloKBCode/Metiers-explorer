import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <h1>Métiers Explorer</h1>
      <p>
        Explorez des fiches métiers détaillées et comparez-les entre elles,
        à partir des données ouvertes de l'API ROME 4.0 (France Travail).
      </p>
      <Link to="/metiers">Voir la liste des métiers</Link>
    </section>
  )
}

export default Home