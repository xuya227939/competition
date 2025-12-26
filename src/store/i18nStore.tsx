import type { Language } from '@/utils/locale';
import { locales } from '@locales/resources';
import intl from 'react-intl-universal';
import { createStore, useStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type BaseLangPath<L extends Language> = `/${L}`;

export function getBaseLangPath<L extends Language>(lang: L): BaseLangPath<L> {
    return `/${lang}` as BaseLangPath<L>;
}

interface I18nState {
    lang: Language;
}

interface I18nActions {
    prepareI18n: () => Promise<void>;
    changeLanguage: (lang: Language) => void;
}

const storageKey = 'i18n-lang';

function initI18n(lang: string) {
    return intl.init({
        currentLocale: lang,
        locales
    });
}

// function parsePersistLang(fallback?: Language): Language {
//     try {
//         const json = localStorage.getItem(storageKey);
//         if (!json) return fallback || 'en';

//         const parsed = JSON.parse(json);
//         return parsed.state.lang;
//     } catch {
//         return fallback || 'en';
//     }
// }

export function assembleBaseLangPath(lang: Language, pathname: string) {
    const pathnameArrWithlang = pathname.split('/').filter(Boolean);

    const pathnameArrWithoutLang = pathnameArrWithlang.slice(1);

    const baseLangPath = getBaseLangPath(lang);
    return `${baseLangPath}/${pathnameArrWithoutLang.join('/')}`;
}

export function extractLangFromPathname(pathname: string) {
    const pathnameArrWithlang = pathname.split('/').filter(Boolean);

    return pathnameArrWithlang[0];
}

export const i18nStore = createStore<I18nState & I18nActions>()(
    persist(
        (set, get) => ({
            lang: 'en',
            prepareI18n: () => {
                return initI18n(get().lang);
            },
            changeLanguage: (lang: Language) => {
                const currentLang = get().lang;
                if (currentLang === lang) return;
                set(() => ({
                    lang
                }));
                initI18n(lang);
            }
        }),
        {
            name: storageKey,
            storage: createJSONStorage(() => {
                if (typeof window !== 'undefined') {
                    return localStorage;
                }
                return {
                    getItem: () => null,
                    setItem: () => {},
                    removeItem: () => {}
                };
            })
        }
    )
);

export const useI18nStore = () => {
    const { lang, changeLanguage } = useStore(i18nStore);
    return {
        lang,
        changeLanguage,
        getBaseLangPath
    };
};

export function initBaseLangPath() {
    const lang = i18nStore.getState().lang;
    return getBaseLangPath(lang);
}
