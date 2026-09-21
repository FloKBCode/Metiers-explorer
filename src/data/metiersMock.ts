import type { Metier } from '../types/Metier';

// Données factices en attendant le vrai hook de récupération de Florence.
// Même forme que l'API réelle attendra : à retirer une fois le hook branché.
export const metiersMock: Metier[] = [
  {
    code: 'M1805',
    libelle: 'Études et développement informatique',
    description: 'Conception et développement de logiciels et applications.',
    domaineProfessionnel: 'Informatique et télécommunications',
    competencesCles: ['Développement web', 'Algorithmique', 'Travail en équipe'],
  },
  {
    code: 'M1802',
    libelle: "Expertise et support en systèmes d'information",
    description: 'Support technique et expertise sur les systèmes informatiques.',
    domaineProfessionnel: 'Informatique et télécommunications',
    competencesCles: ['Diagnostic technique', 'Relation client'],
  },
  {
    code: 'M1806',
    libelle: 'Conseil et maîtrise d\'ouvrage en systèmes d\'information',
    description: "Accompagnement des projets informatiques côté métier.",
    domaineProfessionnel: 'Informatique et télécommunications',
    competencesCles: ['Analyse de besoin', 'Gestion de projet'],
  },
];