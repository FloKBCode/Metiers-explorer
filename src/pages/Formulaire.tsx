import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Metier } from '../types/metier';

// TODO: remplacer par la vraie liste de métiers venant du Context/hook de Florence
const metiersDisponibles: Metier[] = [];

export default function Formulaire() {
  const [codeMetier, setCodeMetier] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

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

      <form onSubmit={handleSubmit} className="formulaire-selection">
        <div>
          <label htmlFor="metier">Métier</label>
          <select
            id="metier"
            value={codeMetier}
            onChange={(e) => setCodeMetier(e.target.value)}
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

        <button type="submit">Voir la fiche métier</button>
      </form>
    </div>
  );
}