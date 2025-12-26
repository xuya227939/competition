import type { Config } from 'vike/types';

// This config defines the default properties for all pages
export default {
  // Enable client-side routing
  clientRouting: true,
  hydrationCanBeAborted: true,
  passToClient: ['pageProps', 'initialState', 'lang', 'data'],
  // Enable prerendering for static deployment
  prerender: true
} satisfies Config;
