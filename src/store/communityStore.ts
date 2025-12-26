import { createStore, useStore } from 'zustand';
import { communityList } from '@/service/community';
import { isEmpty } from '@/utils';

interface State {
    datas: any;
    searchParams: {
        page: number;
        pageSize: number;
        keyword: string;
    };
    hasMore: boolean;
    isListLoading: boolean;
}

interface Actions {
    getList: () => Promise<void>;
    setHasMore: (hasMore: boolean) => void;
    loadMoreData: () => Promise<void>;
    setSearchKeyword: (keyword: string) => void;
    resetCommunity: () => void;
}

const initialState = {
    datas: {},
    searchParams: {
        page: 1,
        pageSize: 30,
        keyword: ''
    },
    hasMore: true,
    isListLoading: false
};

export const communityStore = createStore<State & Actions>()((set, get) => ({
    ...initialState,

    getList: async () => {
        set({
            ...get(),
            datas: {},
            isListLoading: true,
            searchParams: {
                pageSize: 30,
                page: 1,
                keyword: get().searchParams.keyword
            }
        });
        const res = await communityList(get().searchParams);

        if (res.code === 0) {
            const { list, pagination } = res.datas;
            set(() => ({
                ...get(),
                datas: {
                    list: isEmpty(list) ? [] : list,
                    pagination
                }
            }));
        }

        set({
            ...get(),
            isListLoading: false
        });
    },

    setHasMore: (hasMore: boolean) => {
        set({
            ...get(),
            hasMore
        });
    },

    loadMoreData: async () => {
        const { isListLoading, hasMore, searchParams } = get();
        if (isListLoading || !hasMore) return;

        set({
            ...get(),
            isListLoading: true,
            searchParams: {
                ...searchParams,
                page: searchParams.page + 1
            }
        });
        try {
            const result: any = await communityList({
                ...searchParams,
                page: searchParams.page + 1
            });

            if (result?.datas?.list && result.datas.list.length > 0) {
                set(() => ({
                    ...get(),
                    datas: {
                        list: isEmpty(result.datas.list) ? [] : [...get().datas.list, ...result.datas.list],
                        pagination: {
                            ...result.datas.pagination,
                            page: searchParams.page
                        }
                    }
                }));
            } else {
                set(() => ({
                    ...get(),
                    hasMore: false
                }));
            }
        } catch (error) {
            console.error('Failed to load more data:', error);
        } finally {
            set({
                ...get(),
                isListLoading: false
            });
        }
    },
    setSearchKeyword: (keyword: string) => {
        set({
            ...get(),
            searchParams: {
                ...get().searchParams,
                keyword: keyword
            }
        });
    },
    resetCommunity: () => {
        set(initialState);
    }
}));

export const useCommunityStore = () => useStore(communityStore);
