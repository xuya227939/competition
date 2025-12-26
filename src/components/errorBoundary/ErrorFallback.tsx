import { Button } from '@/components/ui/button';
import { ErrorType } from '@/utils/errors/errors';
import React from 'react';

interface ErrorFallbackProps {
    error: Error | null;
    resetError?: () => void;
}

// 获取错误图标
const ErrorIcon = () => (
    <svg
        className="h-24 w-24 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
    </svg>
);

/**
 * 错误回退组件
 * 当应用出错时显示的友好界面
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
    // 获取错误类型
    const errorType = (error as any)?.type || ErrorType.UNKNOWN;

    // 根据错误类型显示不同的消息
    const getErrorMessage = () => {
        switch (errorType) {
            case ErrorType.API:
                return '很抱歉，服务请求失败';
            case ErrorType.NETWORK:
                return '网络连接出现问题，请检查您的网络并重试';
            case ErrorType.AUTH:
                return '认证失败，请重新登录';
            case ErrorType.PERMISSION:
                return '您没有足够的权限执行此操作';
            case ErrorType.VALIDATION:
                return '输入数据验证失败，请检查您的输入';
            case ErrorType.ROUTING:
                return '页面不存在或无法访问';
            case ErrorType.RENDER:
                return '界面渲染失败';
            case ErrorType.UNKNOWN:
            default:
                return '很抱歉，应用遇到了未知错误';
        }
    };

    return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4">
            <div className="bg-card text-card-foreground border-border w-full max-w-lg rounded-lg border p-8 shadow-lg">
                <div className="flex flex-col items-center">
                    <ErrorIcon />

                    <h1 className="text-foreground mt-6 text-2xl font-bold">出现错误</h1>

                    <p className="text-muted-foreground mt-4 text-center">{getErrorMessage()}</p>

                    {error && (
                        <div className="bg-muted mt-4 max-h-32 w-full overflow-auto rounded-md p-4">
                            <p className="text-muted-foreground font-mono text-sm">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <div className="mt-6 flex space-x-4">
                        {resetError && <Button onClick={resetError}>重试</Button>}

                        <Button variant="outline" onClick={() => (window.location.href = '/')}>
                            返回首页
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
