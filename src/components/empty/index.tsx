import { cn } from '@/lib/utils';
import { Inbox, RefreshCw, Plus, Search } from 'lucide-react';
import intl from 'react-intl-universal';

type EmptyStateType = 'default' | 'search' | 'filtered' | 'data' | 'error' | 'custom';

interface EmptyStateProps {
    /**
     * 空状态类型，会影响图标和默认文案
     * @default 'default'
     */
    type?: EmptyStateType;

    /**
     * 主标题
     */
    title?: string;

    /**
     * 描述信息
     */
    message?: string;

    /**
     * 是否显示主要行动按钮
     * @default true
     */
    showPrimaryAction?: boolean;

    /**
     * 是否显示次要行动按钮
     * @default false
     */
    showSecondaryAction?: boolean;

    /**
     * 主要行动按钮文本
     */
    primaryActionText?: string;

    /**
     * 次要行动按钮文本
     */
    secondaryActionText?: string;

    /**
     * 主要行动按钮点击事件
     */
    onPrimaryAction?: () => void;

    /**
     * 次要行动按钮点击事件
     */
    onSecondaryAction?: () => void;

    /**
     * 自定义图标
     */
    icon?: React.ReactNode;

    /**
     * 自定义类名
     */
    className?: string;
}

/**
 * 获取默认标题和消息
 */
function getDefaultContent(type: EmptyStateType) {
    switch (type) {
        case 'search':
            return {
                title: intl.get('empty.search.title') || '无搜索结果',
                message: intl.get('empty.search.message') || '尝试修改您的搜索条件，或清除搜索词',
                primaryActionText: intl.get('empty.search.clear') || '清除搜索',
                icon: <Search className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            };
        case 'filtered':
            return {
                title: intl.get('empty.filtered.title') || '无匹配结果',
                message: intl.get('empty.filtered.message') || '尝试修改或清除您的筛选条件',
                primaryActionText: intl.get('empty.filtered.clear') || '清除筛选',
                icon: <RefreshCw className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            };
        case 'data':
            return {
                title: intl.get('empty.data.title') || '暂无数据',
                message: intl.get('empty.data.message') || '这里还没有任何内容，开始创建吧',
                primaryActionText: intl.get('empty.data.create') || '创建',
                icon: <Plus className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            };
        case 'error':
            return {
                title: intl.get('empty.error.title') || '加载失败',
                message: intl.get('empty.error.message') || '数据加载出错，请刷新重试',
                primaryActionText: intl.get('empty.error.retry') || '重试',
                icon: <RefreshCw className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            };
        case 'default':
        default:
            return {
                title: intl.get('empty.default.title') || '暂无内容',
                message: intl.get('empty.default.message') || '当前没有任何内容可以显示',
                primaryActionText: intl.get('empty.default.action') || '刷新',
                icon: <Inbox className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            };
    }
}

export function Empty({ type = 'default', title, icon, className }: EmptyStateProps) {
    const defaultContent = getDefaultContent(type);

    const displayTitle = title || defaultContent.title;
    const displayIcon = icon || defaultContent.icon;

    return (
        <div
            className={cn('flex w-full flex-col items-center justify-center p-4 md:p-6', className)}
        >
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                    {displayIcon}
                </div>
                <h2 className="text-sm text-gray-300 dark:text-white">{displayTitle}</h2>
            </div>
        </div>
    );
}
