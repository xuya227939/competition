import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* 主加载动画 */}
                <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400 sm:h-10 sm:w-10" />
                    {/* 外圈动画 */}
                    <div className="absolute inset-0 animate-ping rounded-full border-2 border-blue-400/30" />
                </div>

                {/* 加载文本 */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-gray-200 sm:text-base">Loading...</p>
                    <p className="text-xs text-gray-400 sm:text-sm">Please wait a moment</p>
                </div>
            </div>
        </div>
    );
}

// 可选：创建一个更简单的内联加载组件
export function InlineSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center justify-center', className)}>
            <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
        </div>
    );
}

// 可选：创建一个带文本的加载组件
export function LoadingWithText({ text = 'Loading...' }: { text?: string }) {
    return (
        <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            <span className="text-sm text-gray-200">{text}</span>
        </div>
    );
}

// 新增：创建一个适合黑暗主题的骨架屏组件
export function Skeleton({ className }: { className?: string }) {
    return <div className={cn('animate-pulse rounded-md bg-gray-700', className)} />;
}

// 新增：创建一个卡片骨架屏
export function CardSkeleton() {
    return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
            </div>
        </div>
    );
}

// 新增：创建一个列表骨架屏
export function ListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
