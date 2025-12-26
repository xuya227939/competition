import { showToast } from '@/utils';
import intl from 'react-intl-universal';
import { AppError, AuthError, ErrorType } from './errors';
import { APP_DOMAIN_URL } from '@/config';

// 全局错误事件名称
export const GLOBAL_ERROR_EVENT = 'global-error-event';
export const AUTH_ERROR_EVENT = 'auth-error-event';

// 错误详情接口
export interface ErrorEventDetail {
    error: Error | AppError;
    source: string;
    errorType?: ErrorType;
    code?: number;
    meta?: Record<string, any>;
}

/**
 * 触发全局错误事件
 * 可在应用任何地方调用此函数来报告错误
 */
export function triggerGlobalError(detail: ErrorEventDetail): void {
    console.error('[Global Error]', detail);

    // 创建自定义事件
    const event = new CustomEvent(GLOBAL_ERROR_EVENT, { detail });
    window.dispatchEvent(event);

    // 对于认证错误，同时触发认证错误事件
    if (detail.errorType === ErrorType.AUTH || detail.code === -401 || detail.code === -403 || detail.error instanceof AuthError) {
        triggerAuthError(detail.errorType || ErrorType.AUTH, detail.code || -401);
    }
}

/**
 * 触发认证错误事件
 * 用于处理登录过期、无权限等需要重定向到登录页面的场景
 */
export function triggerAuthError(errorType: ErrorType, code: number): void {
    const event = new CustomEvent(AUTH_ERROR_EVENT, {
        detail: { errorType, code }
    });
    window.dispatchEvent(event);
}

/**
 * 处理认证错误，重定向到登录页面
 */
export const handleAuthErrorRedirect = (navigate: any) => {
    localStorage.clear();

    // 重定向到登录页面
    navigate(`${APP_DOMAIN_URL}/login`, { replace: true });
};

/**
 * 包装异步函数，自动捕获和处理错误
 */
export function withErrorHandling<T>(asyncFn: () => Promise<T>, source: string, meta?: Record<string, any>): Promise<T> {
    return asyncFn().catch(error => {
        // 确定错误类型
        let errorType = ErrorType.UNKNOWN;
        let code;

        if (error instanceof AppError) {
            errorType = error.type;
        } else if (error.response) {
            // Axios 错误
            code = error.response.status;
            if (code === 401 || code === 403) {
                errorType = ErrorType.AUTH;
            } else {
                errorType = ErrorType.API;
            }
        } else if (error.request) {
            errorType = ErrorType.NETWORK;
        }

        // 触发全局错误事件
        triggerGlobalError({
            error,
            source,
            errorType,
            code,
            meta
        });

        // 重新抛出错误，以便调用者可以进一步处理
        throw error;
    });
}

/**
 * 提供一个简单的默认错误处理函数
 * 显示错误消息并可选择是否记录
 */
export function handleError(error: Error, showErrorToast = true): void {
    console.error('[Error Handling]', error);

    if (showErrorToast) {
        showToast({
            variant: 'destructive',
            description: error.message || intl.get('common.error')
        });
    }
}
