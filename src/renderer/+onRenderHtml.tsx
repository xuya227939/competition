import { renderToString } from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import { PageShell } from './PageShell';
import { i18nStore } from '@/store/i18nStore';
import { userStore } from '@/store/userStore';
import type { PageContextServer } from './types';

export async function onRenderHtml(pageContext: PageContextServer) {
    console.log('Start onRenderHtml');
    const { Page, pageProps } = pageContext;

    // Initialize i18n on server - MUST be done before rendering
    const i18nState = i18nStore.getState();

    await i18nState.prepareI18n();

    // Note: prepareUserStore is called on client side in +onRenderClient.tsx
    // because it requires access to localStorage which is not available on server

    // Extract state to pass to client
    // i18nState is already defined above
    const userState = userStore.getState();

    const initialState = {
        i18n: {
            lang: i18nState.lang
        },
        user: {
            meshToken: userState.meshToken,
            isLoading: userState.isLoading,
            userInfor: userState.userInfor,
            isPayLoading: userState.isPayLoading,
            isDonwloadLoading: userState.isDonwloadLoading,
            payUrl: userState.payUrl
        }
    };

    // This Page implementation might need adjustment depending on how pages are defined
    // If Page is a component:
    let pageHtml;
    const helmetContext: any = {};
    pageContext.helmetContext = helmetContext;

    if (Page) {
        pageHtml = renderToString(
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>
        );
    } else {
        pageHtml = '';
    }

    // Get SEO tags from page config or props
    // Also get from Helmet
    const { helmet } = helmetContext;

    const title = helmet?.title?.toString() || (pageContext.config as any).title || 'Mesh Website';
    // helmet?.meta?.toString() returns complete <meta> tags, otherwise build one from config/default
    const metaFromHelmet = helmet?.meta?.toString();
    const description = metaFromHelmet || `<meta name="description" content="${(pageContext.config as any).description || 'Meshivo 3D - AI-powered 3D model generation platform'}" />`;
    const link = helmet?.link?.toString() || '';
    const script = helmet?.script?.toString() || '';

    // Analytics scripts
    const analyticsScripts = `
        <!-- Microsoft Clarity -->
        <script type="text/javascript">
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ue2tpvrjrx");
        </script>
        <!-- Google Analytics -->
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E91T3QGQGT"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-E91T3QGQGT');
        </script>
        <script>window.global = window;</script>
    `;

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(description)}
        ${dangerouslySkipEscape(link)}
        ${dangerouslySkipEscape(script)}
        ${dangerouslySkipEscape(title)}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
        ${dangerouslySkipEscape(analyticsScripts)}
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
            initialState
        }
    };
}
