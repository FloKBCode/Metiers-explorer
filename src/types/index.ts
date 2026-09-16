export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

export interface Metier {
  code: string;
  libelle: string;
  // à compléter selon la vraie forme de la réponse de l'API ROME
}