import type { Metier } from '../types';

interface MetierCompareCardProps {
  metier: Metier;
}

// ⚠️ Mina : l'API "Fiches métiers" ne renvoie que code + libellé pour un
// métier (pas de description/domaine courts tout faits). Si tu veux plus de
// détail ici, le plus simple est d'appeler la fiche complète (même forme que
// MetierDetail : groupesCompetencesMobilisees / groupesSavoirs) et d'en
// afficher un extrait — dis-moi si tu veux que je te branche ça.
export default function MetierCompareCard({ metier }: MetierCompareCardProps) {
  return (
    <div className="metier-compare-card">
      <h3>{metier.libelle}</h3>
      <p className="metier-code">Code ROME : {metier.codeRome}</p>
    </div>
  );
}
