import React from 'react';
import { ThemeProvider } from '@/components/theme/provider';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/errorBoundary/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';
import '@/styles/globals.css';
import '@/utils/errors/globalErrorHandler';
// Import these for side effects if needed, though they might be better in onRenderClient
import '@/utils/seoChecker';
import '@/utils/performanceOptimization';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from './types';

export function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  // Error handler for ErrorBoundary
  const handleError = (error: Error) => {
    console.error('PageShell caught error:', error.message);
  };

  const helmetContext = pageContext.helmetContext || {};

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ErrorBoundary onError={handleError}>
          <HelmetProvider context={helmetContext}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              {children}
              <Toaster />
            </ThemeProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </PageContextProvider>
    </React.StrictMode>
  );
}
