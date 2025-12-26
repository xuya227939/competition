import type { ReactNode } from 'react';
import { useUserStore } from '@/store/userStore';
import { ErrorType } from '@/utils/errors/errors';
import { useEffect } from 'react';
import { APP_DOMAIN_URL } from '@/config';
import { useVNavigate } from '@/hooks/useVNavigate';

// 创建一个全局事件名称常量
export const AUTH_ERROR_EVENT = 'auth-error-event';

interface AuthErrorHandlerProps {
    children: ReactNode;
}

/**
 * 处理认证错误的通用函数
 * 清除用户状态并跳转到登录页面
 */
export const handleAuthErrorRedirect = (navigate: any) => {
    // 清除用户信息
    localStorage.clear();

    // 重定向到登录页面
    navigate(`${APP_DOMAIN_URL}/login`, { replace: true });
};

/**
 * 处理身份验证错误的组件 (HOC模式)
 * 监听全局自定义事件，当遇到401或403错误时，重定向到登录页面
 */
export function AuthErrorHandler({ children }: AuthErrorHandlerProps) {
    const navigate = useVNavigate();

    useEffect(() => {
        // 自定义事件处理函数
        const handleAuthError = (event: CustomEvent) => {
            const { errorType, code } = event.detail;

            // 只处理身份验证相关错误
            if (errorType === ErrorType.AUTH || code === -401 || code === -403) {
                handleAuthErrorRedirect(navigate);
            }
        };

        // 添加事件监听器
        window.addEventListener(AUTH_ERROR_EVENT, handleAuthError as EventListener);

        return () => {
            // 组件卸载时移除事件监听器
            window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError as EventListener);
        };
    }, [navigate]);

    return <>{children}</>;
}

/**
 * 认证错误UI组件
 * 作为 errorComponent 使用，自动处理认证错误，无需展示页面，直接跳转到登录页面
 */
export function AuthErrorComponent({ error }: any) {
    const navigate = useVNavigate();

    // 检查是否是认证错误
    const isAuthError =
        error?.name === 'AuthError' ||
        error?.message?.includes('401') ||
        error?.message?.includes('403') ||
        error?.message?.includes('认证') ||
        error?.message?.includes('登录') ||
        error?.message?.includes('权限');

    // 如果是认证错误，自动清除用户状态并重定向到登录页面
    if (isAuthError) {
        // 使用 useEffect 来处理副作用，确保组件在渲染时触发跳转
        useEffect(() => {
            handleAuthErrorRedirect(navigate);
        }, []);

        // 返回 null，不显示任何内容，因为会立即跳转
        return null;
    }

    // 如果不是认证错误，则向上抛出，让其他错误处理组件处理
    throw error;
}

/**
 * 全局可用的函数，用于触发身份验证错误事件
 * 可在任何地方调用此函数以触发重定向
 */
export function triggerAuthError(errorType: ErrorType, code: number) {
    const event = new CustomEvent(AUTH_ERROR_EVENT, {
        detail: { errorType, code }
    });
    window.dispatchEvent(event);
}
