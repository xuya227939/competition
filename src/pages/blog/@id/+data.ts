import type { PageContextServer } from 'vike/types';
import { BlogPosts } from '@/constants/blogPosts';
import { i18nStore } from '@/store/i18nStore';
import fs from 'fs';
import path from 'path';

// Parse frontmatter from markdown
function parseFrontmatter(content: string) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { attributes: {}, markdown: content };
    }

    const frontmatter = match[1];
    const markdown = match[2];

    // Parse YAML-like frontmatter
    const attributes: any = {};
    const lines = frontmatter.split('\n');
    let currentKey = '';

    for (const line of lines) {
        if (line.trim().startsWith('-')) {
            // Array item
            if (currentKey && Array.isArray(attributes[currentKey])) {
                attributes[currentKey].push(line.trim().substring(1).trim());
            }
        } else if (line.includes(':')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            currentKey = key.trim();

            if (value === '') {
                // Start of array
                attributes[currentKey] = [];
            } else {
                // Remove quotes if present
                attributes[currentKey] = value.replace(/^['"]|['"]$/g, '');
            }
        }
    }

    return { attributes, markdown };
}

export async function data(pageContext: PageContextServer) {
    const { id } = pageContext.routeParams;

    // Find the blog post by ID
    const post = BlogPosts.find(p => p.id === id);

    if (!post) {
        throw new Error(`Blog post with id "${id}" not found`);
    }

    // Get current locale
    const locale = i18nStore.getState().lang || 'en';
    // @ts-ignore
    const lang = locale === 'zh_CN' ? 'zh' : locale === 'ja' ? 'ja' : locale === 'ko' ? 'ko' : locale === 'hi' ? 'hi' : 'en';

    // Try to load markdown file
    let markdownContent = '';
    let attributes: any = {};

    try {
        const markdownPath = path.join(process.cwd(), 'src', 'pages', 'blog', 'data', lang, `${id}.md`);

        if (fs.existsSync(markdownPath)) {
            const fileContent = fs.readFileSync(markdownPath, 'utf-8');
            const parsed = parseFrontmatter(fileContent);
            attributes = parsed.attributes;
            markdownContent = parsed.markdown;
        }
    } catch (error) {
        console.error('Error loading markdown file:', error);
    }

    // Merge attributes with post data
    const mergedAttributes = {
        // @ts-ignore
        title: post.title[locale === 'zh_CN' ? 'zh_CN' : locale === 'ja' ? 'ja' : locale === 'ko' ? 'ko' : locale === 'hi' ? 'hi' : 'en'],
        // @ts-ignore
        description: post.excerpt[locale === 'zh_CN' ? 'zh_CN' : locale === 'ja' ? 'ja' : locale === 'ko' ? 'ko' : locale === 'hi' ? 'hi' : 'en'],
        // @ts-ignore
        category: post.category[locale === 'zh_CN' ? 'zh_CN' : locale === 'ja' ? 'ja' : locale === 'ko' ? 'ko' : locale === 'hi' ? 'hi' : 'en'],
        author: attributes.author || post.author,
        date: attributes.date || post.date,
        tags: attributes.tags || post.tags,
        ...attributes
    };

    return {
        post,
        locale,
        attributes: mergedAttributes,
        // @ts-ignore
        markdown: markdownContent || post.excerpt[locale === 'zh_CN' ? 'zh_CN' : locale === 'ja' ? 'ja' : locale === 'ko' ? 'ko' : locale === 'hi' ? 'hi' : 'en']
    };
}
