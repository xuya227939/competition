import type { PageContextServer } from 'vike/types';
import blogData from '../data';
import { i18nStore } from '@/store/i18nStore';

export async function data(pageContext: PageContextServer) {
    // Get the current locale from the i18n store
    const locale = i18nStore.getState().lang || 'en';
    
    // Get blog posts for the current locale
    const posts = blogData[locale] || blogData.en;
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return {
        posts: sortedPosts,
        locale
    };
}
