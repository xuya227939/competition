import { useI18nStore } from '@/store/i18nStore';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, SITE_INFO, generateStructuredData } from '@/utils/seoConfig';

interface PageSEOProps {
    pageKey: string;
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string[];
    customImage?: string;
}

export function PageSEO({ pageKey, customTitle, customDescription, customKeywords, customImage }: PageSEOProps) {
    const { lang } = useI18nStore();
    const locale = lang === 'zh_CN' ? 'zh_CN' : 'en';
    
    // Get SEO data from config
    const seoData = SEO_CONFIG[pageKey];
    
    if (!seoData) {
        console.warn(`SEO config not found for page: ${pageKey}`);
        return null;
    }

    // Use custom values if provided, otherwise use config
    const title = customTitle || seoData.title[locale];
    const description = customDescription || seoData.description[locale];
    const keywords = customKeywords || seoData.keywords[locale];
    const ogImage = customImage || seoData.ogImage || SITE_INFO.defaultImage;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : SITE_INFO.url;

    // Generate structured data
    const structuredData = generateStructuredData(pageKey, locale);

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content={seoData.ogType || 'website'} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={SITE_INFO.name} />
            <meta property="og:locale" content={locale === 'zh_CN' ? 'zh_CN' : 'en_US'} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:site" content={SITE_INFO.twitter} />

            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content={SITE_INFO.organization} />
            <link rel="icon" href={SITE_INFO.logo} />

            {/* Language Alternates */}
            <link rel="alternate" hrefLang="zh-CN" href={`${SITE_INFO.url}/zh_CN${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
            <link rel="alternate" hrefLang="en" href={`${SITE_INFO.url}/en${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
            <link rel="alternate" hrefLang="x-default" href={currentUrl} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
