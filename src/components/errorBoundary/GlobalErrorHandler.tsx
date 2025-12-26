import type { ErrorType } from '@/utils/errors/errors';
import type { ErrorEventDetail } from '@/utils/errors/globalErrorHandler';
import type { ReactNode } from 'react';
import { registerAuthErrorHandler, registerErrorHandler } from '@/utils/errors/globalErrorHandler';
import { useVNavigate } from '@/hooks/useVNavigate';
import { useEffect } from 'react';
import { APP_DOMAIN_URL } from '@/config';

interface GlobalErrorHandlerProps {
    children: ReactNode;
}

/**
 * 处理认证错误，重定向到登录页面
 */
const handleAuthErrorRedirect = (navigate: any) => {
    // 清除用户信息
    localStorage.clear();

    // 重定向到登录页面
    navigate(`${APP_DOMAIN_URL}/login`);
};

/**
 * React 错误处理组件
 * 注册到全局错误处理系统，提供特定于 React 的错误处理逻辑
 */
export function GlobalErrorHandler({ children }: GlobalErrorHandlerProps) {
    const navigate = useVNavigate();

    useEffect(() => {
        // 注册全局错误处理器（只在React挂载后提供额外处理）
        const unregisterErrorHandler = registerErrorHandler((detail: ErrorEventDetail) => {
            // React特定的错误处理逻辑可以放在这里
            console.log('[React] 捕获到全局错误:', detail);
            // 此处不再重复显示错误提示，因为全局错误处理器已经显示了
        });

        // 注册认证错误处理器
        const unregisterAuthHandler = registerAuthErrorHandler((_errorType: ErrorType, _code: number) => {
            // 处理认证错误，重定向到登录页面
            handleAuthErrorRedirect(navigate);
        });

        return () => {
            // 清理函数，注销处理器
            unregisterErrorHandler();
            unregisterAuthHandler();
        };
    }, [navigate]);

    return <>{children}</>;
}
