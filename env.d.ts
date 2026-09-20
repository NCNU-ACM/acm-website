/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface Window {
  netlifyIdentity: {
    on: (event: string, callback: (user?: any) => void) => void;
  };
}