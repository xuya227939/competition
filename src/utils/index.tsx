import { toast } from '@components/ui/use-toast';
import { BASE_API } from '@/config';
import { fileSave } from 'browser-fs-access';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const loadFileAsArrayBuffer = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = reject;
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsArrayBuffer(file);
    });

export const isJson = file => file?.split('.').pop() === 'json';

export const isGlb = file => file?.split('.').pop() === 'glb';

export const isGltf = file => file?.split('.').pop() === 'gltf';

export const isZip = file => file?.split('.').pop() === 'zip';

// 下载图片
export async function downloadImage(url: string, filename?: string) {
    const urlInstance = new URL(url);
    const response = await fetch(import.meta.env.DEV ? BASE_API + urlInstance.pathname : urlInstance);
    fileSave(response, {
        fileName: filename
    });
}

export function formatDuration(seconds: number): string {
    if (!seconds) return '0';

    // 直接除以60得到分钟数
    const minutes = Math.floor(seconds / 60);

    return `${minutes}`;
}

export function convertBytes(bytes: number, to: 'B' | 'KB' | 'MB' | 'GB' | 'TB'): number {
    const units = {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024
    };

    return Number((bytes / units[to]).toFixed(2));
}

// 创建可以在任何地方调用的函数
export function showToast(props) {
    return toast(props);
}

// 删除cookie
export function deleteCookie() {
    document.cookie = 'token=';
}

export const donwloadUrl = async (url: string) => {
    try {
        const newUrl = url.replace(/^http:/, 'https:');
        const response = await fetch(newUrl, {
            mode: 'cors',
            credentials: 'same-origin' // 尝试改为 'omit'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = newUrl.split('/').pop() || 'download';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(objectUrl);
        return true;
    } catch (error) {
        showToast({
            variant: 'destructive',
            title: 'Download Error',
            description: '跨域请求失败，请检查服务器配置'
        });
        throw error;
    }
};

export function isValidUrl(str: string) {
    try {
        return Boolean(new URL(str));
    } catch {
        return false;
    }
}

export function isEmpty<T>(value: T | null | undefined): boolean {
    if (value === null || value === undefined) return true;

    if (typeof value === 'string' && value.trim() === '') return true;

    if (Array.isArray(value) && value.length === 0) return true;

    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true;
    }

    return false;
}

export function detectEnvironment() {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') {
        return 'server';
    }

    // 检查常见的移动设备特征
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

    // 检查屏幕宽度（可选）
    const isMobileWidth = window.innerWidth <= 768;

    // 如果用户代理包含移动关键字或屏幕宽度符合移动设备，则认为是移动H5
    if (mobileKeywords.some(keyword => userAgent.includes(keyword)) || isMobileWidth) {
        return 'H5';
    }

    // 默认认为是桌面Web环境
    return 'pc';
}

export const validateCredentials = (username, password, form = 'edit') => {
    /* eslint-disable regexp/no-useless-assertions */
    const usernameRegex = /^(?=[\w\u4e00-\u9fff.]{3,20}$)(?!^\d+$)(?!^[._])(?!.*[._]$)(?!.*[._]{2,})[\w\u4e00-\u9fff.]+$/;

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z]).{8,30}$|^(?=.*[a-z])(?=.*\d).{8,30}$|^(?=.*[a-z])(?=.*[!@#$%^&*()_+=]).{8,30}$|^(?=.*[A-Z])(?=.*\d).{8,30}$|^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=]).{8,30}$|^(?=.*\d)(?=.*[!@#$%^&*()_+=]).{8,30}$/;
    // 邮箱的正则表达式

    const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (form === 'register' && username) {
        // 先判断 username 是否是邮箱格式
        if (emailRegex.test(username)) {
            return true; // 如果是邮箱格式，直接返回 true
        } else {
            // 如果不是邮箱格式，再进行用户名的验证
            const isUsernameValid = usernameRegex.test(username);
            return isUsernameValid;
        }
    }
    if (username) {
        // 用户名验证
        const isUsernameValid = usernameRegex.test(username);
        return isUsernameValid;
    }

    if (password) {
        // 密码验证
        const isPasswordValid = passwordRegex.test(password);
        return isPasswordValid;
    }
};
