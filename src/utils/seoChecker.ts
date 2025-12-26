/* eslint-disable node/prefer-global/process */
export interface SEOCheckResult {
    score: number;
    issues: string[];
    recommendations: string[];
    passed: string[];
}

export class SEOChecker {
    static checkPage(): SEOCheckResult {
        const issues: string[] = [];
        const recommendations: string[] = [];
        const passed: string[] = [];
        let score = 100;

        // 检查标题
        const title = document.title;
        if (!title) {
            issues.push('页面缺少标题');
            score -= 20;
        } else if (title.length < 30) {
            recommendations.push('标题长度建议在30-60字符之间');
            score -= 5;
        } else if (title.length > 60) {
            recommendations.push('标题过长，可能在搜索结果中被截断');
            score -= 5;
        } else {
            passed.push('标题长度合适');
        }

        // 检查描述
        const description = document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content');
        if (!description) {
            issues.push('页面缺少描述');
            score -= 15;
        } else if (description.length < 120) {
            recommendations.push('描述长度建议在120-160字符之间');
            score -= 5;
        } else if (description.length > 160) {
            recommendations.push('描述过长，可能在搜索结果中被截断');
            score -= 5;
        } else {
            passed.push('描述长度合适');
        }

        // 检查关键词
        const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
        if (!keywords) {
            recommendations.push('建议添加关键词标签');
            score -= 5;
        } else {
            passed.push('已设置关键词');
        }

        // 检查 H1 标签
        const h1Tags = document.querySelectorAll('h1');
        if (h1Tags.length === 0) {
            issues.push('页面缺少H1标签');
            score -= 15;
        } else if (h1Tags.length > 1) {
            recommendations.push('页面有多个H1标签，建议只使用一个');
            score -= 5;
        } else {
            passed.push('H1标签使用正确');
        }

        // 检查图片 alt 属性
        const images = document.querySelectorAll('img');
        let imagesWithoutAlt = 0;
        images.forEach(img => {
            if (!img.getAttribute('alt')) {
                imagesWithoutAlt++;
            }
        });
        if (imagesWithoutAlt > 0) {
            recommendations.push(`${imagesWithoutAlt}张图片缺少alt属性`);
            score -= Math.min(imagesWithoutAlt * 2, 10);
        } else if (images.length > 0) {
            passed.push('所有图片都有alt属性');
        }

        // 检查 Open Graph 标签
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');

        if (!ogTitle || !ogDescription || !ogImage) {
            recommendations.push('建议完善Open Graph标签以优化社交媒体分享');
            score -= 5;
        } else {
            passed.push('Open Graph标签完整');
        }

        // 检查结构化数据
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        if (!structuredData) {
            recommendations.push('建议添加结构化数据以提升搜索引擎理解');
            score -= 5;
        } else {
            passed.push('已添加结构化数据');
        }

        // 检查 canonical 链接
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            recommendations.push('建议添加canonical链接防止重复内容');
            score -= 5;
        } else {
            passed.push('已设置canonical链接');
        }

        // 检查多语言标签
        const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
        if (hreflangTags.length === 0) {
            recommendations.push('建议添加多语言标签');
            score -= 3;
        } else {
            passed.push('已设置多语言标签');
        }

        return {
            score: Math.max(0, score),
            issues,
            recommendations,
            passed
        };
    }

    static generateReport(): string {
        const result = this.checkPage();
        let report = `SEO检查报告\n`;
        report += `=================\n`;
        report += `总分: ${result.score}/100\n\n`;

        if (result.issues.length > 0) {
            report += `严重问题 (${result.issues.length}):\n`;
            result.issues.forEach((issue, index) => {
                report += `${index + 1}. ${issue}\n`;
            });
            report += '\n';
        }

        if (result.recommendations.length > 0) {
            report += `优化建议 (${result.recommendations.length}):\n`;
            result.recommendations.forEach((rec, index) => {
                report += `${index + 1}. ${rec}\n`;
            });
            report += '\n';
        }

        if (result.passed.length > 0) {
            report += `已通过检查 (${result.passed.length}):\n`;
            result.passed.forEach((pass, index) => {
                report += `${index + 1}. ${pass}\n`;
            });
        }

        return report;
    }
}

// 在开发环境中自动检查 SEO
if (process.env.NODE_ENV === 'development') {
    // 页面加载完成后检查 SEO
    if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const result = SEOChecker.checkPage();
                if (result.score < 80) {
                    console.group('🔍 SEO检查结果');
                    console.log(SEOChecker.generateReport());
                    console.groupEnd();
                }
            }, 1000);
        });
    }
}
