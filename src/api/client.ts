import { getAccessToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_FT_API_BASE_URL;

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