import { Loader } from './Loader'
import { ErrorMessage } from './ErrorMessage'
import MetierCompareCard from './MetierCompareCard'
import type { FicheMetier, ReferentielItem, RequestState } from '../types'

interface ComparateurResultatsProps {
  state1: RequestState<FicheMetier>
  state2: RequestState<FicheMetier>
}

function extraireSavoirs(fiche: FicheMetier): ReferentielItem[] {
  return (fiche.groupesSavoirs ?? []).flatMap((groupe) => groupe.savoirs)
}

function extraireCompetences(fiche: FicheMetier): ReferentielItem[] {
  return (fiche.groupesCompetencesMobilisees ?? []).flatMap((groupe) => groupe.competences)
}

interface ColonneProps {
  fiche: FicheMetier
  codesSavoirsAutre: Set<string>
  codesCompetencesAutre: Set<string>
}

function ColonneComparaison({ fiche, codesSavoirsAutre, codesCompetencesAutre }: ColonneProps) {
  const savoirs = extraireSavoirs(fiche)
  const competences = extraireCompetences(fiche)

  return (
    <div className="card comparateur-colonne">
      <h3>{fiche.metier.libelle}</h3>
      <p className="metier-code">Code ROME : {fiche.code}</p>

      {competences.length > 0 && (
        <div className="comparateur-colonne__section">
          <h4>Compétences mobilisées</h4>
          <div className="fiche-metier__tags">
            {competences.map((competence) => (
              <span
                key={competence.code}
                className={
                  'tag tag-competence' + (codesCompetencesAutre.has(competence.code) ? ' tag--commun' : '')
                }
              >
                {competence.libelle}
              </span>
            ))}
          </div>
        </div>
      )}

      {savoirs.length > 0 && (
        <div className="comparateur-colonne__section">
          <h4>Savoirs</h4>
          <div className="fiche-metier__tags">
            {savoirs.map((savoir) => (
              <span
                key={savoir.code}
                className={'tag tag-savoir' + (codesSavoirsAutre.has(savoir.code) ? ' tag--commun' : '')}
              >
                {savoir.libelle}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** Charge et compare deux fiches métier complètes : savoirs, compétences, et points communs. */
export function ComparateurResultats({ state1, state2 }: ComparateurResultatsProps) {
  if (state1.status === 'loading' || state2.status === 'loading') {
    return <Loader message="Chargement des deux fiches…" />
  }
  if (state1.status === 'error') {
    return <ErrorMessage message={state1.error} />
  }
  if (state2.status === 'error') {
    return <ErrorMessage message={state2.error} />
  }
  if (state1.status !== 'success' || state2.status !== 'success') {
    return null
  }

  const fiche1 = state1.data
  const fiche2 = state2.data

  const savoirs1 = extraireSavoirs(fiche1)
  const savoirs2 = extraireSavoirs(fiche2)
  const competences1 = extraireCompetences(fiche1)
  const competences2 = extraireCompetences(fiche2)

  const codesSavoirs1 = new Set(savoirs1.map((s) => s.code))
  const codesSavoirs2 = new Set(savoirs2.map((s) => s.code))
  const codesCompetences1 = new Set(competences1.map((c) => c.code))
  const codesCompetences2 = new Set(competences2.map((c) => c.code))

  const savoirsCommuns = savoirs1.filter((s) => codesSavoirs2.has(s.code))
  const competencesCommunes = competences1.filter((c) => codesCompetences2.has(c.code))
  const totalCommuns = savoirsCommuns.length + competencesCommunes.length

  return (
    <div className="comparateur-resultats-wrap">
      <div className="comparateur-resultats">
        <MetierCompareCard metier={{ codeRome: fiche1.code, libelle: fiche1.metier.libelle }} />
        <MetierCompareCard metier={{ codeRome: fiche2.code, libelle: fiche2.metier.libelle }} />
      </div>

      <div className="card comparateur-communs">
        <h3>Points communs</h3>
        {totalCommuns === 0 ? (
          <p>Aucun savoir ni compétence en commun entre ces deux fiches.</p>
        ) : (
          <div className="fiche-metier__tags">
            {competencesCommunes.map((competence) => (
              <span key={`c-${competence.code}`} className="tag tag-competence tag--commun">
                {competence.libelle}
              </span>
            ))}
            {savoirsCommuns.map((savoir) => (
              <span key={`s-${savoir.code}`} className="tag tag-savoir tag--commun">
                {savoir.libelle}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="comparateur-colonnes">
        <ColonneComparaison
          fiche={fiche1}
          codesSavoirsAutre={codesSavoirs2}
          codesCompetencesAutre={codesCompetences2}
        />
        <ColonneComparaison
          fiche={fiche2}
          codesSavoirsAutre={codesSavoirs1}
          codesCompetencesAutre={codesCompetences1}
        />
      </div>
    </div>
  )
}
