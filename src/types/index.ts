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
// par métier ROME (converti en FAP côté France Travail). On ne type que les
// champs qu'on utilise réellement. Forme vérifiée le 22/09 en observant une
// vraie réponse (Accept: application/json — sans cet en-tête l'API renvoie
// du XML) : ce n'est PAS un salaire médian unique mais, par période, une
// ligne par sous-catégorie d'activité de la famille professionnelle, chacune
// avec 3 montants (codeNomenclature SAL1/SAL2/SAL3 = débutant/expérimenté/
// moyen, déduit de l'ordre des valeurs et du libellé de l'indicateur).
export interface SalaireValeurMontant {
  codeNomenclature?: string;
  valeurPrincipaleMontant?: number;
}

export interface ValeurPeriodeIndicateur {
  codeActivite?: string;
  libActivite?: string;
  codePeriode?: string;
  libPeriode?: string;
  salaireValeurMontant?: SalaireValeurMontant[];
}

export interface IndicateurSalaire {
  libIndicateur?: string;
  valeursParPeriode?: ValeurPeriodeIndicateur[];
}
