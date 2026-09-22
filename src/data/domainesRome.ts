// Les codes ROME 4.0 commencent par une lettre qui identifie l'un des 14
// "grands domaines professionnels" du référentiel France Travail (ex :
// N2211 -> "N" -> Transport et logistique). C'est un classement fixe et
// public, donc pas besoin d'appel API pour l'utiliser côté client — idée
// reprise du filtre par domaine que Marly avait commencé sur sa branche.
export const GRANDS_DOMAINES_ROME: Record<string, string> = {
  A: 'Agriculture, pêche, espaces naturels et espaces verts, soins aux animaux',
  B: "Arts et façonnage d'ouvrages d'art",
  C: 'Banque, assurance, immobilier',
  D: 'Commerce, vente et grande distribution',
  E: 'Communication, média et multimédia',
  F: 'Construction, bâtiment et travaux publics',
  G: 'Hôtellerie-restauration, tourisme, loisirs et animation',
  H: 'Industrie',
  I: 'Installation et maintenance',
  J: 'Santé',
  K: 'Services à la personne et à la collectivité',
  L: 'Spectacle',
  M: 'Support à l’entreprise',
  N: 'Transport et logistique',
}

export function domaineDuCode(codeRome: string): string | undefined {
  const lettre = codeRome.trim().charAt(0).toUpperCase()
  return GRANDS_DOMAINES_ROME[lettre]
}
