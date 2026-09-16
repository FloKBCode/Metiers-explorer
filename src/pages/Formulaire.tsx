import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { AsyncBoundary } from '../components/AsyncBoundary';
import type { FicheMetier } from '../types';
import { ROME_FICHES_METIERS_LISTE_PATH } from '../api/client';

export default function Formulaire() {
  const [codeMetier, setCodeMetier] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();
  const state = useFetch<FicheMetier[]>(ROME_FICHES_METIERS_LISTE_PATH);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!codeMetier) {
      setErreur('Merci de sélectionner un métier.');
      return;
    }

    setErreur('');
    navigate(`/metiers/${codeMetier}`);
  }

  return (
    <div className="page-formulaire">
      <h1>Choisir un métier à consulter</h1>

      <AsyncBoundary state={state} loadingMessage="Chargement de la liste des métiers…">
        {(fiches) => (
          <form onSubmit={handleSubmit} className="formulaire-selection">
            <div>
              <label htmlFor="metier">Métier</label>
              <select
                id="metier"
                value={codeMetier}
                onChange={(e) => setCodeMetier(e.target.value)}
              >
                <option value="">-- Choisir un métier --</option>
                {fiches.map((fiche) => (
                  <option key={fiche.code} value={fiche.code}>
                    {fiche.metier.libelle}
                  </option>
                ))}
              </select>
            </div>

            {erreur && (
              <p role="alert" className="erreur">
                {erreur}
              </p>
            )}

            <button type="submit">Voir la fiche métier</button>
          </form>
        )}
      </AsyncBoundary>
    </div>
  );
}
