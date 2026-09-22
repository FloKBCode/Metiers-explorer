import { useFetch } from '../hooks/useFetch'
import { buildSalaireParMetierPath } from '../api/client'
import type { IndicateurSalaire, ValeurPeriodeIndicateur } from '../types'

interface SalaireIndicateurProps {
  codeRome: string
}

const LIBELLES_NOMENCLATURE: Record<string, string> = {
  SAL1: 'Débutant',
  SAL2: 'Expérimenté',
  SAL3: 'Moyen',
}

function formatMontant(valeur: number | undefined): string | null {
  if (typeof valeur !== 'number') return null
  return `${Math.round(valeur).toLocaleString('fr-FR')} €`
}

/**
 * Salaires observés pour un métier, depuis l'API France Travail "Marché du
 * travail" (données par famille professionnelle, convertie depuis le code
 * ROME côté France Travail). C'est un indicateur bonus : si l'appel échoue
 * (scope pas encore activé sur le compte, métier sans donnée FAP...), on
 * reste discret plutôt que d'afficher une grosse erreur rouge sur la fiche.
 */
export function SalaireIndicateur({ codeRome }: SalaireIndicateurProps) {
  const state = useFetch<IndicateurSalaire>(buildSalaireParMetierPath(codeRome))

  if (state.status === 'idle' || state.status === 'loading') {
    return (
      <div className="card salaire-card">
        <h4>Salaires observés (France entière)</h4>
        <p className="salaire-card__loading">Chargement…</p>
      </div>
    )
  }

  if (state.status === 'error') {
    // Indicateur bonus : pas de gros encart rouge, mais on garde le detail
    // visible en petit pour pouvoir diagnostiquer sans rouvrir les DevTools.
    return (
      <div className="card salaire-card">
        <h4>Salaires observés (France entière)</h4>
        <p className="salaire-card__empty">Indisponible : {state.error}</p>
      </div>
    )
  }

  const toutesLesLignes = state.data.valeursParPeriode ?? []
  const lignesAvecMontants = toutesLesLignes.filter(
    (ligne) => (ligne.salaireValeurMontant?.length ?? 0) > 0,
  )

  if (lignesAvecMontants.length === 0) {
    return (
      <div className="card salaire-card">
        <h4>Salaires observés (France entière)</h4>
        <p className="salaire-card__empty">Donnée indisponible pour ce métier.</p>
      </div>
    )
  }

  // Les lignes sont déjà classées par sous-catégorie d'activité ; on ne
  // garde que la période la plus récente (la première rencontrée).
  const periodeRetenue = lignesAvecMontants[0].libPeriode
  const lignes: ValeurPeriodeIndicateur[] = periodeRetenue
    ? lignesAvecMontants.filter((ligne) => ligne.libPeriode === periodeRetenue)
    : lignesAvecMontants

  return (
    <div className="card salaire-card">
      <h4>Salaires observés (France entière)</h4>
      <div className="salaire-card__lignes">
        {lignes.map((ligne, index) => (
          <div className="salaire-card__ligne" key={ligne.codeActivite ?? index}>
            {ligne.libActivite && <p className="salaire-card__activite">{ligne.libActivite}</p>}
            <div className="salaire-card__montants">
              {ligne.salaireValeurMontant?.map((montant) => {
                const texte = formatMontant(montant.valeurPrincipaleMontant)
                if (!texte) return null
                const label = montant.codeNomenclature
                  ? LIBELLES_NOMENCLATURE[montant.codeNomenclature] ?? montant.codeNomenclature
                  : null
                return (
                  <span className="salaire-card__montant-item" key={montant.codeNomenclature}>
                    <strong>{texte}</strong>
                    {label && <span className="salaire-card__montant-label">{label}</span>}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {periodeRetenue && <p className="salaire-card__periode">{periodeRetenue}</p>}
      <p className="salaire-card__source">
        Source : France Travail — Marché du travail (brut mensuel, par famille professionnelle).
      </p>
    </div>
  )
}
