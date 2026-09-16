/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FT_CLIENT_ID: string;
  readonly VITE_FT_CLIENT_SECRET: string;
  readonly VITE_FT_TOKEN_URL: string;
  readonly VITE_FT_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}