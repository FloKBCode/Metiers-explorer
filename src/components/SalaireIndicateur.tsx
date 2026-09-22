import { useFetch } from '../hooks/useFetch'
import { buildSalaireParMetierPath } from '../api/client'
import type { IndicateurSalaire, ValeurPeriodeIndicateur } from '../types'

interface SalaireIndicateurProps {
  codeRome: string
}

function montant(ligne: ValeurPeriodeIndicateur, code: string): number | undefined {
  return ligne.salaireValeurMontant?.find((m) => m.codeNomenclature === code)?.valeurPrincipaleMontant
}

function formatMontant(valeur: number | undefined): string | null {
  if (typeof valeur !== 'number') return null
  return `${Math.round(valeur).toLocaleString('fr-FR')} €`
}

/**
 * Salaires observés pour un métier, depuis l'API France Travail "Marché du
 * travail". France Travail ne raisonne pas par métier ROME mais par famille
 * professionnelle (FAP) : un même appel peut renvoyer plusieurs lignes
 * (une par niveau de la famille — employé, technicien, ingénieur...). On
 * met en avant, par ligne, le salaire moyen (gros chiffre) et la fourchette
 * débutant/expérimenté en dessous, plutôt que 3 chiffres à plat de même
 * poids visuel — plus lisible en un coup d'œil.
 * C'est un indicateur bonus : si l'appel échoue (scope pas encore activé,
 * métier sans donnée FAP...), on reste discret plutôt que d'afficher une
 * grosse erreur rouge sur la fiche.
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
      {lignes.length > 1 && (
        <p className="salaire-card__intro">
          France Travail regroupe ce métier avec plusieurs niveaux d'une même famille
          professionnelle :
        </p>
      )}
      <div className="salaire-card__lignes">
        {lignes.map((ligne, index) => {
          const moyen = formatMontant(montant(ligne, 'SAL3'))
          const debutant = formatMontant(montant(ligne, 'SAL1'))
          const experimente = formatMontant(montant(ligne, 'SAL2'))

          return (
            <div className="salaire-card__ligne" key={ligne.codeActivite ?? index}>
              {ligne.libActivite && <p className="salaire-card__activite">{ligne.libActivite}</p>}
              {moyen && (
                <p className="salaire-card__moyen">
                  <strong>{moyen}</strong>
                  <span className="salaire-card__moyen-label">brut / mois en moyenne</span>
                </p>
              )}
              {(debutant || experimente) && (
                <p className="salaire-card__range">
                  {debutant && <>Débutant : {debutant}</>}
                  {debutant && experimente && ' · '}
                  {experimente && <>Expérimenté : {experimente}</>}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {periodeRetenue && <p className="salaire-card__periode">{periodeRetenue}</p>}
      <p className="salaire-card__source">
        Source : France Travail — Marché du travail (brut mensuel, par famille professionnelle).
      </p>
    </div>
  )
}
