import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import type { FicheMetier } from '../types'
import { ROME_FICHES_METIERS_LISTE_PATH } from '../api/client'

function MetiersListe() {
  const navigate = useNavigate()
  const { estFavori, basculerFavori } = useFavoris()
  const state = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH)

  const handleVoirFiche = (codeRome: string) => {
    navigate(`/metiers/${codeRome}`)
  }

  return (
    <section>
      <h1>Liste des métiers</h1>
      <p>(Recherche/filtres à venir — Marly)</p>
      <AsyncBoundary state={state} loadingMessage="Chargement des métiers…">
        {(fiches) => (
          <ul>
            {fiches.map((fiche) => (
              <li key={fiche.code}>
                <span>{fiche.metier.libelle}</span>
                <button type="button" onClick={() => handleVoirFiche(fiche.code)}>
                  Voir la fiche
                </button>
                <button
                  type="button"
                  onClick={() => basculerFavori(fiche.code)}
                  aria-pressed={estFavori(fiche.code)}
                >
                  {estFavori(fiche.code) ? '★ Favori' : '☆ Ajouter aux favoris'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </AsyncBoundary>
    </section>
  )
}

export default MetiersListe
