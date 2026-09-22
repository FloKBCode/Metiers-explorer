import { Link } from 'react-router-dom'
import { NetworkGraphic } from '../components/graphics/NetworkGraphic'

const ETAPES = [
  {
    titre: 'Découvrir des métiers',
    texte: "Explore les métiers de la nomenclature ROME et leurs univers professionnels.",
  },
  {
    titre: 'Rechercher précisément',
    texte: 'Trouve un métier par son intitulé ou son code ROME grâce au formulaire.',
  },
  {
    titre: 'Analyser ses compétences',
    texte: 'Chaque fiche détaille les savoirs et compétences mobilisés par le métier.',
  },
  {
    titre: 'Comparer deux métiers',
    texte: 'Mets deux fiches côte à côte pour repérer leurs points communs.',
  },
]

function Home() {
  return (
    <>
      <section className="hero">
        <NetworkGraphic variant="hero" />
        <div className="container">
          {/* Le panneau a un fond plein : le motif réseau reste toujours en
              arrière-plan, jamais derrière le texte (évite les collisions
              de couleur, ex. un point corail sous un mot en corail). */}
          <div className="hero__panel">
            <p className="eyebrow">Atlas des métiers · référentiel ROME 4.0</p>
            <h1>
              Trouve le métier <mark>qui te ressemble.</mark>
            </h1>
            <p>
              Explore les métiers du référentiel ROME, découvre les compétences qui y sont
              associées et compare-les entre eux, à partir des données ouvertes de France
              Travail.
            </p>
            <div className="hero__actions">
              <Link to="/metiers" className="btn btn-primary">
                Explorer les métiers
              </Link>
              <Link to="/comparateur" className="btn btn-secondary">
                Comparer deux métiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="feature-grid">
          {ETAPES.map((etape, i) => (
            <div className="feature-grid__item" key={etape.titre}>
              <span className="feature-grid__index">0{i + 1}</span>
              <h3>{etape.titre}</h3>
              <p>{etape.texte}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
