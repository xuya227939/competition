/**
 * SEO Configuration for Meshivo 3D
 * Centralized SEO metadata for all pages
 */

export interface SEOMetadata {
    title: {
        zh_CN: string;
        en: string;
    };
    description: {
        zh_CN: string;
        en: string;
    };
    keywords: {
        zh_CN: string[];
        en: string[];
    };
    ogType?: string;
    ogImage?: string;
}

// 网站基础信息
export const SITE_INFO = {
    name: 'Meshivo 3D',
    url: 'https://www.meshivo.com',
    logo: 'https://oss.api-service.net.cn/mesh/images/logo.png',
    defaultImage: 'https://oss.api-service.net.cn/mesh/images/logo.png',
    organization: 'NeonBit',
    twitter: '@meshivo3d'
};

// 核心关键词
export const CORE_KEYWORDS = {
    zh_CN: ['Meshivo 3D', 'AI 3D生成', '文本生成3D模型', 'AI 3D建模', '智能3D创作平台', '3D模型生成工具', 'AI驱动3D建模', '3D打印', '文字转3D模型', 'AI 3D编辑器'],
    en: [
        'Meshivo 3D',
        'AI 3D generation',
        'Text to 3D model',
        'AI 3D modeling',
        'AI-powered 3D creation platform',
        '3D model generator',
        'AI-driven 3D modeling',
        '3D Print',
        'Text-to-3D converter',
        'AI 3D editor'
    ]
};

