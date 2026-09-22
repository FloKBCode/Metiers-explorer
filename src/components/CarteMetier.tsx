import type { Metier } from '../types';

interface CarteMetierProps {
  metier: Metier;
  onClick?: () => void;
}

export function CarteMetier({ metier, onClick }: CarteMetierProps) {
  return (
    <div
      className="carte-metier"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      <h3>{metier.libelle}</h3>
      {metier.domaine && <p className="domaine">{metier.domaine}</p>}
    </div>
  );
}