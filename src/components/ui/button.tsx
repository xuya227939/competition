import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { userStore } from '@/store/userStore';
import { isEmpty, showToast } from '@/utils/index';
import intl from 'react-intl-universal';
import { toast } from 'sonner';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-hidden focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-ring/20 dark:aria-invalid:ring-ring/40 aria-invalid:border-ring",
    {
        variants: {
            variant: {
                primary: 'bg-sky-600 text-white shadow-2xs hover:bg-sky-700 focus-visible:ring-sky-500/20 cursor-pointer',
                secondary: 'bg-gray-100 text-gray-700 shadow-2xs hover:bg-gray-200 focus-visible:ring-gray-500/20 cursor-pointer',
                danger: 'cursor-pointer bg-red-600 text-white shadow-lg hover:bg-red-700 focus-visible:ring-red-500/20 border border-red-500/20 hover:border-red-400/30 transition-all duration-200',
                outline:
                    'cursor-pointer  border border-gray-600 text-gray-200 bg-transparent hover:text-blue-400 hover:border-blue-500 focus-visible:ring-blue-500/20 hover:bg-gray-800/50 transition-all duration-200',
                ghost: 'cursor-pointer bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white focus-visible:ring-gray-500/20 transition-all duration-200',
                default:
                    'cursor-pointer bg-gray-800 text-gray-200 shadow-lg hover:bg-gray-700 focus-visible:ring-gray-500/20 border border-gray-700/20 hover:border-gray-600/30 transition-all duration-200',
                link: 'cursor-pointer text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 transition-colors duration-200'
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-8'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    auth?: boolean;
    icon?: React.ReactNode;
}

function Button({ className, variant, size, asChild = false, loading = false, icon, disabled, children, auth = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : 'button';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 当使用 asChild 时，不应该阻止事件传播
        if (!asChild) {
            e.stopPropagation();
        }

        if (auth && isEmpty(userStore.getState().userInfor)) {
            showToast({
                variant: 'destructive',
                description: intl.get('error.authError.tips')
            });
            return;
        }
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }), loading && 'cursor-not-allowed opacity-50')}
            disabled={disabled || loading}
            {...props}
            onClick={handleClick}
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {icon && !loading && icon}
            {children}
        </Comp>
    );
}

export { Button, buttonVariants };
