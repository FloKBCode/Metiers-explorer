import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import type { FicheMetier } from '../types'
import { ROME_FICHES_METIERS_LISTE_PATH } from '../api/client'

function Favoris() {
  const { state, basculerFavori } = useFavoris()
  const requeteListe = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH)
  const aDesFavoris = state.codes.length > 0

  return (
    <section className="container">
      <div className="page-header">
        <p className="eyebrow">Mes favoris</p>
        <h1>Métiers favoris</h1>
        <p>Retrouve ici les métiers que tu as mis de côté pendant ton exploration.</p>
      </div>

      {!aDesFavoris ? (
        <div className="empty-state">
          <p>Tu n'as pas encore de favoris.</p>
          <Link to="/metiers" className="btn btn-primary">
            Explorer les métiers
          </Link>
        </div>
      ) : (
        <AsyncBoundary state={requeteListe} loadingMessage="Chargement de tes favoris…">
          {(fiches) => {
            const favoris = fiches.filter((fiche) => state.codes.includes(fiche.code))

            if (favoris.length === 0) {
              return <p className="empty-state">Tes métiers favoris ne sont plus disponibles.</p>
            }

            return (
              <ul className="metiers-grid">
                {favoris.map((fiche) => (
                  <li key={fiche.code} className="card metier-card">
                    <div>
                      <p className="metier-card__code">{fiche.code}</p>
                      <h3 className="metier-card__title">{fiche.metier.libelle}</h3>
                    </div>
                    <div className="metier-card__actions">
                      <Link to={`/metiers/${fiche.code}`} className="btn btn-secondary">
                        Voir la fiche
                      </Link>
                      <button
                        type="button"
                        className="btn btn-favori"
                        aria-pressed="true"
                        onClick={() => basculerFavori(fiche.code)}
                      >
                        ★ Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          }}
        </AsyncBoundary>
      )}
    </section>
  )
}

export default Favoris
