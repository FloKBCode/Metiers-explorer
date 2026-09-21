import type { Metier } from '../types';

interface MetierCompareCardProps {
  metier: Metier;
}

export default function MetierCompareCard({ metier }: MetierCompareCardProps) {
  return (
    <div className="metier-compare-card">
      <h3>{metier.libelle}</h3>
      <p className="metier-code">Code ROME : {metier.codeRome}</p>
    </div>
  );
}