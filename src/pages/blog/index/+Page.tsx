import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import intl from 'react-intl-universal';
import { useI18nStore } from '@/store/i18nStore';
import { BlogPosts } from '@/constants/blogPosts';

export function Page() {
    return (
        <>
            <PageSEO pageKey="blog" />
            <MainLayout>
                <BlogPage />
            </MainLayout>
        </>
    );
}

// 博客分类
const categories = [{ id: '3d', name: { 'zh-CN': '3D', en: '3D', ja: '3D', ko: '3D', hi: '3D' } }];

function BlogPage() {
    const { lang } = useI18nStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // 过滤文章
    const filteredPosts: any = BlogPosts.filter(post => {
        console.log('%c Line:34 🥟 post.title[lang as keyof typeof post.title]', 'color:#465975', post.title[lang as keyof typeof post.title]);

        const matchesSearch =
            // @ts-ignore
            post.title[lang as keyof typeof post.title].toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt[lang as keyof typeof post.excerpt].toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        // @ts-ignore
        const matchesCategory = selectedCategory ? post.category[lang] === categories.find(cat => cat.id === selectedCategory)?.name[lang] : true;

        return matchesSearch && matchesCategory;
    });

    // 格式化日期
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(lang === 'zh_CN' ? 'zh-CN' : lang === 'en' ? 'en-US' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang === 'hi' ? 'hi-IN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="relative transition-colors duration-300 md:container lg:container">
            {/* Hero Section */}
            <motion.section className="pt-12 pb-0" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="">
                    <div className="text-center">
                        <motion.h1
                            className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {intl.get('blog.title', 'Meshivo 3D 博客')}
                        </motion.h1>
                        <motion.p
                            className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {intl.get('blog.description', '探索关于 Meshivo 3D 的最新文章、指南和教程')}
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Main Content */}
            <section className="py-16">
                <div className="mx-auto">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Main Content */}
                        <div>
                            {/* Featured Post */}
                            {filteredPosts.length > 0 && (
                                <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                                    <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{intl.get('blog.featured', '精选文章')}</h2>
                                    <div className="overflow-hidden rounded-md bg-white shadow-lg dark:bg-[#262626]">
                                        <div className="relative h-80 w-full">
                                            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-[#262626]"></div>
                                            {/* 实际项目中替换为真实图片 */}
                                            <img
                                                // @ts-ignore
                                                alt={filteredPosts[0].title[lang as any]}
                                                loading="lazy"
                                                decoding="async"
                                                data-nimg="fill"
                                                className="object-cover"
                                                sizes="100vw"
                                                srcSet={filteredPosts[0].image}
                                                style={{
                                                    position: 'absolute',
                                                    height: '100%',
                                                    width: '100%',
                                                    inset: '0px',
                                                    color: 'transparent'
                                                }}
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="mb-4 flex items-center">
                                                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    {filteredPosts[0].category[lang as any]}
                                                </span>
                                                <span className="ml-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {formatDate(filteredPosts[0].date)}
                                                </span>
                                            </div>
                                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{filteredPosts[0].title[lang as any]}</h3>
                                            <p className="mb-6 text-gray-600 dark:text-gray-300">{filteredPosts[0].excerpt[lang as any]}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{filteredPosts[0].author}</span>
                                                </div>
                                                <a
                                                    href={`/blog/${filteredPosts[0].id}` as any}
                                                    className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    {intl.get('blog.readMore', '阅读更多')}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Blog Posts Grid */}
                            <div>
                                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{intl.get('blog.latestPosts', '最新文章')}</h2>
                                {filteredPosts.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p className="text-gray-600 dark:text-gray-400">{intl.get('blog.noResults', '没有找到匹配的文章')}</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {filteredPosts.slice(1).map(
                                            (
                                                post: {
                                                    id: string;
                                                    category: string;
                                                    date: string;
                                                    title: string;
                                                    excerpt: string;
                                                    image: string;
                                                },
                                                index: number
                                            ) => (
                                                <motion.div
                                                    key={post.id}
                                                    className="overflow-hidden rounded-md bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-[#262626]"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        delay: 0.2 + index * 0.1,
                                                        duration: 0.6
                                                    }}
                                                >
                                                    <div className="relative h-48 w-full">
                                                        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-[#262626]"></div>
                                                        {/* 实际项目中替换为真实图片 */}
                                                        <img
                                                            alt={post.title[lang as any]}
                                                            loading="lazy"
                                                            decoding="async"
                                                            data-nimg="fill"
                                                            className="object-cover"
                                                            sizes="100vw"
                                                            srcSet={post.image}
                                                            style={{
                                                                position: 'absolute',
                                                                height: '100%',
                                                                width: '100%',
                                                                inset: '0px',
                                                                color: 'transparent'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="p-6">
                                                        <div className="mb-3 flex items-center">
                                                            <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                {post.category[lang as any]}
                                                            </span>
                                                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{formatDate(post.date)}</span>
                                                        </div>
                                                        <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{post.title[lang as any]}</h3>
                                                        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{post.excerpt[lang as any]}</p>
                                                        <a
                                                            href={`/blog/${post.id}` as any}
                                                            className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            {intl.get('blog.readMore', '阅读更多')}
                                                            <ArrowRight className="ml-1 h-3 w-3" />
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
