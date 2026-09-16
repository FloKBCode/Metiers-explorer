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
