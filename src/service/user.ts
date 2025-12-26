import service from '@/request';
import { BASE_API } from '../config';

export const verifyToken = async (): Promise<any> => {
    return await service.get(`${BASE_API}/auth/verifyToken`);
};

export const logout = async (): Promise<any> => {
    return await service.get(`${BASE_API}/auth/logout`);
};

export const createPayUrl = async (params): Promise<any> => {
    return await service.post(`${BASE_API}/pay/createPayUrl`, params);
};

export const user4code = async (params): Promise<any> => {
    return await service.get(`${BASE_API}/auth/user4code?code=${params.code}`);
};

export const donwloadCount = async (params: any): Promise<any> => {
    return await service.post(`${BASE_API}/auth/donwload`, params);
};

export const updateUserInfo = async (params): Promise<any> => {
    return await service.post(`${BASE_API}/auth/updateUserInfo`, params);
};
