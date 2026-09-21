import type { Metier } from '../types/Metier';

interface MetierCompareCardProps {
  metier: Metier;
}

export default function MetierCompareCard({ metier }: MetierCompareCardProps) {
  return (
    <div className="metier-compare-card">
      <h3>{metier.libelle}</h3>
      <p className="metier-code">Code ROME : {metier.code}</p>

      {metier.domaineProfessionnel && (
        <p><strong>Domaine :</strong> {metier.domaineProfessionnel}</p>
      )}

      {metier.description && <p>{metier.description}</p>}

      {metier.competencesCles && metier.competencesCles.length > 0 && (
        <div>
          <strong>Compétences clés :</strong>
          <ul>
            {metier.competencesCles.map((competence) => (
              <li key={competence}>{competence}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}