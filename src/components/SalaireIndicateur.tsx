import { useFetch } from '../hooks/useFetch'
import { buildSalaireParMetierPath } from '../api/client'
import type { IndicateurSalaire } from '../types'

interface SalaireIndicateurProps {
  codeRome: string
}

/**
 * Salaire médian national pour un métier, depuis l'API France Travail
 * "Marché du travail" (données par FAP, converties depuis le code ROME côté
 * France Travail). C'est un indicateur bonus : si l'appel échoue (scope pas
 * encore activé sur le compte, métier sans donnée FAP...), on reste discret
 * plutôt que d'afficher une grosse erreur rouge sur la fiche.
 */
export function SalaireIndicateur({ codeRome }: SalaireIndicateurProps) {
  const state = useFetch<IndicateurSalaire>(buildSalaireParMetierPath(codeRome))

  if (state.status === 'idle' || state.status === 'loading') {
    return (
      <div className="card salaire-card">
        <h4>Salaire médian (France entière)</h4>
        <p className="salaire-card__loading">Chargement…</p>
      </div>
    )
  }

  if (state.status === 'error') {
    // Indicateur bonus : pas de gros encart rouge, mais on garde le detail
    // visible en petit pour pouvoir diagnostiquer sans rouvrir les DevTools.
    return (
      <div className="card salaire-card">
        <h4>Salaire médian (France entière)</h4>
        <p className="salaire-card__empty">Indisponible : {state.error}</p>
      </div>
    )
  }

  const entree = state.data.listeValeursParPeriode?.find(
    (v) => typeof v.valeurPrincipaleMontant === 'number',
  )

  if (!entree || entree.valeurPrincipaleMontant === undefined) {
    return (
      <div className="card salaire-card">
        <h4>Salaire médian (France entière)</h4>
        <p className="salaire-card__empty">Donnée indisponible pour ce métier.</p>
      </div>
    )
  }

  return (
    <div className="card salaire-card">
      <h4>Salaire médian (France entière)</h4>
      <p className="salaire-card__montant">
        {Math.round(entree.valeurPrincipaleMontant).toLocaleString('fr-FR')} € brut / mois
      </p>
      {entree.libPeriode && <p className="salaire-card__periode">{entree.libPeriode}</p>}
      <p className="salaire-card__source">
        Source : France Travail — Marché du travail (médiane nationale, EQTP).
      </p>
    </div>
  )
}
