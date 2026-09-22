import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Metier } from '../types';
import { CarteMetier } from '../components/CarteMetier';
import { AsyncBoundary } from '../components/AsyncBoundary';

function MetiersListe() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState('');
  const [domaineSelectionne, setDomaineSelectionne] = useState('');
  const etat = useFetch<Metier[]>('/rome/v1/metiers');

  const handleVoirFiche = (code: string) => {
    navigate(`/metiers/${code}`);
  };

  const domaines = useMemo(() => {
    if (etat.status !== 'success') return [];
    const uniques = new Set(etat.data.map((m) => m.domaine).filter(Boolean));
    return Array.from(uniques) as string[];
  }, [etat]);

  return (
    <section>
      <h1>Liste des métiers</h1>
      <AsyncBoundary state={etat} loadingMessage="Chargement des métiers...">
        {(metiers) => {
          const metiersFiltres = metiers.filter((m) => {
            const correspondRecherche = m.libelle.toLowerCase().includes(recherche.toLowerCase());
            const correspondDomaine = domaineSelectionne === '' || m.domaine === domaineSelectionne;
            return correspondRecherche && correspondDomaine;
          });

          return (
            <>
              <input
                type="text"
                placeholder="Rechercher un métier..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
              <select
                value={domaineSelectionne}
                onChange={(e) => setDomaineSelectionne(e.target.value)}
              >
                <option value="">Tous les domaines</option>
                {domaines.map((domaine) => (
                  <option key={domaine} value={domaine}>
                    {domaine}
                  </option>
                ))}
              </select>
              {metiersFiltres.length === 0 && (
                <p>Aucun métier ne correspond à ta recherche.</p>
              )}
              <div className="liste-metiers">
                {metiersFiltres.map((metier) => (
                  <CarteMetier
                    key={metier.code}
                    metier={metier}
                    onClick={() => handleVoirFiche(metier.code)}
                  />
                ))}
              </div>
            </>
          );
        }}
      </AsyncBoundary>
    </section>
  );
}

export default MetiersListe;