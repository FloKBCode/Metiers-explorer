import { useState, type FormEvent } from 'react';
import { useFetch } from '../hooks/useFetch';
import { AsyncBoundary } from '../components/AsyncBoundary';
import { ComparateurResultats } from '../components/ComparateurResultats';
import type { FicheMetier } from '../types';
import { ROME_FICHES_METIERS_LISTE_PATH, ROME_FICHES_METIERS_PATH } from '../api/client';

export default function Comparateur() {
  const [codeMetier1, setCodeMetier1] = useState('');
  const [codeMetier2, setCodeMetier2] = useState('');
  const [erreur, setErreur] = useState('');
  const [codesConfirmes, setCodesConfirmes] = useState<[string, string] | null>(null);

  const state = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH);
  const state1 = useFetch<FicheMetier>(
    codesConfirmes ? `${ROME_FICHES_METIERS_PATH}/${codesConfirmes[0]}` : null,
  );
  const state2 = useFetch<FicheMetier>(
    codesConfirmes ? `${ROME_FICHES_METIERS_PATH}/${codesConfirmes[1]}` : null,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!codeMetier1 || !codeMetier2) {
      setErreur('Merci de sélectionner deux métiers.');
      return;
    }

    if (codeMetier1 === codeMetier2) {
      setErreur('Choisis deux métiers différents pour les comparer.');
      return;
    }

    setErreur('');
    setCodesConfirmes([codeMetier1, codeMetier2]);
  }

  return (
    <div className="container page-comparateur">
      <div className="page-header">
        <p className="eyebrow">Comparer</p>
        <h1>Comparateur de métiers</h1>
        <p>Choisis deux métiers pour comparer leurs savoirs et compétences mobilisées, et repérer ce qu'ils ont en commun.</p>
      </div>

      <AsyncBoundary state={state} loadingMessage="Chargement de la liste des métiers…">
        {(fiches) => (
          <form onSubmit={handleSubmit} className="formulaire-comparateur card">
            <div className="formulaire-comparateur__fields">
              <div className="field">
                <label htmlFor="metier1">Premier métier</label>
                <select
                  id="metier1"
                  className="input"
                  value={codeMetier1}
                  onChange={(e) => setCodeMetier1(e.target.value)}
                >
                  <option value="">-- Choisir un métier --</option>
                  {fiches.map((fiche) => (
                    <option key={fiche.code} value={fiche.code}>{fiche.metier.libelle}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="metier2">Deuxième métier</label>
                <select
                  id="metier2"
                  className="input"
                  value={codeMetier2}
                  onChange={(e) => setCodeMetier2(e.target.value)}
                >
                  <option value="">-- Choisir un métier --</option>
                  {fiches.map((fiche) => (
                    <option key={fiche.code} value={fiche.code}>{fiche.metier.libelle}</option>
                  ))}
                </select>
              </div>
            </div>

            {erreur && <p role="alert" className="erreur">{erreur}</p>}

            <button type="submit" className="btn btn-primary">Comparer</button>
          </form>
        )}
      </AsyncBoundary>

      {codesConfirmes && <ComparateurResultats state1={state1} state2={state2} />}
    </div>
  );
}
