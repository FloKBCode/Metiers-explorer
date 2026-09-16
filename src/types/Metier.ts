export interface Metier {
  code: string;
  libelle: string;
  description?: string;
  domaineProfessionnel?: string;
  competencesCles?: string[];
}