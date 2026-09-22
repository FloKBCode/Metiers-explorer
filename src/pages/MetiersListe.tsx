import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useSalairesDisponibles } from '../hooks/useSalairesDisponibles'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import type { FicheMetier } from '../types'
import { ROME_FICHES_METIERS_LISTE_PATH } from '../api/client'
import { GRANDS_DOMAINES_ROME, domaineDuCode } from '../data/domainesRome'

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
  const [domaine, setDomaine] = useState('')
  const [filtreSalaire, setFiltreSalaire] = useState(true)

  const fichesChargees = state.status === 'success' ? state.data : null

  // Plusieurs appellations de la liste partagent le même code ROME (une
  // fiche = souvent plusieurs intitulés de métier) : on déduplique par code
  // pour ne vérifier chaque salaire qu'une seule fois. La vérification
  // démarre automatiquement dès que la liste est chargée, pas seulement
  // quand on coche le filtre — et grâce au cache du hook, une fois faite
  // elle ne se refait jamais, même après un rechargement de page.
  const codesUniques = useMemo(
    () => (fichesChargees ? Array.from(new Set(fichesChargees.map((f) => f.code))) : []),
    [fichesChargees],
  )
  const { salaires: salairesConnus, progression: verifProgress } = useSalairesDisponibles(codesUniques)

  const handleVoirFiche = (codeRome: string) => {
    navigate(`/metiers/${codeRome}`)
  }

  const filtrerFiches = (fiches: FicheMetier[]) => {
    const terme = recherche.trim().toLowerCase()
    return fiches.filter((fiche) => {
      const correspondRecherche =
        !terme ||
        fiche.metier.libelle.toLowerCase().includes(terme) ||
        fiche.code.toLowerCase().includes(terme)
      const correspondDomaine = !domaine || fiche.code.charAt(0).toUpperCase() === domaine
      return correspondRecherche && correspondDomaine
    })
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
          const resultatsAffiches = filtreSalaire
            ? resultats.filter((fiche) => salairesConnus[fiche.code] === true)
            : resultats

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
                <select
                  className="input metiers-toolbar__domaine"
                  value={domaine}
                  onChange={(e) => setDomaine(e.target.value)}
                  aria-label="Filtrer par domaine professionnel"
                >
                  <option value="">Tous les domaines</option>
                  {Object.entries(GRANDS_DOMAINES_ROME).map(([lettre, libelle]) => (
                    <option key={lettre} value={lettre}>
                      {libelle}
                    </option>
                  ))}
                </select>
                <label className="metiers-toolbar__filtre">
                  <input
                    type="checkbox"
                    checked={filtreSalaire}
                    onChange={(e) => setFiltreSalaire(e.target.checked)}
                  />
                  Salaire disponible uniquement
                </label>
                <span className="metiers-count">
                  {resultatsAffiches.length} métier{resultatsAffiches.length > 1 ? 's' : ''}
                </span>
              </div>

              {verifProgress && (
                <p className="metiers-verif-progress">
                  Vérification des salaires disponibles en tâche de fond… {verifProgress.fait}/
                  {verifProgress.total} (fait une seule fois, mémorisé pour la prochaine visite)
                </p>
              )}

              {resultatsAffiches.length === 0 ? (
                <p className="empty-state">
                  {filtreSalaire && !verifProgress
                    ? 'Aucun métier avec un salaire disponible pour cette recherche.'
                    : `Aucun métier ne correspond à « ${recherche} ».`}
                </p>
              ) : (
                <ul className="metiers-grid">
                  {resultatsAffiches.map((fiche) => (
                    <li key={fiche.code} className="card metier-card">
                      <div>
                        <p className="metier-card__code">
                          {fiche.code}
                          {domaineDuCode(fiche.code) && (
                            <span className="metier-card__domaine"> · {domaineDuCode(fiche.code)}</span>
                          )}
                        </p>
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
