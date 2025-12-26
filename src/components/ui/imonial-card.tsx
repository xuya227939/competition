import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface ImonialAuthor {
    name: string;
    handle: string;
    avatar: string;
}

export interface ImonialCardProps {
    author: ImonialAuthor;
    text: string;
    title?: string;
    href?: string;
    className?: string;
}

export function ImonialCard({ author, text, title, href, className }: ImonialCardProps) {
    const Card = href ? 'a' : 'div';

    return (
        <Card
            {...(href ? { href } : {})}
            className={cn(
                'glass-card',
                'group flex flex-col rounded-md',
                'p-6 text-start shadow-[0_8px_32px_rgba(1,132,199,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
                'hover:shadow-[0_20px_40px_rgba(1,132,199,0.2)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]',
                'w-full max-w-[320px] sm:max-w-[320px]',
                'transition-all duration-300 hover:scale-[1.02]',
                'relative overflow-hidden',
                'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-60 dark:before:from-white/5',
                'after:absolute after:inset-[1px] after:bg-gradient-to-t after:from-transparent after:via-white/[0.02] after:to-white/[0.05] dark:after:via-white/[0.01] dark:after:to-white/[0.02]',
                className
            )}
        >
            {/* Apple Glass UI 高光效果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/10" />
            <div className="absolute top-0 right-4 left-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/20" />
            <div className="bg-gradient-radial absolute top-0 left-0 h-16 w-16 from-white/15 to-transparent opacity-60 dark:from-white/8" />

            {title && (
                <div className="relative mb-4">
                    <h3 className="mb-2 text-lg leading-tight font-bold text-white">{title}</h3>
                </div>
            )}
            <p className="sm:text-md relative mb-6 text-sm leading-relaxed font-medium text-white/80">
                {text}
            </p>
            <div className="relative mt-auto flex items-center gap-3">
                <Avatar className="h-12 w-12 shadow-lg ring-1 shadow-black/10 ring-white/30 backdrop-blur-sm">
                    <AvatarImage src={author.avatar} alt={author.name} />
                </Avatar>
                <div className="flex flex-col items-start">
                    <h4 className="text-md leading-none font-semibold text-white">{author.name}</h4>
                    <p className="mt-1 text-xs font-medium text-white/60">{author.handle}</p>
                </div>
            </div>
        </Card>
    );
}
