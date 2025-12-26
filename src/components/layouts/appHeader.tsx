import type { PropsWithChildren } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MenuIcon } from 'lucide-react';
import intl from 'react-intl-universal';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { SidebarTrigger } from '../ui/sidebar';
import { useTheme } from '@/components/theme/provider';

export const AppHeader = ({
    children,
    header,
    withHeader = true
}: PropsWithChildren<{
    header?: React.ReactNode;
    withHeader?: boolean;
}>) => {
    const isMobile = useIsMobile();
    const { theme } = useTheme();
    return (
        <div className="flex h-full min-h-0 flex-col">
            {withHeader && (
                <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-white bg-[#070707] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className={`-ml-1 ${theme === 'dark' ? 'text-white' : ''}`} />
                    </div>
                    {!isMobile ? (
                        header
                    ) : (
                        <div className="flex w-full justify-end px-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost">
                                        <MenuIcon className={`size-6 ${theme === 'dark' ? 'text-white' : ''}`} />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent aria-description="operation-panel">
                                    <SheetHeader>
                                        <SheetTitle>{intl.get('operation.panel')}</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-4 flex flex-col gap-2 gap-y-6">{header}</div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    )}
                </header>
            )}
            <section className="min-h-0 flex-1 overflow-y-auto" id="content">
                {children}
            </section>
        </div>
    );
};
