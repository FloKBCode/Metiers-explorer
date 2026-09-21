import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Metier } from '../types/Metier';
import type { RequestState } from '../types';
import { metiersMock } from '../data/metiersMock';

export default function Formulaire() {
  const [codeMetier, setCodeMetier] = useState('');
  const [erreur, setErreur] = useState('');
  const [etat, setEtat] = useState<RequestState<Metier[]>>({ status: 'idle' });
  const navigate = useNavigate();

  useEffect(() => {
    setEtat({ status: 'loading' });

    // TODO: remplacer par le vrai hook de Florence (apiFetch<Metier[]>('/metiers'))
    // quand il sera disponible. Le setTimeout simule juste la latence réseau.
    const timer = setTimeout(() => {
      setEtat({ status: 'success', data: metiersMock });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!codeMetier) {
      setErreur('Merci de sélectionner un métier.');
      return;
    }

    setErreur('');
    navigate(`/metiers/${codeMetier}`);
  }

  if (etat.status === 'idle' || etat.status === 'loading') {
    return (
      <div className="page-formulaire">
        <h1>Choisir un métier à consulter</h1>
        <p>Chargement des métiers...</p>
      </div>
    );
  }

  if (etat.status === 'error') {
    return (
      <div className="page-formulaire">
        <h1>Choisir un métier à consulter</h1>
        <p role="alert" className="erreur">{etat.error}</p>
      </div>
    );
  }

  const metiers = etat.data;

  return (
    <div className="page-formulaire">
      <h1>Choisir un métier à consulter</h1>

      <form onSubmit={handleSubmit} className="formulaire-selection">
        <div>
          <label htmlFor="metier">Métier</label>
          <select
            id="metier"
            value={codeMetier}
            onChange={(e) => setCodeMetier(e.target.value)}
          >
            <option value="">-- Choisir un métier --</option>
            {metiers.map((metier) => (
              <option key={metier.code} value={metier.code}>
                {metier.libelle}
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
    </div>
  );
}