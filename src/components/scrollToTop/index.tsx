import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowUpToLine } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export function useScrollToTop() {
    const isMobile = useIsMobile();
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLDivElement;
            if (target.scrollTop > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const windowHandleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        let scrollContainer: HTMLElement | null = null;

        if (scrollAreaRef?.current) {
            scrollContainer = scrollAreaRef?.current?.querySelector(
                '[data-radix-scroll-area-viewport]'
            );
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', handleScroll);
            }
        } else {
            window.addEventListener('scroll', windowHandleScroll);
        }

        return () => {
            if (scrollContainer) {
                window.removeEventListener('scroll', windowHandleScroll);
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleScrollToTop = () => {
        const scrollRef = anchorRef.current;
        if (scrollRef) {
            scrollRef.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }
    };

    const scrollToTopButton = useMemo(
        () => (
            <>
                {isMobile && isScrolled && (
                    <Button
                        className={`fixed right-5 bottom-20 z-10 h-[40px] w-[40px] rounded-full`}
                        size="icon"
                        onClick={handleScrollToTop}
                    >
                        <ArrowUpToLine className="size-6 text-white" />
                    </Button>
                )}
            </>
        ),
        [isMobile, isScrolled]
    );

    return {
        scrollAreaRef,
        anchorRef,
        scrollToTopButton
    };
}
