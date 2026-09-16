import { useState, type FormEvent } from 'react';
import type { Metier } from '../types/metier';
import MetierCompareCard from '../components/MetierCompareCard';

// TODO: remplacer par la vraie liste de métiers venant du Context/hook de Florence
const metiersDisponibles: Metier[] = [];

export default function Comparateur() {
  const [codeMetier1, setCodeMetier1] = useState('');
  const [codeMetier2, setCodeMetier2] = useState('');
  const [erreur, setErreur] = useState('');
  const [metier1, setMetier1] = useState<Metier | null>(null);
  const [metier2, setMetier2] = useState<Metier | null>(null);

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

    const m1 = metiersDisponibles.find((m) => m.codeRome === codeMetier1);
    const m2 = metiersDisponibles.find((m) => m.codeRome === codeMetier2);

    if (!m1 || !m2) {
      setErreur('Un des métiers sélectionnés est introuvable.');
      return;
    }

    setErreur('');
    setMetier1(m1);
    setMetier2(m2);
  }

  return (
    <div className="page-comparateur">
      <h1>Comparateur de métiers</h1>

      <form onSubmit={handleSubmit} className="formulaire-comparateur">
        <div>
          <label htmlFor="metier1">Premier métier</label>
          <select
            id="metier1"
            value={codeMetier1}
            onChange={(e) => setCodeMetier1(e.target.value)}
          >
            <option value="">-- Choisir un métier --</option>
            {metiersDisponibles.map((metier) => (
              <option key={metier.codeRome} value={metier.codeRome}>
                {metier.intitule}
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
            {metiersDisponibles.map((metier) => (
              <option key={metier.codeRome} value={metier.codeRome}>
                {metier.intitule}
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