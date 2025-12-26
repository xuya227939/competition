import React from 'react';
import { Info as InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoIconProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    className?: string;
    iconClassName?: string;
    message?: string;
}

export const Info = ({ size = 24, className, iconClassName, message, ...props }: InfoIconProps) => {
    return (
        <div className={cn('flex cursor-pointer items-center', className)} {...props}>
            <InfoIcon
                size={size}
                className={cn(
                    'mr-2 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-800 dark:text-blue-400',
                    iconClassName
                )}
            />
            {message && <span className="text-sm text-gray-500">{message}</span>}
        </div>
    );
};

export const InfoCard = ({
    size = 24,
    className,
    iconClassName,
    message,
    ...props
}: InfoIconProps) => {
    return (
        <div
            className={cn(
                'flex items-center border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20',
                className
            )}
            {...props}
        >
            <InfoIcon
                size={size}
                className={cn(
                    'mr-2 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-800 dark:text-blue-400',
                    iconClassName
                )}
            />
            <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>
    );
};
