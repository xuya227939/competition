import { cn } from '@/utils';

interface VLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Vike-compatible Link component
 * Replaces @tanstack/react-router Link for SSR compatibility
 */
export function VLink({ href, children, className, ...props }: VLinkProps) {
    return (
        <a 
            href={href} 
            className={cn(className)}
            {...props}
        >
            {children}
        </a>
    );
}
