/* eslint-disable ts/ban-ts-comment */
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vike from 'vike/plugin';
import { plugin as md, Mode } from 'vite-plugin-markdown';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import TurboConsole from 'unplugin-turbo-console/vite';

const timestamp = new Date().getTime();

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api/v1': {
                // target: 'http://localhost:9003',
                target: 'https://test2.api-service.net.cn',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api\/v1/, '')
            }
        }
    },
    base: '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@locales': path.resolve(__dirname, 'src/locales'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@service': path.resolve(__dirname, 'src/service'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@mock': path.resolve(__dirname, 'src/mock'),
            '@store': path.resolve(__dirname, 'src/store')
        }
    },
    assetsInclude: ['**/*.jpg', '**/*.webp', '**/*.md'],
    plugins: [
        TurboConsole(),
        react(),
        vike(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                { src: './public/_redirects', dest: './' }
                // { src: './robots.txt', dest: './' },
                // { src: './sitemap.xml', dest: './' },
                // { src: './llms.txt', dest: './' }
            ]
        }),
        // md({
        //     mode: [Mode.MARKDOWN, Mode.TOC]
        // })
    ],
    css: {
        modules: {
            // css模块化 文件以.module.[css|less|scss]结尾
            generateScopedName: '[name]__[local]___[hash:164:5]',
            hashPrefix: 'prefix'
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        sourcemap: false, // 输出.map文件,默认是false
        rollupOptions: {
            // 入口文件名
            // @ts-ignore
            entryFileNames: `assets/[name].${timestamp}.js`,
            // 块文件名
            // @ts-ignore
            chunkFileNames: `assets/[name]-[hash].${timestamp}.js`,
            // 资源文件名 css 图片等等
            // @ts-ignore
            assetFileNames: `assets/[name]-[hash].${timestamp}.[ext]`,
            // 对项目依赖进行单独打包
            manualChunks: id => {
                if (id.includes('node_modules')) {
                    return 'vandor';
                }
            }
        }
    },
    ssr: {
        noExternal: ['react-intl-universal', 'react-helmet-async']
    }
});
