/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POKEDEX_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
