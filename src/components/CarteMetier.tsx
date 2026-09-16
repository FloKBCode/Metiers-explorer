import type { Metier } from '../types/Metier';

interface CarteMetierProps {
  metier: Metier;
  onClick?: () => void;
}

export function CarteMetier({ metier, onClick }: CarteMetierProps) {
  return (
    <div className="carte-metier" onClick={onClick}>
      <h3>{metier.libelle}</h3>
      {metier.description && <p>{metier.description}</p>}
    </div>
  );
}