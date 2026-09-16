import { useState, type FormEvent } from 'react';
import { useFetch } from '../hooks/useFetch';
import { AsyncBoundary } from '../components/AsyncBoundary';
import type { FicheMetier, Metier } from '../types';
import { ROME_FICHES_METIERS_LISTE_PATH } from '../api/client';
import MetierCompareCard from '../components/MetierCompareCard';

export default function Comparateur() {
  const [codeMetier1, setCodeMetier1] = useState('');
  const [codeMetier2, setCodeMetier2] = useState('');
  const [erreur, setErreur] = useState('');
  const [metier1, setMetier1] = useState<Metier | null>(null);
  const [metier2, setMetier2] = useState<Metier | null>(null);
  const state = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH);

  function handleSubmit(event: FormEvent<HTMLFormElement>, fiches: FicheMetier[]) {
    event.preventDefault();

    if (!codeMetier1 || !codeMetier2) {
      setErreur('Merci de sélectionner deux métiers.');
      return;
    }

    if (codeMetier1 === codeMetier2) {
      setErreur('Choisis deux métiers différents pour les comparer.');
      return;
    }

    const f1 = fiches.find((f) => f.code === codeMetier1);
    const f2 = fiches.find((f) => f.code === codeMetier2);

    if (!f1 || !f2) {
      setErreur('Un des métiers sélectionnés est introuvable.');
      return;
    }

    setErreur('');
    setMetier1({ codeRome: f1.code, libelle: f1.metier.libelle });
    setMetier2({ codeRome: f2.code, libelle: f2.metier.libelle });
  }

  return (
    <div className="page-comparateur">
      <h1>Comparateur de métiers</h1>

      <AsyncBoundary state={state} loadingMessage="Chargement de la liste des métiers…">
        {(fiches) => (
          <>
            <form onSubmit={(e) => handleSubmit(e, fiches)} className="formulaire-comparateur">
              <div>
                <label htmlFor="metier1">Premier métier</label>
                <select id="metier1" value={codeMetier1} onChange={(e) => setCodeMetier1(e.target.value)}>
                  <option value="">-- Choisir un métier --</option>
                  {fiches.map((fiche) => (
                    <option key={fiche.code} value={fiche.code}>{fiche.metier.libelle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="metier2">Deuxième métier</label>
                <select id="metier2" value={codeMetier2} onChange={(e) => setCodeMetier2(e.target.value)}>
                  <option value="">-- Choisir un métier --</option>
                  {fiches.map((fiche) => (
                    <option key={fiche.code} value={fiche.code}>{fiche.metier.libelle}</option>
                  ))}
                </select>
              </div>

              {erreur && <p role="alert" className="erreur">{erreur}</p>}

              <button type="submit">Comparer</button>
            </form>

            {metier1 && metier2 && (
              <div className="comparateur-resultats">
                <MetierCompareCard metier={metier1} />
                <MetierCompareCard metier={metier2} />
              </div>
            )}
          </>
        )}
      </AsyncBoundary>
    </div>
  );
}
