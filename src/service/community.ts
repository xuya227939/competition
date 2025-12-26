import service from '@/request';
import { BASE_API } from '../config';

// 获取社区模型列表
export const communityList = async (params: any): Promise<any> => {
    return await service.get(`${BASE_API}/community/list?page=${params.page}&pageSize=${params.pageSize}&keyword=${params.keyword}`);
};
