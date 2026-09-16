import { getAccessToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_FT_API_BASE_URL;

// Chemin de l'API "ROME 4.0 - Fiches métiers" (produit spécifique exposé
// sur api.francetravail.io — cf. francetravail.io/data/api/rome-4-0-fiches-metiers).
// Base URL vérifiée dans la doc Stoplight : /partenaire/rome-fiches-metiers
export const ROME_FICHES_METIERS_PATH = "/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier";

// Liste allégée (code + libellé uniquement) réutilisable par toutes les pages
// qui ont juste besoin de peupler une liste de métiers (liste, formulaire...).
export const ROME_FICHES_METIERS_LISTE_PATH = `${ROME_FICHES_METIERS_PATH}?champs=code,metier(libelle,code)`;

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getAccessToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}): ${response.statusText}`);
  }

  return response.json();
}
