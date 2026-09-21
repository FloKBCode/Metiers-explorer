import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Metier } from '../types';
import { CarteMetier } from '../components/CarteMetier';

function MetiersListe() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState('');
  const etat = useFetch<Metier[]>('/rome/v1/metiers');

  const handleVoirFiche = (code: string) => {
    navigate(`/metiers/${code}`);
  };

  if (etat.status === 'idle' || etat.status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (etat.status === 'error') {
    return <p>Erreur : {etat.error}</p>;
  }

  const metiersFiltres = etat.data.filter((m) =>
    m.libelle.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <section>
      <h1>Liste des métiers</h1>
      <input
        type="text"
        placeholder="Rechercher un métier..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
      <div className="liste-metiers">
        {metiersFiltres.map((metier) => (
          <CarteMetier
            key={metier.code}
            metier={metier}
            onClick={() => handleVoirFiche(metier.code)}
          />
        ))}
      </div>
    </section>
  );
}

export default MetiersListe;