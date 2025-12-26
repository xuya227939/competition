import type { Language } from './locale';

export interface SEOConfig {
    title: string;
    description: string;
    keywords: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    structuredData?: any;
}

export interface PageSEOData {
    [key: string]: {
        zh_CN: SEOConfig;
        en: SEOConfig;
        ja: SEOConfig;
        ko: SEOConfig;
        hi: SEOConfig;
    };
}

// 页面级 SEO 配置
export const pageSEOData: PageSEOData = {
    landing: {
        zh_CN: {
            title: 'Meshivo 3D - AI智能3D模型生成器 | 文字一键生成3D模型，让创作触手可及',
            description: 'Meshivo 3D是AI驱动的3D模型生成平台，只需输入文字描述，即可生成高质量3D模型。支持多种风格、智能材质匹配、自动优化，兼容主流3D格式，让3D创作变得简单高效。',
            keywords: 'AI 3D生成器, 文字生成3D模型, 3D建模AI, 智能材质匹配, 3D模型自动优化, AI 3D创作平台, 3D设计工具, Meshivo 3D, 3D模型生成, AI建模软件, 3D导出格式, GLB OBJ FBX',
            ogType: 'website'
        },
        en: {
            title: 'Meshivo 3D - AI-Powered 3D Model Generator | Text-to-3D Creation Made Simple',
            description:
                'Meshivo 3D is an AI-driven 3D model generation platform. Simply input text descriptions to generate high-quality 3D models. Supports multiple styles, intelligent material matching, auto-optimization, and mainstream 3D formats for effortless 3D creation.',
            keywords:
                'AI 3D generator, text to 3D model, AI 3D modeling, intelligent material matching, 3D model auto optimization, AI 3D creation platform, 3D design tool, Meshivo 3D, 3D model generation, AI modeling software, 3D export formats, GLB OBJ FBX',
            ogType: 'website'
        },
        ja: {
            title: 'Meshivo 3D - AI-Powered 3D Model Generator | Text-to-3D Creation Made Simple',
            description:
                'Meshivo 3D is an AI-driven 3D model generation platform. Simply input text descriptions to generate high-quality 3D models. Supports multiple styles, intelligent material matching, auto-optimization, and mainstream 3D formats for effortless 3D creation.',
            keywords:
                'AI 3D generator, text to 3D model, AI 3D modeling, intelligent material matching, 3D model auto optimization, AI 3D creation platform, 3D design tool, Meshivo 3D, 3D model generation, AI modeling software, 3D export formats, GLB OBJ FBX',
            ogType: 'website'
        },
        ko: {
            title: 'Meshivo 3D - AI-Powered 3D Model Generator | Text-to-3D Creation Made Simple',
            description:
                'Meshivo 3D is an AI-driven 3D model generation platform. Simply input text descriptions to generate high-quality 3D models. Supports multiple styles, intelligent material matching, auto-optimization, and mainstream 3D formats for effortless 3D creation.',
            keywords:
                'AI 3D generator, text to 3D model, AI 3D modeling, intelligent material matching, 3D model auto optimization, AI 3D creation platform, 3D design tool, Meshivo 3D, 3D model generation, AI modeling software, 3D export formats, GLB OBJ FBX',
            ogType: 'website'
        },
        hi: {
            title: 'Meshivo 3D - AI-Powered 3D Model Generator | Text-to-3D Creation Made Simple',
            description:
                'Meshivo 3D is an AI-driven 3D model generation platform. Simply input text descriptions to generate high-quality 3D models. Supports multiple styles, intelligent material matching, auto-optimization, and mainstream 3D formats for effortless 3D creation.',
            keywords:
                'AI 3D generator, text to 3D model, AI 3D modeling, intelligent material matching, 3D model auto optimization, AI 3D creation platform, 3D design tool, Meshivo 3D, 3D model generation, AI modeling software, 3D export formats, GLB OBJ FBX',
            ogType: 'website'
        }
    },
    faq: {
        zh_CN: {
            title: '常见问题 - Meshivo 3D 3D生成器使用指南与技术支持',
            description: 'Meshivo 3D 3D生成器常见问题解答，包括AI模型生成、材质匹配、自动优化、导出格式、使用技巧等详细指南和技术支持',
            keywords: 'Meshivo 3D帮助, AI 3D生成器教程, 3D模型生成问题, 材质匹配支持, 3D创作FAQ, Meshivo 3D技术支持, AI建模教程',
            ogType: 'article'
        },
        en: {
            title: 'FAQ - Meshivo 3D 3D Generator Help & Technical Support',
            description:
                'Frequently asked questions about Meshivo 3D 3D generator, including AI model generation, material matching, auto optimization, export formats, usage tips and technical support.',
            keywords: 'Meshivo 3D help, AI 3D generator tutorial, 3D model generation FAQ, material matching support, 3D creation guide, Meshivo 3D technical support, AI modeling tutorial',
            ogType: 'article'
        },
        ja: {
            title: 'FAQ - Meshivo 3D 3D Generator Help & Technical Support',
            description:
                'Frequently asked questions about Meshivo 3D 3D generator, including AI model generation, material matching, auto optimization, export formats, usage tips and technical support.',
            keywords: 'Meshivo 3D help, AI 3D generator tutorial, 3D model generation FAQ, material matching support, 3D creation guide, Meshivo 3D technical support, AI modeling tutorial',
            ogType: 'article'
        },
        ko: {
            title: 'FAQ - Meshivo 3D 3D Generator Help & Technical Support',
            description:
                'Frequently asked questions about Meshivo 3D 3D generator, including AI model generation, material matching, auto optimization, export formats, usage tips and technical support.',
            keywords: 'Meshivo 3D help, AI 3D generator tutorial, 3D model generation FAQ, material matching support, 3D creation guide, Meshivo 3D technical support, AI modeling tutorial',
            ogType: 'article'
        },
        hi: {
            title: 'FAQ - Meshivo 3D 3D Generator Help & Technical Support',
            description:
                'Frequently asked questions about Meshivo 3D 3D generator, including AI model generation, material matching, auto optimization, export formats, usage tips and technical support.',
            keywords: 'Meshivo 3D help, AI 3D generator tutorial, 3D model generation FAQ, material matching support, 3D creation guide, Meshivo 3D technical support, AI modeling tutorial',
            ogType: 'article'
        }
    },
    blog: {
        zh_CN: {
            title: '博客 - AI 3D创作教程与技术分享 | Meshivo 3D',
            description: 'Meshivo 3D博客分享AI 3D模型生成技巧、文字描述编写指南、材质选择优化、风格应用教程等专业3D创作内容与实战经验',
            keywords: 'AI 3D生成教程, 文字描述技巧, 3D材质教程, AI建模优化, 3D风格应用, Meshivo 3D博客, AI 3D创作心得, 3D导出技巧',
            ogType: 'blog'
        },
        en: {
            title: 'Blog - AI 3D Creation Tutorials & Technology Insights | Meshivo 3D',
            description:
                'Meshivo 3D blog shares AI 3D model generation tips, text description writing guides, material selection optimization, style application tutorials and professional 3D creation insights.',
            keywords:
                'AI 3D generation tutorial, text description tips, 3D material tutorial, AI modeling optimization, 3D style application, Meshivo 3D blog, AI 3D creation insights, 3D export tips',
            ogType: 'blog'
        },
        ja: {
            title: 'Blog - AI 3D Creation Tutorials & Technology Insights | Meshivo 3D',
            description:
                'Meshivo 3D blog shares AI 3D model generation tips, text description writing guides, material selection optimization, style application tutorials and professional 3D creation insights.',
            keywords:
                'AI 3D generation tutorial, text description tips, 3D material tutorial, AI modeling optimization, 3D style application, Meshivo 3D blog, AI 3D creation insights, 3D export tips',
            ogType: 'blog'
        },
        ko: {
            title: 'Blog - AI 3D Creation Tutorials & Technology Insights | Meshivo 3D',
            description:
                'Meshivo 3D blog shares AI 3D model generation tips, text description writing guides, material selection optimization, style application tutorials and professional 3D creation insights.',
            keywords:
                'AI 3D generation tutorial, text description tips, 3D material tutorial, AI modeling optimization, 3D style application, Meshivo 3D blog, AI 3D creation insights, 3D export tips',
            ogType: 'blog'
        },
        hi: {
            title: 'Blog - AI 3D Creation Tutorials & Technology Insights | Meshivo 3D',
            description:
                'Meshivo 3D blog shares AI 3D model generation tips, text description writing guides, material selection optimization, style application tutorials and professional 3D creation insights.',
            keywords:
                'AI 3D generation tutorial, text description tips, 3D material tutorial, AI modeling optimization, 3D style application, Meshivo 3D blog, AI 3D creation insights, 3D export tips',
            ogType: 'blog'
        }
    },
    price: {
        zh_CN: {
            title: '价格 - Meshivo 3D 3D生成器价格与套餐选择',
            description: 'Meshivo 3D 3D生成器价格与套餐选择，包括免费、基础、专业套餐，支持月付、季付等多种支付方式',
            keywords: 'Meshivo 3D价格, 3D模型生成器价格, 套餐选择, 支付方式, 月付, 季付',
            ogType: 'article'
        },
        en: {
            title: 'Price - Meshivo 3D 3D Generator Pricing & Package Selection',
            description: 'Meshivo 3D 3D generator pricing and package selection, including free, basic, professional packages, supporting monthly, quarterly.',
            keywords: 'Meshivo 3D price, 3D model generator price, package selection, payment methods, monthly, quarterly',
            ogType: 'article'
        },
        ja: {
            title: 'Price - Meshivo 3D 3D Generator Pricing & Package Selection',
            description: 'Meshivo 3D 3D generator pricing and package selection, including free, basic, professional packages, supporting monthly, quarterly.',
            keywords: 'Meshivo 3D price, 3D model generator price, package selection, payment methods, monthly, quarterly',
            ogType: 'article'
        },
        ko: {
            title: 'Price - Meshivo 3D 3D Generator Pricing & Package Selection',
            description: 'Meshivo 3D 3D generator pricing and package selection, including free, basic, professional packages, supporting monthly, quarterly.',
            keywords: 'Meshivo 3D price, 3D model generator price, package selection, payment methods, monthly, quarterly',
            ogType: 'article'
        },
        hi: {
            title: 'Price - Meshivo 3D 3D Generator Pricing & Package Selection',
            description: 'Meshivo 3D 3D generator pricing and package selection, including free, basic, professional packages, supporting monthly, quarterly.',
            keywords: 'Meshivo 3D price, 3D model generator price, package selection, payment methods, monthly, quarterly',
            ogType: 'article'
        }
    },
    login: {
        zh_CN: {
            title: '用户登录 - Meshivo 3D AI智能3D生成器 | 开启3D创作之旅',
            description: '登录Meshivo 3D，享受AI智能3D模型生成服务。注册即可获得免费配额，升级会员享受更多生成次数和高级功能，让AI驱动的3D创作变得触手可及。',
            keywords: 'Meshivo 3D登录, AI 3D生成器注册, 智能3D建模登录, Meshivo 3D会员, 3D模型生成账户, AI创作平台登录',
            ogType: 'website'
        },
        en: {
            title: 'User Login - Meshivo 3D AI-Powered 3D Generator | Start Your 3D Creation Journey',
            description:
                'Login to Meshivo 3D and enjoy AI-powered 3D model generation services. Sign up for free quotas, upgrade to premium membership for more generations and advanced features, making AI-driven 3D creation accessible to everyone.',
            keywords: 'Meshivo 3D login, AI 3D generator signup, intelligent 3D modeling login, Meshivo 3D membership, 3D model generation account, AI creation platform_login',
            ogType: 'website'
        },
        ja: {
            title: 'User Login - Meshivo 3D AI-Powered 3D Generator | Start Your 3D Creation Journey',
            description:
                'Login to Meshivo 3D and enjoy AI-powered 3D model generation services. Sign up for free quotas, upgrade to premium membership for more generations and advanced features, making AI-driven 3D creation accessible to everyone.',
            keywords: 'Meshivo 3D login, AI 3D generator signup, intelligent 3D modeling login, Meshivo 3D membership, 3D model generation account, AI creation platform_login',
            ogType: 'website'
        },
        ko: {
            title: 'User Login - Meshivo 3D AI-Powered 3D Generator | Start Your 3D Creation Journey',
            description:
                'Login to Meshivo 3D and enjoy AI-powered 3D model generation services. Sign up for free quotas, upgrade to premium membership for more generations and advanced features, making AI-driven 3D creation accessible to everyone.',
            keywords: 'Meshivo 3D login, AI 3D generator signup, intelligent 3D modeling login, Meshivo 3D membership, 3D model generation account, AI creation platform_login',
            ogType: 'website'
        },
        hi: {
            title: 'User Login - Meshivo 3D AI-Powered 3D Generator | Start Your 3D Creation Journey',
            description:
                'Login to Meshivo 3D and enjoy AI-powered 3D model generation services. Sign up for free quotas, upgrade to premium membership for more generations and advanced features, making AI-driven 3D creation accessible to everyone.',
            keywords: 'Meshivo 3D login, AI 3D generator signup, intelligent 3D modeling login, Meshivo 3D membership, 3D model generation account, AI creation platform_login',
            ogType: 'website'
        }
    },
    privacy: {
        zh_CN: {
            title: '隐私政策 - Meshivo 3D 3D生成器隐私政策',
            description: 'Meshivo 3D 3D生成器隐私政策，包括隐私政策、隐私协议、隐私保护等详细指南和技术支持',
            keywords: 'Meshivo 3D隐私政策, 隐私协议, 隐私保护, 隐私政策指南, 隐私保护指南',
            ogType: 'article'
        },
        en: {
            title: 'Privacy Policy - Meshivo 3D 3D Generator Privacy Policy',
            description: 'Meshivo 3D 3D generator privacy policy, including privacy policy, privacy agreement, privacy protection and technical support.',
            keywords: 'Meshivo 3D privacy policy, privacy agreement, privacy protection, privacy policy guide, privacy protection guide',
            ogType: 'article'
        },
        ja: {
            title: 'Privacy Policy - Meshivo 3D 3D Generator Privacy Policy',
            description: 'Meshivo 3D 3D generator privacy policy, including privacy policy, privacy agreement, privacy protection and technical support.',
            keywords: 'Meshivo 3D privacy policy, privacy agreement, privacy protection, privacy policy guide, privacy protection guide',
            ogType: 'article'
        },
        ko: {
            title: 'Privacy Policy - Meshivo 3D 3D Generator Privacy Policy',
            description: 'Meshivo 3D 3D generator privacy policy, including privacy policy, privacy agreement, privacy protection and technical support.',
            keywords: 'Meshivo 3D privacy policy, privacy agreement, privacy protection, privacy policy guide, privacy protection guide',
            ogType: 'article'
        },
        hi: {
            title: 'Privacy Policy - Meshivo 3D 3D Generator Privacy Policy',
            description: 'Meshivo 3D 3D generator privacy policy, including privacy policy, privacy agreement, privacy protection and technical support.',
            keywords: 'Meshivo 3D privacy policy, privacy agreement, privacy protection, privacy policy guide, privacy protection guide',
            ogType: 'article'
        }
    },
    service: {
        zh_CN: {
            title: '服务条款 - Meshivo 3D 3D生成器服务条款',
            description: 'Meshivo 3D 3D生成器服务条款，包括服务条款、服务协议、服务保护等详细指南和技术支持',
            keywords: 'Meshivo 3D服务条款, 服务协议, 服务保护, 服务条款指南, 服务保护指南',
            ogType: 'article'
        },
        en: {
            title: 'Service Terms - Meshivo 3D 3D Generator Service Terms',
            description: 'Meshivo 3D 3D generator service terms, including service terms, service agreement, service protection and technical support.',
            keywords: 'Meshivo 3D service terms, service agreement, service protection, service terms guide, service protection guide',
            ogType: 'article'
        },
        ja: {
            title: 'Service Terms - Meshivo 3D 3D Generator Service Terms',
            description: 'Meshivo 3D 3D generator service terms, including service terms, service agreement, service protection and technical support.',
            keywords: 'Meshivo 3D service terms, service agreement, service protection, service terms guide, service protection guide',
            ogType: 'article'
        },
        ko: {
            title: 'Service Terms - Meshivo 3D 3D Generator Service Terms',
            description: 'Meshivo 3D 3D generator service terms, including service terms, service agreement, service protection and technical support.',
            keywords: 'Meshivo 3D service terms, service agreement, service protection, service terms guide, service protection guide',
            ogType: 'article'
        },
        hi: {
            title: 'Service Terms - Meshivo 3D 3D Generator Service Terms',
            description: 'Meshivo 3D 3D generator service terms, including service terms, service agreement, service protection and technical support.',
            keywords: 'Meshivo 3D service terms, service agreement, service protection, service terms guide, service protection guide',
            ogType: 'article'
        }
    },
    onlineViewer: {
        zh_CN: {
            title: '在线3D查看器 - Meshivo 3D 3D查看器',
            description: 'Meshivo 3D 3D查看器，支持多种3D文件格式，支持在线查看，支持3D模型下载',
            keywords: 'Meshivo 3D 3D查看器, 3D模型在线查看, 3D模型下载',
            ogType: 'article'
        },
        en: {
            title: 'Online 3D Viewer - Meshivo 3D 3D Viewer',
            description: 'Meshivo 3D 3D viewer, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D 3D viewer, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        ja: {
            title: 'Online 3D Viewer - Meshivo 3D 3D Viewer',
            description: 'Meshivo 3D 3D viewer, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D 3D viewer, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        ko: {
            title: 'Online 3D Viewer - Meshivo 3D 3D Viewer',
            description: 'Meshivo 3D 3D viewer, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D 3D viewer, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        hi: {
            title: 'Online 3D Viewer - Meshivo 3D 3D Viewer',
            description: 'Meshivo 3D 3D viewer, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D 3D viewer, 3D model online viewing, 3D model download',
            ogType: 'article'
        }
    },
    modelCompression: {
        zh_CN: {
            title: '3D模型压缩工具 - Meshivo 3D 3D模型压缩工具',
            description: 'Meshivo 3D 3D模型压缩工具，支持多种3D文件格式，支持在线查看，支持3D模型下载',
            keywords: 'Meshivo 3D 3D模型压缩工具, 3D模型在线查看, 3D模型下载',
            ogType: 'article'
        },
        en: {
            title: 'Model Compression Tool - Meshivo 3D Model Compression Tool',
            description: 'Meshivo 3D model compression tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D model compression tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        ja: {
            title: 'Model Compression Tool - Meshivo 3D Model Compression Tool',
            description: 'Meshivo 3D model compression tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D model compression tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        ko: {
            title: 'Model Compression Tool - Meshivo 3D Model Compression Tool',
            description: 'Meshivo 3D model compression tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D model compression tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        hi: {
            title: 'Model Compression Tool - Meshivo 3D Model Compression Tool',
            description: 'Meshivo 3D model compression tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D model compression tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        }
    },
    fileConverter: {
        zh_CN: {
            title: '文件转换工具 - Meshivo 3D 文件转换工具',
            description: 'Meshivo 3D 文件转换工具，支持多种3D文件格式，支持在线查看，支持3D模型下载',
            keywords: 'Meshivo 3D 文件转换工具, 3D模型在线查看, 3D模型下载',
            ogType: 'article'
        },
        en: {
            title: 'File Converter Tool - Meshivo 3D File Converter Tool',
            description: 'Meshivo 3D file converter tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D file converter tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        ja: {
            title: 'File Converter Tool - Meshivo 3D File Converter Tool',
            description: 'Meshivo 3D file converter tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D file converter tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        ko: {
            title: 'File Converter Tool - Meshivo 3D File Converter Tool',
            description: 'Meshivo 3D file converter tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D file converter tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        },
        hi: {
            title: 'File Converter Tool - Meshivo 3D File Converter Tool',
            description: 'Meshivo 3D file converter tool, supports multiple 3D file formats, supports online viewing, supports 3D model download',
            keywords: 'Meshivo 3D file converter tool, 3D model online viewing, 3D model download',
            ogType: 'article'
        }
    }
};

// 获取页面 SEO 配置
export function getPageSEO(pageKey: string, lang: Language): SEOConfig {
    const defaultSEO: SEOConfig = {
        title: lang === 'zh_CN' ? 'Meshivo 3D - AI智能3D模型生成器' : 'Meshivo 3D - AI-Powered 3D Model Generator',
        description:
            lang === 'zh_CN' ? 'Meshivo 3D是AI驱动的3D模型生成平台，让3D创作变得简单高效' : 'Meshivo 3D is an AI-driven 3D model generation platform that makes 3D creation simple and efficient',
        keywords: lang === 'zh_CN' ? 'AI 3D生成器, 文字生成3D模型, AI建模, 智能材质匹配' : 'AI 3D generator, text to 3D model, AI modeling, intelligent material matching'
    };

    return pageSEOData[pageKey]?.[lang] || defaultSEO;
}

// 生成结构化数据
export function generateStructuredData(pageKey: string, lang: Language) {
    const baseData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Meshivo 3D',
        applicationCategory: 'DesignApplication',
        applicationSubCategory: '3D Model Generator',
        operatingSystem: 'Web Browser',
        softwareVersion: '1.0',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
        },
        author: {
            '@type': 'Organization',
            name: 'NeonBit Team',
            url: 'https://neon-ai.com'
        },
        featureList: [
            lang === 'zh_CN' ? 'AI智能3D模型生成' : 'AI Smart 3D Model Generation',
            lang === 'zh_CN' ? '文字描述即时生成' : 'Text-to-3D Instant Generation',
            lang === 'zh_CN' ? '智能材质匹配' : 'Intelligent Material Matching',
            lang === 'zh_CN' ? '多风格自由创作' : 'Multi-style Creative Freedom'
        ],
        screenshot: 'https://neon-ai.com/images/screenshot.jpg'
    };

    switch (pageKey) {
        case 'landing':
            return {
                ...baseData,
                description:
                    lang === 'zh_CN'
                        ? 'AI驱动的专业3D模型生成器，文字描述一键生成高质量3D模型，支持多种风格和智能材质匹配'
                        : 'AI-powered professional 3D model generator, generate high-quality 3D models from text descriptions with multi-style support and intelligent material matching',
                keywords:
                    lang === 'zh_CN'
                        ? ['AI 3D生成器', '文字生成3D', 'AI建模', '智能材质', '3D创作平台']
                        : ['AI 3D generator', 'text to 3D', 'AI modeling', 'intelligent material', '3D creation platform']
            };
        case 'faq':
            return {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: lang === 'zh_CN' ? '如何使用Meshivo 3D生成3D模型？' : 'How to use Meshivo 3D to generate 3D models?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                lang === 'zh_CN'
                                    ? '输入文字描述即可一键生成高质量3D模型，AI会自动匹配材质和优化细节。'
                                    : 'Simply input text descriptions to generate high-quality 3D models instantly, AI automatically matches materials and optimizes details.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: lang === 'zh_CN' ? 'Meshivo 3D支持哪些3D格式导出？' : 'What 3D export formats does Meshivo 3D support?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                lang === 'zh_CN'
                                    ? '支持GLB、OBJ、FBX、STL等主流3D格式，适用于游戏开发、3D设计和渲染。'
                                    : 'Supports mainstream 3D formats including GLB, OBJ, FBX, STL, suitable for game development, 3D design and rendering.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: lang === 'zh_CN' ? 'Meshivo 3D生成的3D模型质量如何？' : 'What is the quality of 3D models generated by Meshivo 3D?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                lang === 'zh_CN'
                                    ? 'Meshivo 3D生成的3D模型具有高质量几何结构，智能材质匹配，适合专业3D项目使用。'
                                    : 'Meshivo 3D generates high-quality 3D models with detailed geometry and intelligent material matching, suitable for professional 3D projects.'
                        }
                    }
                ]
            };
        case 'blog':
            return {
                '@context': 'https://schema.org',
                '@type': 'Blog',
                name: lang === 'zh_CN' ? 'Meshivo 3D AI 3D创作博客' : 'Meshivo 3D AI 3D Creation Blog',
                description:
                    lang === 'zh_CN' ? '分享AI 3D模型生成技巧、文字描述编写指南和3D创作最佳实践' : 'Share AI 3D model generation tips, text description writing guides and 3D creation best practices',
                publisher: {
                    '@type': 'Organization',
                    name: 'NeonBit Team',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://neon-ai.com/logo.png'
                    }
                }
            };
        case 'price':
            return {
                '@context': 'https://schema.org',
                '@type': 'PricePage',
                name: lang === 'zh_CN' ? '价格 - Meshivo 3D 3D生成器价格与套餐选择' : 'Price - Meshivo 3D 3D Generator Pricing & Package Selection',
                description:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D 3D生成器价格与套餐选择，包括免费、基础、专业套餐，支持月付、季付等多种支付方式'
                        : 'Meshivo 3D 3D generator pricing and package selection, including free, basic, professional packages, supporting monthly, quarterly.',
                keywords:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D价格, 3D模型生成器价格, 套餐选择, 支付方式, 月付, 季付'
                        : 'Meshivo 3D price, 3D model generator price, package selection, payment methods, monthly, quarterly'
            };
        case 'login':
            return {
                '@context': 'https://schema.org',
                '@type': 'LoginPage',
                name: lang === 'zh_CN' ? '用户登录 - Meshivo 3D AI智能3D生成器' : 'User Login - Meshivo 3D AI-Powered 3D Generator',
                description:
                    lang === 'zh_CN'
                        ? '登录 Meshivo 3D，享受AI智能3D模型生成服务。注册即可获得免费配额，升级会员享受更多生成次数和高级功能，让AI驱动的3D创作变得触手可及。'
                        : 'Login to Meshivo 3D and enjoy AI-powered 3D model generation services. Sign up for free quotas, upgrade to premium membership for more generations and advanced features, making AI-driven 3D creation accessible to everyone.',
                keywords:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D登录, AI 3D生成器注册, 智能3D建模登录, Meshivo 3D会员, 3D模型生成账户, AI创作平台登录'
                        : 'Meshivo 3D login, AI 3D generator signup, intelligent 3D modeling login, Meshivo 3D membership, 3D model generation account, AI creation platform_login'
            };
        case 'privacy':
            return {
                '@context': 'https://schema.org',
                '@type': 'PrivacyPolicyPage',
                name: lang === 'zh_CN' ? '隐私政策 - Meshivo 3D 3D生成器隐私政策' : 'Privacy Policy - Meshivo 3D 3D Generator Privacy Policy',
                description:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D 3D生成器隐私政策，包括隐私政策、隐私协议、隐私保护等详细指南和技术支持'
                        : 'Meshivo 3D 3D generator privacy policy, including privacy policy, privacy agreement, privacy protection and technical support',
                keywords:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D隐私政策, 隐私协议, 隐私保护, 隐私政策指南, 隐私保护指南'
                        : 'Meshivo 3D privacy policy, privacy agreement, privacy protection, privacy policy guide, privacy protection guide'
            };
        case 'service':
            return {
                '@context': 'https://schema.org',
                '@type': 'ServiceTermsPage',
                name: lang === 'zh_CN' ? '服务条款 - Meshivo 3D 3D生成器服务条款' : 'Service Terms - Meshivo 3D 3D Generator Service Terms',
                description:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D 3D生成器服务条款，包括服务条款、服务协议、服务保护等详细指南和技术支持'
                        : 'Meshivo 3D 3D generator service terms, including service terms, service agreement, service protection and technical support',
                keywords:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D服务条款, 服务协议, 服务保护, 服务条款指南, 服务保护指南'
                        : 'Meshivo 3D service terms, service agreement, service protection, service terms guide, service protection guide'
            };
        case 'onlineViewer':
            return {
                '@context': 'https://schema.org',
                '@type': 'OnlineViewerPage',
                name: lang === 'zh_CN' ? '在线3D查看器 - Meshivo 3D 3D查看器' : 'Online 3D Viewer - Meshivo 3D 3D Viewer',
                description:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D 3D查看器，支持多种3D文件格式，支持在线查看，支持3D模型下载'
                        : 'Meshivo 3D 3D viewer, supports multiple 3D file formats, supports online viewing, supports 3D model download',
                keywords: lang === 'zh_CN' ? 'Meshivo 3D 3D查看器, 3D模型在线查看, 3D模型下载' : 'Meshivo 3D 3D viewer, 3D model online viewing, 3D model download'
            };
        case 'modelCompression':
            return {
                '@context': 'https://schema.org',
                '@type': 'ModelCompressionPage',
                name: lang === 'zh_CN' ? '3D模型压缩工具 - Meshivo 3D 3D模型压缩工具' : 'Model Compression Tool - Meshivo 3D Model Compression Tool',
                description:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D 3D模型压缩工具，支持多种3D文件格式，支持在线查看，支持3D模型下载'
                        : 'Meshivo 3D model compression tool, supports multiple 3D file formats, supports online viewing, supports 3D model download'
            };
        case 'fileConverter':
            return {
                '@context': 'https://schema.org',
                '@type': 'FileConverterPage',
                name: lang === 'zh_CN' ? '文件转换工具 - Meshivo 3D 文件转换工具' : 'File Converter Tool - Meshivo 3D File Converter Tool',
                description:
                    lang === 'zh_CN'
                        ? 'Meshivo 3D 文件转换工具，支持多种3D文件格式，支持在线查看，支持3D模型下载'
                        : 'Meshivo 3D file converter tool, supports multiple 3D file formats, supports online viewing, supports 3D model download'
            };
        default:
            return baseData;
    }
}
