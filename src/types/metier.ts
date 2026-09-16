// Types TS partagés pour l'appli Métiers Explorer.
// Base à ajuster ensemble une fois la vraie réponse de l'API ROME 4.0 connue
// (Florence, une fois l'intégration API faite).

export interface Metier {
  codeRome: string;
  intitule: string;
  description: string;
  domaine?: string;
}

// Forme générique utilisée par le hook useFetch<T> (Florence)
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}