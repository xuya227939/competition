import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Share2, Calendar, Sparkles } from 'lucide-react';
import { useGLTF } from '@react-three/drei';
import intl from 'react-intl-universal';
import { isEmpty } from '@/utils';
import { useToast } from '@/components/ui/use-toast';
import * as THREE from 'three';
import { BambuStudio } from '@/components/icon';
import { useUserStore } from '@/store/userStore';
import { useModelPreviewStore } from '@/store/modelPreViewStore';
import { ModelList } from './modelList';
import { motion } from 'framer-motion';
import { formatSupabaseDate } from '@/utils/formatSupabaseDate';
import Scene from '@/components/scene';
import { cn } from '@/utils';

// 添加 ModelStats 接口定义（在文件顶部，ModelLoader 之前）
interface ModelStats {
    topology: string;
    faceCount: number;
    vertexCount: number;
}

// 3D展示弹窗组件 - 优化加载和切换性能
const ModelDetailDialog = ({ model, isOpen, onClose }: { model: any; isOpen: boolean; onClose: () => void }) => {
    if (!model) return null;
    const { toast } = useToast();
    const { handleShare } = useModelPreviewStore();
    const [selectedFileIndex, setSelectedFileIndex] = useState(0);
    const { userInfor, donwloadCount, isDonwloadLoading } = useUserStore();

    // 使用 useMemo 缓存模型URL和文件列表
    const allFiles = useMemo(() => {
        return model.model_url?.all_files || [];
    }, [model.model_url?.all_files]);

    const modelUrl = useMemo(() => {
        if (!allFiles.length) return null;
        return allFiles[selectedFileIndex] || allFiles[0];
    }, [allFiles, selectedFileIndex]);

    // 重置选中索引当模型改变时
    useEffect(() => {
        setSelectedFileIndex(0);
    }, [model.id]);

    const handleSendToBambuStudio = async () => {
        if (!isEmpty(userInfor) && userInfor?.donwload_count <= 0) {
            toast({
                description: intl.get('modelPreView.donwloadCount.error'),
                variant: 'destructive'
            });
            return;
        }

        donwloadCount(modelUrl, ['stl']);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex max-h-[90vh] w-[95vw] flex-col overflow-hidden border-gray-700 p-0">
                <DialogHeader className="flex-shrink-0 pt-4 pr-3 pl-3 sm:pt-6 sm:pr-4 sm:pl-4">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-bold text-white sm:text-xl">{model.title}</DialogTitle>
                    </div>
                </DialogHeader>

                {/* 主要内容区域 - 使用 flex 布局 */}
                <div className="flex min-h-0 flex-1 overflow-hidden">
                    {/* 左侧：3D模型展示区域 - 缩小到约60% */}
                    <div className="flex w-[60%] flex-shrink-0 items-center justify-center border-gray-700 p-4">
                        <div className="flex h-full max-h-full w-full rounded-md border border-gray-700">
                            <Scene datas={model}></Scene>
                        </div>
                    </div>

                    {/* 右侧：详细信息区域 - 约40%，独立滚动 */}
                    <div className="w-[40%] flex-1 overflow-y-auto border-gray-700 p-4">
                        <div className="space-y-3 sm:space-y-6">
                            {/* 用户信息 */}
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12">
                                    <Avatar>
                                        <AvatarImage src={model.avatar_url} alt={model.user_name} />
                                    </Avatar>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-white sm:text-base">{model.user_name}</h3>
                                    <p className="text-xs text-gray-400">{intl.get('modelPreView.creator')}</p>
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    <span className="hidden sm:inline">
                                        {intl.get('modelPreView.joinTime')} {model.user_joinTime ? formatSupabaseDate(model.user_joinTime, 'YYYY-MM-DD') : intl.get('modelPreView.unknown')}
                                    </span>
                                </div>
                            </div>

                            <Separator className="bg-gray-700" />

                            {/* 模型描述 */}

                            <div>
                                <h4 className="mb-1 text-sm font-medium text-gray-300 sm:mb-2">{intl.get('modelPreView.description')}</h4>
                                <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">{model.prompt || '-'}</p>
                            </div>

                            {/* 模型属性 */}
                            {model.ai_model === '2' && (
                                <div className="space-y-2 sm:space-y-3">
                                    <h4 className="text-sm font-medium text-gray-300">{intl.get('modelPreView.modelProperties')}</h4>

                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.type')}</span>
                                            <span className="text-gray-200">{model.type === '1' ? intl.get('modelPreView.textGeneration') : intl.get('modelPreView.imageGeneration')}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.shapeOnly')}</span>
                                            <span className="text-gray-200">{model.shapeOnly ? intl.get('modelPreView.shapeOnly.yes') : intl.get('modelPreView.shapeOnly.no')}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.checkBoxRembg')}</span>
                                            <span className="text-gray-200">{model.checkBoxRembg ? intl.get('modelPreView.checkBoxRembg.yes') : intl.get('modelPreView.checkBoxRembg.no')}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.steps')}</span>
                                            <span className="text-gray-200">{model.steps}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.octree_resolution')}</span>
                                            <span className="text-gray-200">{model.octree_resolution}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.guidance_scale')}</span>
                                            <span className="text-gray-200">{model.guidance_scale}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.seed')}</span>
                                            <span className="text-gray-200">{model.seed}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.public')}</span>
                                            <span className={`text-xs sm:text-sm ${model.public ? 'text-green-400' : 'text-red-400'}`}>
                                                {model.public ? intl.get('modelPreView.yes') : intl.get('modelPreView.no')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {model.ai_model === '3' && (
                                <div className="space-y-2 sm:space-y-3">
                                    <h4 className="text-sm font-medium text-gray-300">{intl.get('modelPreView.modelProperties')}</h4>

                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.type')}</span>
                                            <span className="text-gray-200">
                                                {model.type === '1'
                                                    ? intl.get('modelPreView.textGeneration')
                                                    : model.type === '2'
                                                      ? intl.get('modelPreView.imageGeneration')
                                                      : intl.get('modelPreView.multiViewGeneration')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.enablePBR')}</span>
                                            <span className="text-gray-200">{model.enablePBR ? intl.get('modelPreView.enablePBR.yes') : intl.get('modelPreView.enablePBR.no')}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.faceCount')}</span>
                                            <span className="text-gray-200">{model.faceCount}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.generateType')}</span>
                                            <span className="text-gray-200">{intl.get(`modelPreView.generateType.${model.generateType.toLowerCase()}`)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-400">{intl.get('modelPreView.polygonType')}</span>
                                            <span className="text-gray-200">{intl.get(`modelPreView.polygonType.${model.polygonType.toLowerCase()}`)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-gray-400">{intl.get('modelPreView.public')}</span>
                                        <span className={`text-xs sm:text-sm ${model.public ? 'text-green-400' : 'text-red-400'}`}>
                                            {model.public ? intl.get('modelPreView.yes') : intl.get('modelPreView.no')}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <Separator className="bg-gray-700" />

                            {/* 可下载格式 */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-300">{intl.get('modelPreView.downloadableFormats')}</h4>

                                {['fbx', '3mf', 'obj', 'stl', 'gltf', 'glb'].map((format: string) => (
                                    <Badge
                                        variant="secondary"
                                        className={cn('mr-4 cursor-pointer text-xs', isDonwloadLoading && 'cursor-not-allowed opacity-50')}
                                        onClick={async e => {
                                            e.stopPropagation();

                                            // 处理 auth 检查
                                            if (!isEmpty(userInfor) && userInfor?.donwload_count <= 0) {
                                                toast({
                                                    description: intl.get('modelPreView.donwloadCount.error'),
                                                    variant: 'destructive'
                                                });
                                                return;
                                            }

                                            // 处理 loading 状态
                                            if (isDonwloadLoading) return;

                                            donwloadCount(modelUrl as string, [format]);
                                        }}
                                    >
                                        <span className="text-xs text-gray-300 uppercase sm:text-sm">{format}</span>
                                    </Badge>
                                ))}
                            </div>

                            <Separator className="bg-gray-700" />

                            {/* 打印信息 */}
                            {!isEmpty(allFiles) && (
                                <div className="space-y-2 sm:space-y-3">
                                    <h4 className="text-sm font-medium text-gray-300">{intl.get('modelPreView.print')}</h4>
                                    <div className="space-y-1 sm:space-y-2">
                                        <Button className="flex cursor-pointer items-center text-xs sm:text-sm" auth onClick={() => handleSendToBambuStudio()} loading={isDonwloadLoading}>
                                            <BambuStudio className="h-3 w-3 text-blue-400 sm:h-4 sm:w-4" />
                                            <span className="text-xs text-gray-300 uppercase hover:text-blue-400 sm:text-sm">{intl.get('modelPreView.sendToBambuStudio')}</span>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <Separator className="bg-gray-700" />

                            {/* 互动按钮 */}
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                {model.public && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-600 text-xs text-gray-300 hover:bg-gray-800 hover:text-white sm:text-sm"
                                        auth
                                        onClick={e => handleShare(e, model.task_id)}
                                    >
                                        <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span>{intl.get('modelPreView.share')}</span>
                                    </Button>
                                )}

                                {/* <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-600 text-xs text-gray-300 hover:bg-gray-800 hover:text-white sm:text-sm"
                                    auth
                                    onClick={e => handleSameStyle(e, model)}
                                >
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4"></Sparkles>
                                    <span className="text-xs sm:text-sm">{intl.get('modelPreView.generateSameStyle')}</span>
                                </Button> */}
                            </div>

                            {/* 创建时间 */}
                            <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span className="hidden sm:inline">
                                    {intl.get('modelPreView.createdAt')} {model.created_at ? formatSupabaseDate(model.created_at, 'YYYY-MM-DD') : intl.get('modelPreView.unknown')}
                                </span>
                                <span className="sm:hidden">{model.created_at ? formatSupabaseDate(model.created_at, 'YYYY-MM-DD') : intl.get('modelPreView.unknown')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部关闭按钮 */}
                <div className="flex-shrink-0 border-t border-gray-700 p-2 sm:p-4">
                    <div className="flex justify-center">
                        <Button variant="outline" onClick={onClose} className="border-gray-600 text-xs text-gray-300 hover:bg-gray-800 hover:text-white sm:text-sm">
                            {intl.get('modelPreView.close')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// 3D模型卡片组件
const ModelCard = ({ model, handleOpenDialog }: { model: any; handleOpenDialog: (model: any) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { handleShare } = useModelPreviewStore();

    return (
        <div
            className="group relative overflow-hidden rounded-md border border-gray-700 transition-all duration-300 hover:border-gray-500 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleOpenDialog(model)}
        >
            {/* 模型预览图 */}
            <div className="relative aspect-square cursor-pointer overflow-hidden">
                <img
                    src={model.image_url}
                    alt={model.title}
                    className="h-full w-full bg-[#070707] object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={e => {
                        e.currentTarget.src =
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM0Y0NTU5Ii8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiM2QjcyOEQiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgZmlsbD0iIzRCNTQ2QSIvPgo8L3N2Zz4K';
                    }}
                />

                {/* 悬停时显示的按钮 - 位于左下角 */}
                <div className={`absolute bottom-2 left-2 flex items-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <Button onClick={e => handleShare(e, model)} variant="secondary">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs font-medium">{intl.get('modelPreView.share')}</span>
                    </Button>

                    {/* <Button onClick={e => handleSameStyle(e, model)} variant="secondary" auth>
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs font-medium">{intl.get('modelPreView.generateSameStyle')}</span>
                    </Button> */}
                </div>
            </div>

            {/* 模型信息 */}
            <div className="p-2">
                <div className="mb-2 flex items-start">
                    <h3 className="truncate text-sm font-semibold text-gray-200">{model.title}</h3>
                </div>

                <div className="flex items-center">
                    <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src={model.avatar_url} alt={model.user_name} />
                    </Avatar>
                    <span className="truncate text-xs text-gray-400">{model.user_name}</span>
                </div>
            </div>
        </div>
    );
};

/**
 * 3D 模型加载器
 */
export function CommunityList(props) {
    const [selectedModel, setSelectedModel] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (model: any) => {
        setSelectedModel(model);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedModel(null);
        setIsDialogOpen(false);
    };

    return (
        <div className="md:container lg:container">
            {/* 标题区域 - 更强的视觉层次 */}
            <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                <motion.h1
                    className="mb-6 text-4xl font-bold text-white sm:text-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {intl.get('landing.creationCollection.title')}
                </motion.h1>

                <motion.p
                    className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-white/80"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {intl.get('landing.creationCollection.subTitle')}
                </motion.p>
            </motion.div>
            {/* 模型列表 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6">
                {ModelList?.map(model => (
                    <ModelCard key={model.id} model={model} handleOpenDialog={handleOpenDialog} />
                ))}
            </div>
            {/* 3D展示弹窗 */}
            <ModelDetailDialog model={selectedModel} isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </div>
    );
}
