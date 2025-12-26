import * as React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export interface PopconfirmProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    cancelText?: string;
    confirmText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showCancel?: boolean;
    confirmButtonVariant?: 'primary' | 'danger' | 'default';
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    className?: string;
    disabled?: boolean;
}

export const Popconfirm = React.forwardRef<HTMLDivElement, PopconfirmProps>(
    (
        {
            children,
            title = '确认操作',
            description,
            icon,
            cancelText = '取消',
            confirmText = '确认',
            onConfirm,
            onCancel,
            open,
            onOpenChange,
            showCancel = true,
            confirmButtonVariant = 'danger',
            side = 'top',
            align = 'start',
            className,
            disabled = false
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [position, setPosition] = React.useState({ top: 0, left: 0 });
        const triggerRef = React.useRef<HTMLElement>(null);

        const controlled = open !== undefined;
        const actualOpen = controlled ? open : isOpen;

        const updatePosition = () => {
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                const popoverWidth = 320; // w-80 = 20rem = 320px
                const popoverHeight = 200; // 估算高度
                const offset = 8;

                let top = 0;
                let left = 0;

                // 根据 side 计算位置
                switch (side) {
                    case 'top':
                        top = rect.top - popoverHeight - offset;
                        break;
                    case 'bottom':
                        top = rect.bottom + offset;
                        break;
                    case 'left':
                        top = rect.top + rect.height / 2 - popoverHeight / 2;
                        left = rect.left - popoverWidth - offset;
                        break;
                    case 'right':
                        top = rect.top + rect.height / 2 - popoverHeight / 2;
                        left = rect.right + offset;
                        break;
                }

                // 根据 align 计算水平位置 (对于 top/bottom)
                if (side === 'top' || side === 'bottom') {
                    switch (align) {
                        case 'start':
                            left = rect.left;
                            break;
                        case 'end':
                            left = rect.right - popoverWidth;
                            break;
                        case 'center':
                        default:
                            left = rect.left + rect.width / 2 - popoverWidth / 2;
                            break;
                    }
                }

                // 确保不超出视口
                const padding = 8;
                left = Math.max(padding, Math.min(left, window.innerWidth - popoverWidth - padding));
                top = Math.max(padding, Math.min(top, window.innerHeight - popoverHeight - padding));

                setPosition({ top, left });
            }
        };

        const handleOpenChange = (newOpen: boolean) => {
            if (!controlled) {
                setIsOpen(newOpen);
            }
            onOpenChange?.(newOpen);

            if (newOpen) {
                // 延迟计算位置，确保 DOM 已更新
                setTimeout(updatePosition, 0);
            }
        };

        const handleConfirm = async () => {
            setLoading(true);
            try {
                await onConfirm?.();
                handleOpenChange(false);
            } finally {
                setLoading(false);
            }
        };

        const handleCancel = () => {
            onCancel?.();
            handleOpenChange(false);
        };

        const defaultIcon = <AlertTriangle className="h-5 w-5 text-orange-500" />;

        if (disabled) {
            return <>{children}</>;
        }

        // 克隆 children，拦截其 onClick 事件并保存 ref
        const triggerElement = React.cloneElement(children as React.ReactElement, {
            ref: (node: HTMLElement) => {
                triggerRef.current = node;
                // 处理原始 ref
                const originalRef = (children as any).ref;
                if (typeof originalRef === 'function') {
                    originalRef(node);
                } else if (originalRef) {
                    originalRef.current = node;
                }
            },
            onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();

                const originalOnClick = (children as React.ReactElement).props?.onClick;
                if (originalOnClick) {
                    originalOnClick(e);
                }

                handleOpenChange(true);
            }
        });

        const popoverContent = actualOpen ? (
            <>
                {/* 遮罩层 */}
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99998
                    }}
                    onClick={() => handleOpenChange(false)}
                />
                {/* 弹窗内容 */}
                <div
                    ref={ref}
                    className={cn('w-80 rounded-lg border-gray-700 bg-gray-900 p-0 text-white shadow-xl', className)}
                    style={{
                        position: 'fixed',
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        zIndex: 99999
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="mb-4 flex items-start gap-4">
                            <div className="flex-shrink-0">{icon || defaultIcon}</div>
                            <div className="flex-1">
                                <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
                                {description && <p className="text-sm leading-relaxed text-gray-400">{description}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            {showCancel && (
                                <Button variant="outline" size="sm" onClick={handleCancel} className="min-w-20 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                                    {cancelText}
                                </Button>
                            )}
                            <Button variant={confirmButtonVariant} size="sm" onClick={handleConfirm} loading={loading} disabled={loading} className="min-w-20">
                                {confirmText}
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        ) : null;

        return (
            <>
                {triggerElement}
                {typeof document !== 'undefined' && popoverContent && createPortal(popoverContent, document.body)}
            </>
        );
    }
);

Popconfirm.displayName = 'Popconfirm';

export default Popconfirm;
