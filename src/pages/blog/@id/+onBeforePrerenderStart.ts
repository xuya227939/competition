import type { OnBeforePrerenderStartAsync } from 'vike/types';
import { blogData } from '../data';

export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (): ReturnType<OnBeforePrerenderStartAsync> => {
  // Generate URLs for all blog posts (both languages)
  const allPosts = [...blogData.zh, ...blogData.en];
  // Remove duplicates by id
  const uniquePosts = Array.from(new Map(allPosts.map(post => [post.id, post])).values());
  const urls = uniquePosts.map(post => `/blog/${post.id}`);
  return urls;
};
