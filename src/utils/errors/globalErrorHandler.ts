import intl from 'react-intl-universal';
import { showToast } from '../index';
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

// 存储注册的错误处理回调函数
const errorHandlers: Array<(detail: ErrorEventDetail) => void> = [];
const authErrorHandlers: Array<(errorType: ErrorType, code: number) => void> = [];

/**
 * 立即初始化全局错误监听器
 * 在应用启动之前就开始监听错误
 */
(function initGlobalErrorListeners() {
    // 监听未捕获的Promise错误
    // window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    //     event.preventDefault();
    //     console.error('unhandled Promise reject:', event.reason);
    //     handleGlobalError({
    //         error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
    //         source: 'unhandledRejection'
    //     });
    // });
    // 监听全局未捕获的错误
    // window.addEventListener('error', (event: ErrorEvent) => {
    //     if (
    //         event.error &&
    //         !(event.message.includes('Script error') || event.message.includes('cross-origin'))
    //     ) {
    //         event.preventDefault();
    //         console.error('Uncaught global error:', event.error || event.message);
    //         // 触发全局错误处理
    //         handleGlobalError({
    //             error: event.error || new Error(event.message),
    //             source: 'window.onerror'
    //         });
    //     }
    // });
})();

/**
 * 处理全局错误
 * 通知所有注册的错误处理器
 */
function handleGlobalError(detail: ErrorEventDetail): void {
    console.error(`[${detail.source}] global errors:`, detail.error);

    // 创建自定义事件并派发
    const event = new CustomEvent(GLOBAL_ERROR_EVENT, { detail });
    window.dispatchEvent(event);

    // 调用所有注册的处理器
    errorHandlers.forEach(handler => {
        try {
            handler(detail);
        } catch (e) {
            console.error('Error handler execution failed:', e);
        }
    });

    // 对于认证错误，同时触发认证错误处理
    if (
        detail.errorType === ErrorType.AUTH ||
        detail.code === -401 ||
        detail.code === -403 ||
        (detail.error instanceof AuthError && (detail.error.type === ErrorType.AUTH || detail.error.meta?.code === -401 || detail.error.meta?.code === -403)) ||
        detail.error instanceof AuthError
    ) {
        handleAuthError(detail.errorType || ErrorType.AUTH, detail.code || (detail.error as any).meta?.code || -401);
        return;
    }

    // 默认显示错误提示（如果已加载 UI 库）
    try {
        showToast?.({
            variant: 'destructive',
            description: detail.error.message || intl.get('error.common')
        });
    } catch {
        // UI 库可能还未加载，忽略错误
        console.warn('Unable to display error message, UI component may not have loaded.');
    }
}

const whiteListPath = ['/app/login', '/app/loginCallback'];

/**
 * 处理认证错误
 */
function handleAuthError(errorType: ErrorType, _code: number): void {
    const currentPath = window.location.pathname;

    if (whiteListPath.includes(currentPath)) {
        return;
    }

    localStorage.clear();

    const errorMessage = errorType === ErrorType.AUTH ? intl.get('login.error.tips1') : intl.get('login.error.tips2');

    showToast({
        variant: 'destructive',
        description: errorMessage || intl.get('error.authError')
    });

    setTimeout(() => {
        window.location.href = `${APP_DOMAIN_URL}/login`;
    }, 3000);

    // const event = new CustomEvent(AUTH_ERROR_EVENT, {
    //     detail: { errorType, code }
    // });
    // window.dispatchEvent(event);

    // // 调用所有注册的认证错误处理器
    // authErrorHandlers.forEach(handler => {
    //     try {
    //         handler(errorType, code);
    //     } catch (e) {
    //         console.error('认证错误处理器执行失败:', e);
    //     }
    // });
}

/**
 * 注册全局错误处理回调函数
 */
export function registerErrorHandler(handler: (detail: ErrorEventDetail) => void): () => void {
    errorHandlers.push(handler);
    return () => {
        const index = errorHandlers.indexOf(handler);
        if (index !== -1) {
            errorHandlers.splice(index, 1);
        }
    };
}

/**
 * 注册认证错误处理回调函数
 */
export function registerAuthErrorHandler(handler: (errorType: ErrorType, code: number) => void): () => void {
    authErrorHandlers.push(handler);
    return () => {
        const index = authErrorHandlers.indexOf(handler);
        if (index !== -1) {
            authErrorHandlers.splice(index, 1);
        }
    };
}

/**
 * 触发全局错误
 * 可在应用任何地方调用此函数来报告错误
 */
export function triggerGlobalError(detail: ErrorEventDetail): void {
    handleGlobalError(detail);
}

/**
 * 触发认证错误
 * 用于处理登录过期、无权限等需要重定向到登录页面的场景
 */
export function triggerAuthError(errorType: ErrorType, code: number): void {
    handleAuthError(errorType, code);
}

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

        // 触发全局错误
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
