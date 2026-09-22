import { getAccessToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_FT_API_BASE_URL;

// Chemin de l'API "ROME 4.0 - Fiches métiers" (produit spécifique exposé
// sur api.francetravail.io — cf. francetravail.io/data/api/rome-4-0-fiches-metiers).
// Base URL vérifiée dans la doc Stoplight : /partenaire/rome-fiches-metiers
export const ROME_FICHES_METIERS_PATH = "/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier";

// Liste allégée (code + libellé uniquement) réutilisable par toutes les pages
// qui ont juste besoin de peupler une liste de métiers (liste, formulaire...).
export const ROME_FICHES_METIERS_LISTE_PATH = `${ROME_FICHES_METIERS_PATH}?champs=code,metier(libelle,code)`;

// API "Marché du travail" (stats-offres-demandes-emploi) : salaires médians
// par métier ROME (converti en interne vers une FAP par France Travail),
// à l'échelle nationale. Doc Stoplight vérifiée le 22/09 : GET
// /v1/indicateur/salaire-rome-fap/{codeTypeTerritoire}/{codeTerritoire}?codeRome=...
const MARCHE_TRAVAIL_SALAIRE_PATH = "/partenaire/stats-offres-demandes-emploi/v1/indicateur/salaire-rome-fap";

export function buildSalaireParMetierPath(codeRome: string): string {
  return `${MARCHE_TRAVAIL_SALAIRE_PATH}/NAT/FR?codeRome=${encodeURIComponent(codeRome)}`;
}

function attendre(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Le quota de l'API "Fiches métiers" est très serré (1 appel/seconde sur ce
// type d'abonnement). En cas de 429, l'API renvoie un en-tête Retry-After
// (en secondes) — la doc France Travail recommande explicitement de
// l'utiliser pour réessayer plutôt que d'abandonner tout de suite.
const NB_TENTATIVES_MAX = 3;

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getAccessToken();

  for (let tentative = 1; tentative <= NB_TENTATIVES_MAX; tentative++) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 429 && tentative < NB_TENTATIVES_MAX) {
      const retryAfter = Number(response.headers.get('Retry-After')) || 1;
      await attendre(retryAfter * 1000);
      continue;
    }

    if (!response.ok) {
      throw new Error(`Erreur API (${response.status}): ${response.statusText}`);
    }

    return response.json();
  }

  throw new Error('Erreur API : trop de requêtes (429), réessaie plus tard.');
}
