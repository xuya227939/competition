/**
 * 错误类型枚举
 * 用于标识不同类型的错误
 */
export enum ErrorType {
    // API 相关错误
    API = 'api_error',
    // 网络错误
    NETWORK = 'network_error',
    // 认证错误
    AUTH = 'auth_error',
    // 权限错误
    PERMISSION = 'permission_error',
    // 输入验证错误
    VALIDATION = 'validation_error',
    // 路由错误
    ROUTING = 'routing_error',
    // 组件渲染错误
    RENDER = 'render_error',
    // 未知错误
    UNKNOWN = 'unknown_error'
}

/**
 * 基础应用错误类
 * 所有自定义错误的基类
 */
export class AppError extends Error {
    public type: ErrorType;
    public timestamp: Date;
    public originalError?: Error;
    public meta?: Record<string, any>;

    constructor(message: string, type: ErrorType = ErrorType.UNKNOWN, originalError?: Error, meta?: Record<string, any>) {
        super(message);
        this.name = this.constructor.name;
        this.type = type;
        this.timestamp = new Date();
        this.originalError = originalError;
        this.meta = meta;

        // 确保正确的原型链
        Object.setPrototypeOf(this, AppError.prototype);

        // 捕获堆栈跟踪
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    /**
     * 获取错误的详细信息
     */
    public getDetails(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            type: this.type,
            timestamp: this.timestamp.toISOString(),
            stack: this.stack,
            originalError: this.originalError
                ? {
                      name: this.originalError.name,
                      message: this.originalError.message,
                      stack: this.originalError.stack
                  }
                : undefined,
            meta: this.meta
        };
    }

    /**
     * 转换为日志格式
     */
    public toLog(): string {
        return JSON.stringify(this.getDetails());
    }
}

/**
 * API 错误类
 * 用于包装 API 请求过程中产生的错误
 */
export class ApiError extends AppError {
    public statusCode?: number;
    public endpoint?: string;
    public requestData?: any;
    public responseData?: any;

    constructor(message: string, statusCode?: number, endpoint?: string, requestData?: any, responseData?: any, originalError?: Error, meta?: Record<string, any>) {
        super(message, ErrorType.API, originalError, meta);
        this.statusCode = statusCode;
        this.endpoint = endpoint;
        this.requestData = requestData;
        this.responseData = responseData;

        // 确保正确的原型链
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    public override getDetails(): Record<string, any> {
        return {
            ...super.getDetails(),
            statusCode: this.statusCode,
            endpoint: this.endpoint,
            requestData: this.requestData,
            responseData: this.responseData
        };
    }
}

/**
 * 网络错误类
 * 用于包装网络连接问题
 */
export class NetworkError extends AppError {
    constructor(message: string, originalError?: Error, meta?: Record<string, any>) {
        super(message, ErrorType.NETWORK, originalError, meta);

        // 确保正确的原型链
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}

/**
 * 认证错误类
 * 用于处理用户认证失败的情况
 */
export class AuthError extends AppError {
    constructor(message: string, originalError?: Error, meta?: Record<string, any>) {
        super(message, ErrorType.AUTH, originalError, meta);

        // 确保正确的原型链
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

/**
 * 权限错误类
 * 用于处理用户没有足够权限的情况
 */
export class PermissionError extends AppError {
    public requiredPermission?: string;

    constructor(message: string, requiredPermission?: string, originalError?: Error, meta?: Record<string, any>) {
        super(message, ErrorType.PERMISSION, originalError, meta);
        this.requiredPermission = requiredPermission;

        // 确保正确的原型链
        Object.setPrototypeOf(this, PermissionError.prototype);
    }

    public override getDetails(): Record<string, any> {
        return {
            ...super.getDetails(),
            requiredPermission: this.requiredPermission
        };
    }
}

/**
 * 验证错误类
 * 用于处理输入验证失败的情况
 */
export class ValidationError extends AppError {
    public validationErrors: Record<string, string>;

    constructor(message: string, validationErrors: Record<string, string> = {}, originalError?: Error, meta?: Record<string, any>) {
        super(message, ErrorType.VALIDATION, originalError, meta);
        this.validationErrors = validationErrors;

        // 确保正确的原型链
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    public override getDetails(): Record<string, any> {
        return {
            ...super.getDetails(),
            validationErrors: this.validationErrors
        };
    }
}

/**
 * 渲染错误类
 * 用于处理组件渲染过程中的错误
 */
export class RenderError extends AppError {
    public componentStack?: string;
    public componentName?: string;

    constructor(message: string, componentStack?: string, componentName?: string, originalError?: Error, meta?: Record<string, any>) {
        super(message, ErrorType.RENDER, originalError, meta);
        this.componentStack = componentStack;
        this.componentName = componentName;

        // 确保正确的原型链
        Object.setPrototypeOf(this, RenderError.prototype);
    }

    public override getDetails(): Record<string, any> {
        return {
            ...super.getDetails(),
            componentStack: this.componentStack,
            componentName: this.componentName
        };
    }
}
