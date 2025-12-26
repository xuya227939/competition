import { donwloadCount } from '@/service/user';
import { createPayUrl, verifyToken, user4code } from '@service/user';
import { AuthError } from '@supabase/supabase-js';
import { createStore, useStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface State {
    meshToken: string;
    isLoading: boolean;
    userInfor: any;
    isPayLoading: boolean;
    isDonwloadLoading: boolean;
    payUrl: string;
    inviteUser: {
        avatarUrl: string;
        userName: string;
        code: string;
    };
}

interface Actions {
    donwloadCount: (url: string, formats: string[]) => Promise<boolean>;
    updateUserInfo: (type: number, userInfor?: any) => Promise<boolean>;
    verifyToken: () => void;
    userReset: () => void;
    getPayUrl: (planType: string, isQuarter: boolean) => void;
    resetPayUrl: () => void;
    getInviteUser: (code: string) => void;
    prepareUserStore: () => void;
}

const initialState = {
    meshToken: '',
    isLoading: false,
    userInfor: {},
    isPayLoading: false,
    isDonwloadLoading: false,
    payUrl: '',
    inviteUser: {
        avatarUrl: '',
        userName: '',
        code: ''
    }
};

export const userStore = createStore<State & Actions>()(
    persist(
        (set, get) => ({
            ...initialState,
            // 获取邀请用户信息
            getInviteUser: async (code: string) => {
                const res = await user4code({ code });
                if (res.code === 0) {
                    set(() => ({
                        ...get(),
                        inviteUser: {
                            avatarUrl: res.datas.userInfor.avatar_url,
                            userName: res.datas.userInfor.user_name,
                            code: code
                        }
                    }));
                }
            },
            // 获取支付链接
            getPayUrl: async (planType: string, isQuarter: boolean) => {
                set(() => ({ ...get(), isPayLoading: true }));
                const res = await createPayUrl({
                    planType,
                    isSeasonal: isQuarter
                });
                if (res.code === 0) {
                    window.open(res.url, '_blank');
                    set(() => ({ ...get(), payUrl: res.url }));
                }

                set(() => ({ ...get(), isPayLoading: false }));
            },
            verifyToken: async () => {
                try {
                    const res: any = await verifyToken();
                    if (res && res.code === 0) {
                        const { accessToken, userInfor } = res.datas;
                        get().updateUserInfo(1, userInfor);
                        set(() => ({ userInfor, meshToken: accessToken }));
                    }
                } catch {
                    const { meshToken } = get();
                    if (meshToken) {
                        throw new AuthError('Token expired');
                    }
                    set(() => ({
                        userInfor: {},
                        meshToken: ''
                    }));
                }
            },
            updateUserInfo: (type, userInfor): Promise<boolean> => {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise<boolean>(async (resolve, reject) => {
                    if (type === 1) {
                        set(() => ({
                            userInfor
                        }));
                        return;
                    }
                });
            },
            donwloadCount: async (url: string, formats: string[]): Promise<any> => {
                set(() => ({ ...get(), isDonwloadLoading: true }));
                const res = await donwloadCount({ url, formats });
                if (res.code === 0) {
                    set(() => ({ ...get(), userInfor: res.datas.userInfor, isDonwloadLoading: false }));
                    window.open(res.datas.convertedFiles.url as string, '_blank');
                }
                set(() => ({ ...get(), isDonwloadLoading: false }));
            },
            resetPayUrl: () => {
                set(() => ({ payUrl: '' }));
            },
            userReset: () => {
                set(initialState);
            },
            prepareUserStore: async () => {
                get().verifyToken();
            }
        }),
        {
            name: 'mesh-auth',
            partialize: state => {
                return {
                    meshToken: state.meshToken
                };
            },
            storage: createJSONStorage(() => {
                if (typeof window !== 'undefined') {
                    return localStorage;
                }
                return {
                    getItem: () => null,
                    setItem: () => {},
                    removeItem: () => {}
                };
            }),
            onRehydrateStorage: () => state => {
                // Rehydration completed
                if (state) {
                    console.log('UserStore rehydrated with token:', state.meshToken ? 'present' : 'missing');
                }
            }
        }
    )
);

export const useUserStore = () => useStore(userStore);
