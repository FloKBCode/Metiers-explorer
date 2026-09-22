import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { AsyncBoundary } from '../components/AsyncBoundary'
import { useFavoris } from '../context/FavorisContext'
import type { FicheMetier, IndicateurSalaire } from '../types'
import { ROME_FICHES_METIERS_LISTE_PATH, apiFetch, buildSalaireParMetierPath } from '../api/client'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

// Un métier ROME "a un salaire disponible" si l'API "Marché du travail"
// renvoie au moins une ligne avec des montants pour la famille professionnelle
// associée. Beaucoup de métiers n'ont aucune correspondance côté France
// Travail : plutôt que de bloquer sur une erreur, on considère juste qu'ils
// n'ont pas de salaire disponible.
async function aUnSalaireDisponible(codeRome: string): Promise<boolean> {
  try {
    const donnees = await apiFetch<IndicateurSalaire>(buildSalaireParMetierPath(codeRome))
    return (donnees.valeursParPeriode ?? []).some(
      (ligne) => (ligne.salaireValeurMontant?.length ?? 0) > 0,
    )
  } catch {
    return false
  }
}

function MetiersListe() {
  const navigate = useNavigate()
  const { estFavori, basculerFavori } = useFavoris()
  const state = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH)
  const [recherche, setRecherche] = useState('')
  const [filtreSalaire, setFiltreSalaire] = useState(false)
  const [salairesConnus, setSalairesConnus] = useState<Record<string, boolean>>({})
  const [verifProgress, setVerifProgress] = useState<{ fait: number; total: number } | null>(null)
  const verificationEnCours = useRef(false)

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

  const fichesChargees = state.status === 'success' ? state.data : null

  // Quand le filtre "salaire disponible" est actif, on vérifie (une seule
  // fois par code, en série pour respecter le quota de l'API) les métiers
  // actuellement affichés par la recherche qu'on n'a pas encore vérifiés.
  useEffect(() => {
    if (!filtreSalaire || !fichesChargees) return
    if (verificationEnCours.current) return

    // Plusieurs appellations de la liste partagent le même code ROME (une
    // fiche = souvent plusieurs intitulés de métier) : on déduplique par
    // code avant d'interroger l'API, pour ne pas revérifier 5 fois le même
    // salaire.
    const codesDejaConnus = new Set(Object.keys(salairesConnus))
    const codesAVerifier: string[] = []
    for (const fiche of filtrerFiches(fichesChargees)) {
      if (!codesDejaConnus.has(fiche.code)) {
        codesDejaConnus.add(fiche.code)
        codesAVerifier.push(fiche.code)
      }
    }
    if (codesAVerifier.length === 0) return

    let annule = false
    verificationEnCours.current = true
    setVerifProgress({ fait: 0, total: codesAVerifier.length })

    ;(async () => {
      for (let i = 0; i < codesAVerifier.length; i++) {
        if (annule) return
        const code = codesAVerifier[i]
        const disponible = await aUnSalaireDisponible(code)
        if (annule) return
        setSalairesConnus((precedent) => ({ ...precedent, [code]: disponible }))
        setVerifProgress({ fait: i + 1, total: codesAVerifier.length })
      }
      setVerifProgress(null)
    })().finally(() => {
      verificationEnCours.current = false
    })

    return () => {
      annule = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtreSalaire, recherche, fichesChargees])

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
                  Vérification des salaires disponibles… {verifProgress.fait}/{verifProgress.total}
                  {recherche.trim() === '' && ' (cherche un intitulé pour aller plus vite)'}
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
