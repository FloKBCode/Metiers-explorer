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

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    // ⚠️ Scope à confirmer : une fois ton appli souscrite à "ROME 4.0 –
    // Fiches métiers" sur francetravail.io (Mes applications), le scope
    // exact est affiché sur la page de l'appli. Le format standard FT est
    // "api_[identifiant-produit][version]", ce qui donne ici a priori
    // "api_romefichesmetiersv1" — à copier-coller depuis ton espace si
    // différent.
    scope: "api_romefichesmetiersv1",
  });

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
