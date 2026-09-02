/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK?: string
  readonly VITE_FLAG_USE_PORTAFOLIO?: string
  readonly VITE_FLAG_USE_ENTITY?: string
  readonly VITE_PROFITABILITY_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
