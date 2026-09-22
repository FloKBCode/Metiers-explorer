import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Metier } from '../types';
import { AsyncBoundary } from '../components/AsyncBoundary';

function MetierDetail() {
  const { codeRome } = useParams<{ codeRome: string }>();
  const navigate = useNavigate();
  const etat = useFetch<Metier>(codeRome ? `/rome/v1/metiers/${codeRome}` : null);

  if (!codeRome) {
    return <p>Aucun métier sélectionné.</p>;
  }

  return (
    <section>
      <AsyncBoundary state={etat} loadingMessage="Chargement de la fiche métier...">
        {(metier) => (
          <>
            <h1>{metier.libelle}</h1>
            {metier.domaine && <p className="domaine">{metier.domaine}</p>}
            <button type="button" onClick={() => navigate(-1)}>
              Retour
            </button>
          </>
        )}
      </AsyncBoundary>
    </section>
  );
}

export default MetierDetail;