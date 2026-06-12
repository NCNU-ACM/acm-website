/// <reference types="astro/client" />
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

interface Window {
  netlifyIdentity: {
    on: (event: string, callback: (user?: any) => void) => void;
  };
}