import { useNavigate } from 'react-router-dom'
import type { Metier } from '../types/metier'

// Données de démo le temps que Florence branche l'API et que Marly fasse
// la vraie page liste (recherche, filtres, composants réutilisables).
const METIERS_DEMO: Metier[] = [
  {
    codeRome: 'M1805',
    intitule: 'Études et développement informatique',
    description: 'Conception et développement de logiciels et applications.',
  },
  {
    codeRome: 'M1802',
    intitule: 'Expertise et support en systèmes d\'information',
    description: 'Support technique et expertise sur les systèmes informatiques.',
  },
]

function MetiersListe() {
  const navigate = useNavigate()

  // Navigation programmée : au clic, on redirige vers la fiche détail
  // (route avec paramètre :codeRome)
  const handleVoirFiche = (codeRome: string) => {
    navigate(`/metiers/${codeRome}`)
  }

  return (
    <section>
      <h1>Liste des métiers</h1>
      <p>(Page provisoire — la vraie liste avec recherche/filtres sera faite par Marly)</p>
      <ul>
        {METIERS_DEMO.map((metier) => (
          <li key={metier.codeRome}>
            <span>{metier.intitule}</span>
            <button type="button" onClick={() => handleVoirFiche(metier.codeRome)}>
              Voir la fiche
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MetiersListe