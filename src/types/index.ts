export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

/**
 * Version "légère" d'un métier (code + libellé), pratique pour les listes,
 * le comparateur, les favoris... Correspond au champ `metier` renvoyé par
 * l'API ROME 4.0 - Fiches métiers.
 */
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

/**
 * Forme brute renvoyée par l'API France Travail "ROME 4.0 - Fiches métiers"
 * (GET /partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier[/{code}]).
 * Voir francetravail.io/data/api/rome-4-0-fiches-metiers/documentation.
 */
export interface FicheMetier {
  code: string;
  obsolete?: boolean;
  dateFin?: string;
  metier: ReferentielItem;
  groupesCompetencesMobilisees?: GroupeCompetencesMobilisees[];
  groupesSavoirs?: GroupeSavoirs[];
}
