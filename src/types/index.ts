export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

export interface Metier {
  codeRome: string;
  libelle: string;
}

export interface ReferentielItem {
  code: string;
  libelle: string;
}

export interface GroupeCompetencesMobilisees {
  enjeu: ReferentielItem;
  competences: ReferentielItem[];
}

export interface GroupeSavoirs {
  categorieSavoirs: ReferentielItem;
  savoirs: ReferentielItem[];
}

export interface FicheMetier {
  code: string;
  obsolete?: boolean;
  dateFin?: string;
  metier: ReferentielItem;
  groupesCompetencesMobilisees?: GroupeCompetencesMobilisees[];
  groupesSavoirs?: GroupeSavoirs[];
}

// API "Marché du travail" (stats-offres-demandes-emploi) — indicateur salaire
// médian par métier ROME. On ne type que les champs qu'on utilise réellement,
// la réponse complète a beaucoup plus de champs (cf. doc Stoplight).
export interface ValeurPeriodeIndicateur {
  codeActivite?: string;
  libActivite?: string;
  libPeriode?: string;
  valeurPrincipaleNom?: string;
  valeurPrincipaleMontant?: number;
}

export interface IndicateurSalaire {
  libIndicateur?: string;
  libTerritoire?: string;
  listeValeursParPeriode?: ValeurPeriodeIndicateur[];
}
