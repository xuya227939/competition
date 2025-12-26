import { isEmpty, showToast } from '@/utils';
// import { modelDetail } from '@service/modelPreview';
import intl from 'react-intl-universal';
import { createStore, useStore } from 'zustand';
// import { router } from '@/router';
// import { ai3DGeneratorStore } from './ai3DGeneratorStore';

interface State {
    datas: any;
    taskId: string;
}

interface Actions {
    // getModelDetail: (taskId: string) => void;
    resetModelPreview: () => void;
    handleSameStyle: (e: React.MouseEvent, mode: any) => void;
    handleShare: (e, model) => void;
}

const initialState = {
    datas: {},
    taskId: ''
};

export const modelPreviewStore = createStore<State & Actions>()((set, get) => ({
    ...initialState,
    // 获取 3D模型
    // getModelDetail: async (taskId: string) => {
    //     const res = await modelDetail({ taskId });
    //     if (res.code === 0 && !isEmpty(res.datas.model_url.glb)) {
    //         set({
    //             ...get(),
    //             datas: res.datas
    //         });
    //     }
    // },
    handleShare: (e, taskId: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/app/model-preview/${taskId}`);

        showToast({
            variant: 'success',
            description: intl.get('diloag.copy.success'),
            duration: 2000
        });
    },
    handleSameStyle: (e: React.MouseEvent, model) => {
        e.stopPropagation();

        // ai3DGeneratorStore.getState().setGenerateModelData({
        //     ...model,
        //     front_view: model.multi_view?.front_view ? model.multi_view?.front_view : '',
        //     back_view: model.multi_view?.back_view ? model.multi_view?.back_view : '',
        //     left_view: model.multi_view?.left_view ? model.multi_view?.left_view : '',
        //     right_view: model.multi_view?.right_view ? model.multi_view?.right_view : '',
        //     isPublic: true
        // });

        // router.navigate({
        //     to: '/ai-generates-3d'
        // });
    },
    resetModelPreview: () => {
        set(initialState);
    }
}));

export const useModelPreviewStore = () => useStore(modelPreviewStore);
