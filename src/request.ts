import axios from 'axios';
import { APP_DOMAIN_URL, BASE_API } from './config';
import { userStore } from './store/userStore';
import { showToast } from './utils';
import intl from 'react-intl-universal';

const whiteListPath = ['/app/login', '/app/loginCallback'];

// 用于存储正在进行的请求
const pendingRequests = new Map();

// 生成请求的唯一标识符
const generateRequestKey = (config: any) => {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params || {}), JSON.stringify(data || {})].join('&');
};

// 从pendingRequests中移除请求
const removePendingRequest = (config: any) => {
    const requestKey = generateRequestKey(config);
    if (pendingRequests.has(requestKey)) {
        pendingRequests.delete(requestKey);
    }
};

// 创建axios实例
const service = axios.create({
    baseURL: BASE_API,
    timeout: 50000,
    withCredentials: false, // 跨域携带cookie
    xsrfCookieName: 'xsrf-token' //当创建实例的时候配置默认配置,
});

// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        let { meshToken } = userStore.getState();
        if (meshToken) {
            meshToken = meshToken.replace(/"/g, '');
            config.headers.meshToken = meshToken;
        }

        if (!config.headers) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        }

        // 每次请求带上时间戳 防刷处理
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                timestamp: Date.parse(new Date().toString()) / 1000
            };
        }
        return config;
    },
    error => {
        // 请求失败时，也需要移除请求标识
        if (error.config) {
            removePendingRequest(error.config);
        }

        // return handleApiError(error, error.config);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 请求完成后，移除请求标识
        removePendingRequest(response.config);

        const res = response.data;

        return res;
    },
    error => {
        // 请求失败时，也需要移除请求标识
        if (error.config) {
            removePendingRequest(error.config);
        }

        const currentPath = window.location.pathname;

        // 白名单页面，不提示错误
        if (whiteListPath.includes(currentPath) && error.config.url.includes('verifyToken')) {
            return;
        }

        // 主动退出，不显示错误消息
        if ((error.status === 401 || error.status === 403) && !localStorage.getItem('meshToken')) {
            return;
        }

        // auth 认证相关
        if ((error.status === 401 || error.status === 403) && localStorage.getItem('meshToken')) {
            let errorMessage = error.response.data.message;
            if (error.status === 401) {
                errorMessage = intl.get('login.error.tips1');
            } else if (error.status === 403) {
                errorMessage = intl.get('login.error.tips2');
            }

            showToast({
                variant: 'destructive',
                description: errorMessage
            });

            setTimeout(() => {
                window.location.href = `${APP_DOMAIN_URL}/login`;
            }, 3000);
            return;
        }

        // 普通错误，返回错误信息
        showToast({
            variant: 'destructive',
            description: error.response.data.message
        });

        return error.response.data;
    }
);

export default service;