// 页面 SEO 配置
export const SEO_CONFIG: Record<string, SEOMetadata> = {
    // 首页
    landing: {
        title: {
            zh_CN: 'Meshivo 3D - AI驱动的3D建模平台 | 文本生成3D模型 | 3D打印',
            en: 'Meshivo 3D - AI-Powered 3D Modeling Platform | Text to 3D Model | 3D Print'
        },
        description: {
            zh_CN: 'Meshivo 3D是领先的AI 3D生成平台，支持文本生成3D模型、智能材质匹配、一键优化。适用于游戏开发、影视制作、建筑设计、3D打印等领域。免费试用AI驱动的3D建模工具。',
            en: 'Meshivo 3D is a leading AI 3D generation platform supporting text-to-3D models, smart material matching, and one-click optimization. Perfect for game development, film production, architectural design, and 3D printing. Try our AI-powered 3D modeling tool for free.'
        },
        keywords: {
            zh_CN: [...CORE_KEYWORDS.zh_CN, '智能材质匹配', '多格式导出', '风格定制', '游戏开发3D模型', '影视制作3D资产', '建筑设计3D模型', '3D场景生成'],
            en: [
                ...CORE_KEYWORDS.en,
                'Smart material matching',
                'Multi-format export',
                'Style customization',
                'Game development 3D models',
                'Film production 3D assets',
                'Architectural design 3D models',
                '3D scene generation'
            ]
        },
        ogType: 'website'
    },

    // 博客列表
    blog: {
        title: {
            zh_CN: 'Meshivo 3D 博客 - AI 3D建模教程、指南和最佳实践',
            en: 'Meshivo 3D Blog - AI 3D Modeling Tutorials, Guides & Best Practices'
        },
        description: {
            zh_CN: '探索Meshivo 3D博客，获取AI 3D生成教程、3D建模技巧、行业应用案例和最佳实践。学习如何使用AI创建高质量3D模型，提升3D创作效率。',
            en: 'Explore Meshivo 3D blog for AI 3D generation tutorials, 3D modeling tips, industry use cases, and best practices. Learn how to create high-quality 3D models with AI and boost your 3D creation efficiency.'
        },
        keywords: {
            zh_CN: ['Meshivo 3D博客', 'AI 3D教程', '3D建模指南', '3D建模技巧', 'AI 3D生成教程', '3D模型创作', '3D打印教程'],
            en: ['Meshivo 3D blog', 'AI 3D tutorials', '3D modeling guide', '3D modeling tips', 'AI 3D generation tutorials', '3D model creation', '3D printing tutorials']
        },
        ogType: 'website'
    },

    // 社区
    community: {
        title: {
            zh_CN: '造物集 - Meshivo 3D 社区 | 3D模型分享与创作',
            en: 'Community - Meshivo 3D | 3D Model Sharing & Creation'
        },
        description: {
            zh_CN: '加入Meshivo 3D社区，发现和分享AI生成的3D模型。浏览创作者作品，获取灵感，下载高质量3D资源。支持游戏开发、3D打印、数字艺术等多种应用。',
            en: 'Join Meshivo 3D community to discover and share AI-generated 3D models. Browse creator works, get inspired, and download high-quality 3D resources. Support game development, 3D printing, digital art, and more.'
        },
        keywords: {
            zh_CN: ['3D模型社区', 'AI生成3D模型', '3D资源分享', '3D模型下载', '创作者社区', '3D打印模型'],
            en: ['3D model community', 'AI-generated 3D models', '3D resource sharing', '3D model download', 'Creator community', '3D printing models']
        },
        ogType: 'website'
    },

    // 文件转换器
    fileConverter: {
        title: {
            zh_CN: '3D模型格式转换器 - 免费在线转换 GLB、FBX、OBJ等格式',
            en: '3D Model Format Converter - Free Online GLB, FBX, OBJ Conversion'
        },
        description: {
            zh_CN: '免费在线3D模型格式转换工具，支持GLB、FBX、OBJ、STL、DAE等主流格式互转。本地处理，保护隐私，保持模型质量。适用于游戏开发、3D打印、建模工作流。',
            en: 'Free online 3D model format converter supporting GLB, FBX, OBJ, STL, DAE, and more. Local processing, privacy protection, quality preservation. Perfect for game development, 3D printing, and modeling workflows.'
        },
        keywords: {
            zh_CN: ['3D格式转换', 'GLB转换', 'FBX转换', 'OBJ转换', '3D模型转换器', '在线3D转换', '3D打印格式转换'],
            en: ['3D format conversion', 'GLB converter', 'FBX converter', 'OBJ converter', '3D model converter', 'Online 3D conversion', '3D print format conversion']
        },
        ogType: 'website'
    },

    // 模型压缩
    modelCompression: {
        title: {
            zh_CN: '3D模型压缩工具 - 智能压缩优化3D文件大小',
            en: '3D Model Compression Tool - Smart Compression & Optimization'
        },
        description: {
            zh_CN: '智能3D模型压缩工具，AI驱动的压缩算法，在保持视觉质量的同时最大化减少文件大小。支持GLB、FBX、OBJ等格式，本地处理，数据安全。',
            en: 'Smart 3D model compression tool with AI-driven algorithms. Maximize file size reduction while maintaining visual quality. Supports GLB, FBX, OBJ formats. Local processing, data security.'
        },
        keywords: {
            zh_CN: ['3D模型压缩', '模型优化', '3D文件压缩', 'GLB压缩', '模型减面', '3D优化工具'],
            en: ['3D model compression', 'Model optimization', '3D file compression', 'GLB compression', 'Polygon reduction', '3D optimization tool']
        },
        ogType: 'website'
    },

    // 在线查看器
    onlineViewer: {
        title: {
            zh_CN: '免费在线3D查看器 - GLB、FBX、OBJ模型预览工具',
            en: 'Free Online 3D Viewer - GLB, FBX, OBJ Model Preview Tool'
        },
        description: {
            zh_CN: '免费在线3D模型查看器，支持GLB、FBX、OBJ、STL等格式。快速加载，流畅预览，本地处理保护隐私。适用于3D模型检查、3D打印预览、设计审查。',
            en: 'Free online 3D model viewer supporting GLB, FBX, OBJ, STL formats. Fast loading, smooth preview, local processing for privacy. Perfect for 3D model inspection, 3D print preview, and design review.'
        },
        keywords: {
            zh_CN: ['3D查看器', 'GLB查看器', '在线3D预览', '3D模型查看', 'FBX预览', 'OBJ查看器', '3D打印预览'],
            en: ['3D viewer', 'GLB viewer', 'Online 3D preview', '3D model viewer', 'FBX preview', 'OBJ viewer', '3D print preview']
        },
        ogType: 'website'
    },

    // 价格页
    price: {
        title: {
            zh_CN: 'Meshivo 3D 价格 - AI 3D建模订阅套餐',
            en: 'Meshivo 3D Pricing - AI 3D Modeling Subscription Plans'
        },
        description: {
            zh_CN: '查看Meshivo 3D订阅套餐和价格。提供免费试用、基础版和专业版，满足不同需求。享受AI 3D生成、智能材质匹配、多格式导出等功能。',
            en: 'View Meshivo 3D subscription plans and pricing. Free trial, Basic, and Pro plans available. Enjoy AI 3D generation, smart material matching, multi-format export, and more.'
        },
        keywords: {
            zh_CN: ['Meshivo 3D价格', 'AI 3D建模价格', '3D生成订阅', '3D建模套餐'],
            en: ['Meshivo 3D pricing', 'AI 3D modeling pricing', '3D generation subscription', '3D modeling plans']
        },
        ogType: 'website'
    },

    // FAQ
    faq: {
        title: {
            zh_CN: '常见问题 - Meshivo 3D | AI 3D建模平台',
            en: 'FAQ - Meshivo 3D | AI 3D Modeling Platform'
        },
        description: {
            zh_CN: 'Meshivo 3D常见问题解答。了解AI 3D生成、订阅套餐、功能特性、使用方法等。快速找到您需要的答案。',
            en: 'Meshivo 3D frequently asked questions. Learn about AI 3D generation, subscription plans, features, usage, and more. Find answers quickly.'
        },
        keywords: {
            zh_CN: ['Meshivo 3D FAQ', 'AI 3D生成问题', '3D建模帮助', '使用教程'],
            en: ['Meshivo 3D FAQ', 'AI 3D generation questions', '3D modeling help', 'Usage guide']
        },
        ogType: 'website'
    }
};

// 生成结构化数据
export function generateStructuredData(pageKey: string, locale: string = 'zh_CN') {
    const baseData: any = {
        '@context': 'https://schema.org',
        '@graph': [
            // 网站信息
            {
                '@type': 'WebSite',
                '@id': `${SITE_INFO.url}/#website`,
                url: SITE_INFO.url,
                name: SITE_INFO.name,
                description: SEO_CONFIG[pageKey]?.description[locale as 'zh_CN' | 'en'] || '',
                publisher: {
                    '@id': `${SITE_INFO.url}/#organization`
                }
            },
            // 组织信息
            {
                '@type': 'Organization',
                '@id': `${SITE_INFO.url}/#organization`,
                name: SITE_INFO.name,
                url: SITE_INFO.url,
                logo: {
                    '@type': 'ImageObject',
                    url: SITE_INFO.logo
                },
                sameAs: []
            }
        ]
    };

    // 根据页面类型添加特定的结构化数据
    if (pageKey === 'blog') {
        baseData['@graph'].push({
            '@type': 'Blog',
            '@id': `${SITE_INFO.url}/blog/#blog`,
            url: `${SITE_INFO.url}/blog`,
            name: `${SITE_INFO.name} Blog`,
            description: SEO_CONFIG.blog.description[locale as 'zh_CN' | 'en']
        });
    }

    return baseData;
}
