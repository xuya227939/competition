import type { PropsWithoutRef, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useI18nStore } from '@/store/i18nStore';
import { useUserStore } from '@/store/userStore';
import { cn, isEmpty } from '@/utils';
import { LogoText } from '@components/logoText';
import { VLink } from '@/components/navigation/VLink';
import { LogInIcon, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { LangSelect, MobileLangSelect } from './langSelect';
import { ResourceDialog, MobileResourceDialog } from './resourceDialog';
import { APP_DOMAIN_URL } from '@/config';

export function Header() {
    const { userInfor } = useUserStore();
    const { lang } = useI18nStore();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-200',
                // 黑色主题背景色
                'border-b border-gray-800 bg-[#070707] backdrop-blur-sm',
                scrolled && 'shadow-lg shadow-black/20'
            )}
        >
            <nav className="container px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <VLink href="/">
                            <LogoText className="cursor-pointer text-xl text-white transition-colors" />
                        </VLink>

                        <ul className="ml-4 hidden space-x-8 md:flex md:items-center">
                            {[
                                { path: '/community', key: 'landing.header.text3' },
                                { path: '/price', key: 'landing.header.text4' },
                                { path: '/blog', key: 'landing.header.text2' }
                            ].map((item, index) => (
                                <MenuItem
                                    key={index}
                                    title={
                                        <VLink href={item.path} className="text-gray-300 transition-colors hover:text-white">
                                            {intl.get(item.key)}
                                        </VLink>
                                    }
                                />
                            ))}
                            <ResourceDialog />
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                        <LangSelect />
                        {isEmpty(userInfor) && (
                            <VLink href={`${APP_DOMAIN_URL}/login`} className="flex items-center">
                                <Button variant="default" className="hidden border-0 bg-white text-[#120e0e] hover:bg-white/90 lg:flex" icon={<LogInIcon className="" />}>
                                    {intl.get('landing.login')}
                                </Button>
                            </VLink>
                        )}
                        {!isEmpty(userInfor) && (
                            <VLink href={`${APP_DOMAIN_URL}/creation-collection`}>
                                <Avatar className="hidden border-2 border-gray-700 lg:flex">
                                    <AvatarImage src={userInfor.avatar_url} alt="avatar" />
                                    <AvatarFallback className="bg-gray-800 text-white">{userInfor.user_name}</AvatarFallback>
                                </Avatar>
                            </VLink>
                        )}
                        <Sheet>
                            <SheetTrigger asChild className="bg-transparent md:hidden">
                                <Button variant="ghost" className="text-white hover:bg-gray-800">
                                    <Menu className="size-6 text-white" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="space-y-6 border-gray-800 bg-[#070707]">
                                <SheetHeader>
                                    <SheetTitle className="pl-2 text-white">{intl.get('landing.header.mobile.title')}</SheetTitle>
                                </SheetHeader>
                                <ul className="space-y-6 text-white">
                                    <MenuItem
                                        title={
                                            <a
                                                href={
                                                    lang === 'zh_CN'
                                                        ? 'https://m26bxrpatp.feishu.cn/docx/BKhDdpPpXoSWC3xJLxPcCkJunPe?from=from_copylink'
                                                        : 'https://m26bxrpatp.feishu.cn/docx/MgjQd25JBoSBmMxapkecmYv3n7c?from=from_copylink'
                                                }
                                                target="_blank"
                                                className="text-gray-300 transition-colors hover:text-white"
                                            >
                                                {intl.get('landing.header.text1')}
                                            </a>
                                        }
                                    />
                                    <MenuItem
                                        title={
                                            <VLink href="/blog" className="text-gray-300 transition-colors hover:text-white">
                                                {intl.get('landing.header.text2')}
                                            </VLink>
                                        }
                                    />
                                    <MenuItem
                                        title={
                                            <VLink href="/faq" className="text-gray-300 transition-colors hover:text-white">
                                                {intl.get('landing.header.text3')}
                                            </VLink>
                                        }
                                    />
                                    <MenuItem
                                        title={
                                            <VLink href="/price" className="text-gray-300 transition-colors hover:text-white">
                                                {intl.get('landing.header.text4')}
                                            </VLink>
                                        }
                                    />

                                    <MobileResourceDialog />

                                    <MobileLangSelect />
                                    <li className="mt-4">
                                        {!isEmpty(userInfor) && (
                                            <div className="flex items-center">
                                                <Avatar className="border-2 border-gray-700">
                                                    <AvatarImage src={userInfor.avatar_url} alt="avatar" />
                                                    <AvatarFallback className="bg-gray-800 text-white">{userInfor.user_name}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-2 flex-1 overflow-hidden break-all">
                                                    <div className="flex items-center">
                                                        <h2 className="truncate text-lg font-bold text-white">{userInfor?.user_name ? userInfor.user_name : intl.get('detail.user.name')}</h2>
                                                    </div>
                                                    <p className="truncate text-xs text-gray-400">{userInfor?.email ? userInfor?.email : 'xx@.com'}</p>
                                                </div>
                                            </div>
                                        )}
                                        {isEmpty(userInfor) && (
                                            <VLink href={`${APP_DOMAIN_URL}/login`}>
                                                <Button variant="default" className="border-0 bg-white text-[#120e0e] hover:bg-white/90 lg:flex" icon={<LogInIcon className="" />}>
                                                    {intl.get('landing.login')}
                                                </Button>
                                            </VLink>
                                        )}
                                    </li>
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}

function MenuItem(props: PropsWithoutRef<{ title: ReactNode; onClick?: () => void }>) {
    return (
        // @ts-ignore
        <li className="cursor-pointer text-gray-300 transition-colors" {...props}>
            {props.title}
        </li>
    );
}
