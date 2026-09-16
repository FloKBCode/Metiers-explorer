interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.value;
  }

  const clientId = import.meta.env.VITE_FT_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_FT_CLIENT_SECRET;
  const tokenUrl = import.meta.env.VITE_FT_TOKEN_URL;

  if (!clientId || !clientSecret || !tokenUrl) {
    throw new Error("Variables d'environnement API manquantes. Vérifie ton fichier .env");
  }

  const params: Record<string, string> = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  };

  // Scopes requis pour "ROME 4.0 - Fiches métiers" (visibles sur la page
  // "Utiliser l'API" > Client Credentials OAuth Flow, une fois l'API
  // souscrite) : api_rome-fiches-metiersv1 (obligatoire, donne accès à
  // l'API) + nomenclatureRome (obligatoire, donne accès aux libellés du
  // référentiel Métiers utilisés dans les réponses). Surchargeable via
  // VITE_FT_SCOPE dans .env si jamais ça change.
  const scope = import.meta.env.VITE_FT_SCOPE || "api_rome-fiches-metiersv1 nomenclatureRome";
  if (scope) {
    params.scope = scope;
  }

  const body = new URLSearchParams(params);

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`Erreur d'authentification API: ${response.status}`);
  }

  const data: TokenResponse = await response.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: now + (data.expires_in - 60) * 1000, // marge de sécurité de 60s
  };

  return cachedToken.value;
}
