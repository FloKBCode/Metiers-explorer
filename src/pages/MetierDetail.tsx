import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Metier } from '../types';

function MetierDetail() {
  const { codeRome } = useParams<{ codeRome: string }>();
  const navigate = useNavigate();
  const etat = useFetch<Metier>(codeRome ? `/rome/v1/metiers/${codeRome}` : null);

  if (etat.status === 'idle' || etat.status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (etat.status === 'error') {
    return <p>Erreur : {etat.error}</p>;
  }

  return (
    <section>
      <h1>{etat.data.libelle}</h1>
      <button type="button" onClick={() => navigate(-1)}>
        Retour
      </button>
    </section>
  );
}

export default MetierDetail;