import { useState, useEffect, type FormEvent } from 'react';
import type { Metier } from '../types/Metier';
import type { RequestState } from '../types';
import { metiersMock } from '../data/metiersMock';
import MetierCompareCard from '../components/MetierCompareCard';

export default function Comparateur() {
  const [etat, setEtat] = useState<RequestState<Metier[]>>({ status: 'idle' });
  const [codeMetier1, setCodeMetier1] = useState('');
  const [codeMetier2, setCodeMetier2] = useState('');
  const [erreur, setErreur] = useState('');
  const [metier1, setMetier1] = useState<Metier | null>(null);
  const [metier2, setMetier2] = useState<Metier | null>(null);

  useEffect(() => {
    setEtat({ status: 'loading' });

    // TODO: remplacer par le vrai hook de Florence (apiFetch<Metier[]>('/metiers'))
    // quand il sera disponible. Le setTimeout simule juste la latence réseau.
    const timer = setTimeout(() => {
      setEtat({ status: 'success', data: metiersMock });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>, metiers: Metier[]) {
    event.preventDefault();

    if (!codeMetier1 || !codeMetier2) {
      setErreur('Merci de sélectionner deux métiers.');
      return;
    }

    if (codeMetier1 === codeMetier2) {
      setErreur('Choisis deux métiers différents pour les comparer.');
      return;
    }

    const m1 = metiers.find((m) => m.code === codeMetier1);
    const m2 = metiers.find((m) => m.code === codeMetier2);

    if (!m1 || !m2) {
      setErreur('Un des métiers sélectionnés est introuvable.');
      return;
    }

    setErreur('');
    setMetier1(m1);
    setMetier2(m2);
  }

  if (etat.status === 'idle' || etat.status === 'loading') {
    return (
      <div className="page-comparateur">
        <h1>Comparateur de métiers</h1>
        <p>Chargement des métiers...</p>
      </div>
    );
  }

  if (etat.status === 'error') {
    return (
      <div className="page-comparateur">
        <h1>Comparateur de métiers</h1>
        <p role="alert" className="erreur">{etat.error}</p>
      </div>
    );
  }

  const metiers = etat.data;

  return (
    <div className="page-comparateur">
      <h1>Comparateur de métiers</h1>

      <form onSubmit={(e) => handleSubmit(e, metiers)} className="formulaire-comparateur">
        <div>
          <label htmlFor="metier1">Premier métier</label>
          <select
            id="metier1"
            value={codeMetier1}
            onChange={(e) => setCodeMetier1(e.target.value)}
          >
            <option value="">-- Choisir un métier --</option>
            {metiers.map((metier) => (
              <option key={metier.code} value={metier.code}>
                {metier.libelle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="metier2">Deuxième métier</label>
          <select
            id="metier2"
            value={codeMetier2}
            onChange={(e) => setCodeMetier2(e.target.value)}
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

        <button type="submit">Comparer</button>
      </form>

      {metier1 && metier2 && (
        <div className="comparateur-resultats">
          <MetierCompareCard metier={metier1} />
          <MetierCompareCard metier={metier2} />
        </div>
      )}
    </div>
  );
}