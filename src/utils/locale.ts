import { entries } from './F';

export type Language = 'zh_CN' | 'en' | 'ja' | 'ko' | 'hi';

export const languagesTulpe = ['zh_CN', 'en', 'ja', 'ko', 'hi'] as const;

const languageCodes = {
    zh_CN: ['zh', 'zh-CN', 'zh-HK', 'zh-TW'],
    en: ['en', 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA'],
    ja: ['ja', 'ja-JP', 'ja-HK', 'ja-TW'],
    ko: ['ko', 'ko-KR', 'ko-HK', 'ko-TW'],
    hi: ['hi', 'hi-IN', 'hi-HK', 'hi-TW']
} as const;

export function getLoadedLocale(language: unknown): Language {
    // 判断语言所属国家或地区
    for (const [country, codes] of entries(languageCodes)) {
        // @ts-expect-error 这里 language 可能是 unknown 类型
        if (codes.includes(language) || language === country) {
            return country;
        }
    }
    return 'en';
}
