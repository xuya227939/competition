import type { ErrorInfo, ReactNode } from 'react';
import { RenderError } from '@/utils/errors/errors';
import { Component } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    resetKey?: any;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * 错误边界组件
 * 用于捕获子组件树中的 JavaScript 错误，记录这些错误，并显示一个回退 UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // 更新 state，下一次渲染将显示回退 UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // 可以在这里记录错误信息
        const componentStack = errorInfo.componentStack;
        const componentName = componentStack
            ? componentStack.split('\n')[1]?.trim().replace(/^at /, '')
            : undefined;

        // 包装成我们自己的 RenderError 类型
        const renderError = new RenderError(
            error.message,
            errorInfo.componentStack || undefined,
            componentName,
            error
        );

        // 记录到控制台或发送到错误追踪服务
        console.error('组件渲染错误:', renderError.toLog());

        // 调用传入的 onError 回调
        if (this.props.onError) {
            this.props.onError(renderError, errorInfo);
        }
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        // 如果 resetKey 改变，重置错误状态
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false, error: null });
        }
    }

    render() {
        if (this.state.hasError) {
            // 如果提供了自定义的回退 UI，则使用它
            if (this.props.fallback) {
                return this.props.fallback;
            }
            // 否则使用默认的错误回退组件
            return <ErrorFallback error={this.state.error} />;
        }

        return this.props.children;
    }
}
