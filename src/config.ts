import { isEmpty } from './utils';

export const BASE_API = (import.meta as any).env.VITE_APP_NODE_ENV === 'development' ? '/api/v1' : 'https://mesh.api-service.net.cn/api/v1';

export const DOMAIN_URL =
    (import.meta as any).VITE_APP_NODE_ENV === 'development' || isEmpty((import.meta as any).env.VITE_APP_DOMAIN_URL)
        ? '//localhost:9004' // 'http://localhost:9003' //   'https://test.api-service.net.cn/api/v1'
        : '//mesh.api-service.net.cn:9004';

// export const APP_DOMAIN_URL = import.meta.env.VITE_APP_DOMAIN_URL || 'https://app.meshivo.com/app';
export const APP_DOMAIN_URL = 'https://meshivo.com/app';

export const OSS_URL = (import.meta as any).VITE_APP_NODE_ENV === 'development' ? 'https://oss.api-service.net.cn' : 'https://oss.api-service.net.cn';
