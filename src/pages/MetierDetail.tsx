import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import { NetworkGraphic } from '../components/graphics/NetworkGraphic'
import type { FicheMetier } from '../types'
import { ROME_FICHES_METIERS_PATH } from '../api/client'

function MetierDetail() {
  // Récupère le paramètre dynamique de l'URL /metiers/:codeRome
  const { codeRome } = useParams<{ codeRome: string }>()
  const navigate = useNavigate()
  const { estFavori, basculerFavori } = useFavoris()
  const state = useFetch<FicheMetier>(codeRome ? `${ROME_FICHES_METIERS_PATH}/${codeRome}` : null)

  return (
    <section className="container fiche-metier">
      {/* Navigation programmée : retour à la page précédente */}
      <button type="button" className="btn btn-ghost fiche-metier__back" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <AsyncBoundary state={state} loadingMessage="Chargement de la fiche métier…">
        {(fiche) => (
          <>
            <header className="fiche-metier__header">
              <div>
                <p className="eyebrow">Métier · ROME {fiche.code}</p>
                <div className="fiche-metier__title-row">
                  <h1>{fiche.metier.libelle}</h1>
                  <button
                    type="button"
                    className="btn btn-favori"
                    onClick={() => basculerFavori(fiche.code)}
                    aria-pressed={estFavori(fiche.code)}
                  >
                    {estFavori(fiche.code) ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
                  </button>
                </div>
              </div>
              <div className="fiche-metier__map" aria-hidden="true">
                <NetworkGraphic variant="compact" />
              </div>
            </header>

            {fiche.groupesCompetencesMobilisees && fiche.groupesCompetencesMobilisees.length > 0 && (
              <section className="fiche-metier__section">
                <h2>Compétences mobilisées</h2>
                {fiche.groupesCompetencesMobilisees.map((groupe) => (
                  <div key={groupe.enjeu.code} className="card fiche-metier__group">
                    <h4>{groupe.enjeu.libelle}</h4>
                    <div className="fiche-metier__tags">
                      {groupe.competences.map((competence) => (
                        <span key={competence.code} className="tag tag-competence">
                          {competence.libelle}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {fiche.groupesSavoirs && fiche.groupesSavoirs.length > 0 && (
              <section className="fiche-metier__section">
                <h2>Savoirs</h2>
                {fiche.groupesSavoirs.map((groupe) => (
                  <div key={groupe.categorieSavoirs.code} className="card fiche-metier__group">
                    <h4>{groupe.categorieSavoirs.libelle}</h4>
                    <div className="fiche-metier__tags">
                      {groupe.savoirs.map((savoir) => (
                        <span key={savoir.code} className="tag tag-savoir">
                          {savoir.libelle}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </AsyncBoundary>

      <div className="fiche-metier__footer">
        <Link to="/metiers" className="btn btn-secondary">
          ← Retour à la liste
        </Link>
      </div>
    </section>
  )
}

export default MetierDetail
