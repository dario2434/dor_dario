// Shim para permitir imports de archivos .vue
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Permitir imports de archivos JSON
declare module '*.json' {
  const value: unknown;
  export default value;
}

// Extender ImportMeta para Vite
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

