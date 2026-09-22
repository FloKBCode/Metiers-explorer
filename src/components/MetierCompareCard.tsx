import { memo } from 'react';
import type { Metier } from '../types';

interface MetierCompareCardProps {
  metier: Metier;
}

function MetierCompareCard({ metier }: MetierCompareCardProps) {
  return (
    <div className="card metier-compare-card">
      <h3>{metier.libelle}</h3>
      <p className="metier-code">Code ROME : {metier.codeRome}</p>
    </div>
  );
}

export default memo(MetierCompareCard);