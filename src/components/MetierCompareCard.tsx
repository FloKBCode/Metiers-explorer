import type { Metier } from '../types/metier';

interface MetierCompareCardProps {
  metier: Metier;
}

export default function MetierCompareCard({ metier }: MetierCompareCardProps) {
  return (
    <div className="metier-compare-card">
      <h3>{metier.intitule}</h3>
      <p className="metier-code">Code ROME : {metier.codeRome}</p>

      {metier.domaine && (
        <p><strong>Domaine :</strong> {metier.domaine}</p>
      )}

      <p>{metier.description}</p>
    </div>
  );
}