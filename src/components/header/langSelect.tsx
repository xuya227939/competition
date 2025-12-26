import type { Language } from '@/utils/locale';
import { Globe } from 'lucide-react';
import intl from 'react-intl-universal';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useI18nStore } from '@/store/i18nStore';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const languages = [
    { value: 'zh_CN', label: '简体中文' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'hi', label: 'हिंदी' }
] as { value: Language; label: string }[];

export const LangSelect = () => {
    const { changeLanguage, lang } = useI18nStore();

    return (
        <Select
            value={lang}
            onValueChange={(val: Language) => {
                changeLanguage(val);
            }}
        >
            <SelectTrigger className="hidden w-[auto] cursor-pointer bg-transparent text-white lg:flex">
                <Label className="flex cursor-pointer items-center text-white">
                    <Globe className="mr-2 size-4 text-white" />
                    <span className="text-xs font-medium text-white">{lang === 'zh_CN' ? '中文' : 'English'}</span>
                </Label>
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-[#070707]">
                {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value} className="cursor-pointer text-white hover:bg-[#262626] focus:bg-[#262626]">
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const MobileLangSelect = () => {
    const { changeLanguage } = useI18nStore();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <li className="cursor-pointer rounded text-gray-300 transition-colors hover:bg-gray-800 hover:text-white">{intl.get('landing.lanauage.button')}</li>
            </DialogTrigger>
            <DialogContent className="!w-none w-sm">
                <DialogHeader>
                    <DialogTitle>{intl.get('landing.lanauage.dialog.title')}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {languages.map(lang => (
                        <Button
                            key={lang.value}
                            variant="outline"
                            className="w-full justify-start px-4 py-6 text-base"
                            onClick={() => {
                                changeLanguage(lang.value);
                                (document.querySelector("[data-state='open']")?.querySelector("button[data-state='open']") as HTMLElement)?.click();
                            }}
                        >
                            {lang.label}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
