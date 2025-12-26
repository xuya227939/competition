import type { PropsWithoutRef } from 'react';
import { cn } from '@/utils';

interface LogoTextProps {
    className?: string;
    imgClassName?: string;
    onClick?: (params?: any) => void;
    text?: string;
    icon?: React.ReactNode;
}

export function LogoText(props: PropsWithoutRef<LogoTextProps>) {
    return (
        <span className={cn('mr-4 flex items-center justify-center', props.className)}>
            <div className="flex items-center">
                <img src="/images/logo.png" alt="Meshivo 3D" className={cn('mr-2 h-10 w-10', props.imgClassName ? props.imgClassName : '')} />
                <span>Meshivo 3D</span>
            </div>
        </span>
    );
}
