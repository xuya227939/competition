import { VLink } from '@/components/navigation/VLink';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    // 生成结构化数据
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.href && { item: `https://snapvee.com${item.href}` })
        }))
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>
            <nav aria-label="面包屑导航" className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}>
                <VLink href="/" className="flex items-center transition-colors hover:text-gray-300">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">首页</span>
                </VLink>

                {items.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                        {item.href && !item.current ? (
                            <VLink href={item.href} className="text-gray-400 transition-colors hover:text-gray-300">
                                {item.label}
                            </VLink>
                        ) : (
                            <span className={item.current ? 'font-medium text-white' : 'text-gray-400'} aria-current={item.current ? 'page' : undefined}>
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </nav>
        </>
    );
}
