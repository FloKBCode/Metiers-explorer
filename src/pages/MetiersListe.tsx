import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import type { FicheMetier } from '../types'
import { ROME_FICHES_METIERS_LISTE_PATH } from '../api/client'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MetiersListe() {
  const navigate = useNavigate()
  const { estFavori, basculerFavori } = useFavoris()
  const state = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH)
  const [recherche, setRecherche] = useState('')

  const handleVoirFiche = (codeRome: string) => {
    navigate(`/metiers/${codeRome}`)
  }

  const filtrerFiches = (fiches: FicheMetier[]) => {
    const terme = recherche.trim().toLowerCase()
    if (!terme) return fiches
    return fiches.filter(
      (fiche) =>
        fiche.metier.libelle.toLowerCase().includes(terme) ||
        fiche.code.toLowerCase().includes(terme),
    )
  }

  return (
    <section className="container">
      <div className="page-header">
        <p className="eyebrow">Explorer</p>
        <h1>Liste des métiers</h1>
        <p>Parcours les fiches métiers du référentiel ROME 4.0, ou cherche un intitulé ou un code.</p>
      </div>

      <AsyncBoundary state={state} loadingMessage="Chargement des métiers…">
        {(fiches) => {
          const resultats = filtrerFiches(fiches)
          return (
            <>
              <div className="metiers-toolbar">
                <div className="search-field" style={{ flex: 1 }}>
                  <SearchIcon />
                  <input
                    type="search"
                    className="input"
                    placeholder="Rechercher un métier ou un code ROME…"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    aria-label="Rechercher un métier"
                  />
                </div>
                <span className="metiers-count">
                  {resultats.length} métier{resultats.length > 1 ? 's' : ''}
                </span>
              </div>

              {resultats.length === 0 ? (
                <p className="empty-state">Aucun métier ne correspond à « {recherche} ».</p>
              ) : (
                <ul className="metiers-grid">
                  {resultats.map((fiche) => (
                    <li key={fiche.code} className="card metier-card">
                      <div>
                        <p className="metier-card__code">{fiche.code}</p>
                        <h3 className="metier-card__title">{fiche.metier.libelle}</h3>
                      </div>
                      <div className="metier-card__actions">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleVoirFiche(fiche.code)}
                        >
                          Voir la fiche
                        </button>
                        <button
                          type="button"
                          className="btn btn-favori"
                          onClick={() => basculerFavori(fiche.code)}
                          aria-pressed={estFavori(fiche.code)}
                        >
                          {estFavori(fiche.code) ? '★ Favori' : '☆ Favoris'}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )
        }}
      </AsyncBoundary>
    </section>
  )
}

export default MetiersListe
