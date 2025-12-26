// 性能优化工具类
export class PerformanceOptimizer {
    // 预加载关键资源
    static preloadCriticalResources() {
        const criticalResources = [
            '/images/logo.png'
            // 可以添加其他关键资源
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.png') || resource.endsWith('.jpg') ? 'image' : 'fetch';
            document.head.appendChild(link);
        });
    }

    // 懒加载图片
    static setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // 预连接到外部域名
    static preconnectExternalDomains() {
        const externalDomains = [
            'https://www.google-analytics.com',
            'https://www.googletagmanager.com',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    // 优化字体加载
    static optimizeFontLoading() {
        // 预加载关键字体
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = '/fonts/main.woff2'; // 根据实际字体路径调整
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }

    // 初始化所有优化
    static init() {
        if (typeof window !== 'undefined') {
            // DOM 加载完成后执行
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.preloadCriticalResources();
                    this.preconnectExternalDomains();
                    this.optimizeFontLoading();
                });
            } else {
                this.preloadCriticalResources();
                this.preconnectExternalDomains();
                this.optimizeFontLoading();
            }

            // 页面加载完成后执行
            window.addEventListener('load', () => {
                this.setupLazyLoading();
            });
        }
    }
}

// 自动初始化
PerformanceOptimizer.init();
