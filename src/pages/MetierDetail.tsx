import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import type { FicheMetier } from '../types'
import { ROME_FICHES_METIERS_PATH } from '../api/client'

function MetierDetail() {
  // Récupère le paramètre dynamique de l'URL /metiers/:codeRome
  const { codeRome } = useParams<{ codeRome: string }>()
  const navigate = useNavigate()
  const { estFavori, basculerFavori } = useFavoris()
  const state = useFetch<FicheMetier>(codeRome ? `${ROME_FICHES_METIERS_PATH}/${codeRome}` : null)

  return (
    <section>
      {/* Navigation programmée : retour à la page précédente */}
      <button type="button" onClick={() => navigate(-1)}>
        Retour
      </button>

      <AsyncBoundary state={state} loadingMessage="Chargement de la fiche métier…">
        {(fiche) => (
          <>
            <h1>{fiche.metier.libelle}</h1>
            <p>Code ROME : {fiche.code}</p>
            <button
              type="button"
              onClick={() => basculerFavori(fiche.code)}
              aria-pressed={estFavori(fiche.code)}
            >
              {estFavori(fiche.code) ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
            </button>

            {fiche.groupesCompetencesMobilisees && fiche.groupesCompetencesMobilisees.length > 0 && (
              <section>
                <h2>Compétences mobilisées</h2>
                {fiche.groupesCompetencesMobilisees.map((groupe) => (
                  <div key={groupe.enjeu.code}>
                    <h3>{groupe.enjeu.libelle}</h3>
                    <ul>
                      {groupe.competences.map((competence) => (
                        <li key={competence.code}>{competence.libelle}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {fiche.groupesSavoirs && fiche.groupesSavoirs.length > 0 && (
              <section>
                <h2>Savoirs</h2>
                {fiche.groupesSavoirs.map((groupe) => (
                  <div key={groupe.categorieSavoirs.code}>
                    <h3>{groupe.categorieSavoirs.libelle}</h3>
                    <ul>
                      {groupe.savoirs.map((savoir) => (
                        <li key={savoir.code}>{savoir.libelle}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </AsyncBoundary>

      <p>
        <Link to="/metiers">Retour à la liste</Link>
      </p>
    </section>
  )
}

export default MetierDetail
