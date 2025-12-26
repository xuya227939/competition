/* eslint-disable react/no-array-index-key */
import MainLayout from '@/components/layouts/mainLayout';
import { Markdown } from '@/components/markdown';
import { Dot } from 'lucide-react';
import { Fragment } from 'react';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { useI18nStore } from '@/store/i18nStore';
import { usePageContext } from '@/renderer/usePageContext';
import { PageSEO } from '@/components/seo/pageSEO';

export function Page() {
    const { lang } = useI18nStore();
    const pageContext = usePageContext();
    const data = pageContext.data as {
        post: any;
        locale: string;
        attributes: any;
        markdown: string;
    };

    if (!data || !data.post) {
        return (
            <>
                <PageSEO pageKey="blog" />
                <MainLayout>
                    <div className="px-4 py-12 md:container lg:container">
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-bold text-white">博客文章未找到</h1>
                            <a href="/blog" className="text-purple-400 hover:text-purple-300">
                                返回博客列表
                            </a>
                        </div>
                    </div>
                </MainLayout>
            </>
        );
    }

    const { attributes, markdown, post } = data;

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // @ts-ignore
        return date.toLocaleDateString(lang === 'zh_CN' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang === 'hi' ? 'hi-IN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const date = formatDate(attributes.date);

    const breadcrumbItems = [
        // @ts-ignore
        { label: lang === 'zh_CN' ? '博客' : lang === 'ja' ? 'ブログ' : lang === 'ko' ? '블로그' : lang === 'hi' ? 'ब्लॉग' : 'Blog', href: '/blog' },
        { label: attributes.title, current: true }
    ];

    return (
        <MainLayout>
            <PageSEO pageKey="blog" customTitle={`${attributes.title} | Meshivo 3D Blog`} customDescription={attributes.description} customKeywords={attributes.tags} customImage={post.image} />
            <div className="mt-12 md:container lg:container">
                <Breadcrumb items={breadcrumbItems} className="mb-12 hidden md:flex lg:flex" />
                <h1 className="text-center text-4xl font-bold text-white">{attributes.title}</h1>
                <div className="mt-4 flex items-center justify-center text-gray-400">
                    <span>{attributes.author}</span> <Dot className="text-gray-400" /> <time dateTime={attributes.date}>{date}</time>
                </div>
                <div className="mt-4 flex items-center justify-center text-gray-400">
                    {attributes.tags.map((tag: string, index: number) => (
                        <Fragment key={index}>
                            <span className="cursor-pointer underline decoration-gray-400 decoration-1 underline-offset-4 transition-colors hover:text-gray-300">{tag}</span>
                            {index < attributes.tags.length - 1 && <Dot className="text-gray-400" />}
                        </Fragment>
                    ))}
                </div>
                <div className="mx-auto max-w-prose">
                    <blockquote className="my-12 border-l-8 border-l-gray-400 pl-4 text-lg text-white">{attributes.description}</blockquote>
                </div>

                <Markdown text={markdown} type="blog" className="mb-12" />
            </div>
        </MainLayout>
    );
}
