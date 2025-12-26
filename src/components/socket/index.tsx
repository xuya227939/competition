import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { DOMAIN_URL } from '../../config';

export default class SocketClient {
    private socket: Socket;
    private userId: string | null = null;

    constructor() {
        this.socket = io(DOMAIN_URL || 'http://localhost:9004', {
            transports: ['websocket'],
            upgrade: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            timeout: 45000, // 匹配服务端超时时间
            forceNew: true
        });

        this.socket.on('connect', () => {
            // if (this.userId) {
            //     this.authenticate(this.userId);
            // }
        });

        this.socket.on('disconnect', () => {});
    }

    onConnect = callback => {
        this.socket.on('connect', () => {
            if (this.userId) {
                this.authenticate(this.userId);
            }
            callback();
        });
    };

    // 用户认证
    authenticate(userId: string) {
        this.userId = userId;
        this.socket.emit('auth', { userId });
    }

    // 发送消息
    sendMessage(event: string, data: any) {
        this.socket.emit(event, data);
    }

    // 接收消息
    onMessage(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    // 获取当前 socket id
    getSocketId(): string | null | undefined {
        return this.socket.id;
    }

    offConnect = () => {
        this.socket.off('connect');
    };

    removeAllListeners = () => {
        this.socket.removeAllListeners();
    };

    // 获取当前用户 id
    getUserId(): string | null {
        return this.userId;
    }

    /**
     * 重写断开连接时的清理
     */
    disconnect() {
        this.socket.disconnect();
    }
}

export const socketClient = new SocketClient();
