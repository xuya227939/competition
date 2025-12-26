import { cn } from '@/utils';
import { Footer } from '../footer';
import { Header } from '../header';
import { useScrollToTop } from '../scrollToTop';

function MainLayout({
    children,
    isLanding = false,
    withHeader = true
}: {
    children: React.ReactNode;
    isLanding?: boolean;
    withHeader?: boolean;
}) {
    const { scrollToTopButton, anchorRef } = useScrollToTop();

    return (
        <div
            className={cn(
                isLanding ? 'bg-[#070707]' : 'bg-[#070707]',
                'text-foreground flex min-h-screen flex-col'
            )}
            ref={anchorRef}
        >
            {withHeader && <Header />}

            <main className="relative flex-1 px-4 md:px-0">{children}</main>
            {scrollToTopButton}
            <Footer />
        </div>
    );
}

export default MainLayout;
