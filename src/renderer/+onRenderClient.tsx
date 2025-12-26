import { hydrateRoot } from 'react-dom/client';
import { PageShell } from './PageShell';
import { i18nStore } from '@/store/i18nStore';
import { userStore } from '@/store/userStore';
import type { PageContextClient } from './types';



// Refined onRenderClient
let root: any;
export async function onRenderClient(pageContext: PageContextClient) {
    const { Page, pageProps, initialState } = pageContext;
    
    if (pageContext.isHydration) {
        if (initialState) {
             i18nStore.setState(state => ({ ...state, ...initialState.i18n }));
             
             // CRITICAL: Read token from localStorage FIRST before any setState
             // This ensures we don't overwrite the token with empty server state
             let tokenFromStorage = '';
             if (typeof window !== 'undefined') {
                 try {
                     const stored = localStorage.getItem('mesh-auth');
                     if (stored) {
                         const parsed = JSON.parse(stored);
                         tokenFromStorage = parsed?.state?.meshToken || '';
                     }
                 } catch (error) {
                     console.error('Failed to read token from localStorage:', error);
                 }
             }
             
             // Now set state: use token from localStorage if available, otherwise use server state
             // But NEVER overwrite a valid localStorage token with empty server state
             userStore.setState(state => {
                 const preservedToken = tokenFromStorage || state.meshToken;
                 return {
                     ...state,
                     // Preserve token from localStorage (client-side source of truth)
                     meshToken: preservedToken,
                     // Merge other fields from server state
                     isLoading: initialState.user.isLoading ?? state.isLoading,
                     userInfor: initialState.user.userInfor ?? state.userInfor,
                     isPayLoading: initialState.user.isPayLoading ?? state.isPayLoading,
                     isDonwloadLoading: initialState.user.isDonwloadLoading ?? state.isDonwloadLoading,
                     payUrl: initialState.user.payUrl ?? state.payUrl
                 };
             });
             
             // Initialize stores on client before hydration
             await Promise.all([
                 i18nStore.getState().prepareI18n(),
                 userStore.getState().prepareUserStore()
             ]);
        }
    }

    const container = document.getElementById('root')!;
    if (pageContext.isHydration) {
        root = hydrateRoot(
            container,
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>
        );
    } else {
        if (!root) {
            // Should not happen if hydration happened first, but for safety
            const { createRoot } = await import('react-dom/client');
            root = createRoot(container);
        }
        root.render(
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>
        );
    }
}


