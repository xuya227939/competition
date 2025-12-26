import { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Share2, Calendar, Sparkles, Trash2, Package } from 'lucide-react';
import intl from 'react-intl-universal';
import { isEmpty } from '@/utils';
import { useToast } from '@/components/ui/use-toast';
import { BambuStudio } from '@/components/icon';
import { useUserStore } from '@/store/userStore';
import { useModelPreviewStore } from '@/store/modelPreViewStore';
import { formatSupabaseDate } from '@/utils/formatSupabaseDate';
import Scene from '@/components/scene';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PrintConfigDialog } from './printConfigDialog';

// 3D展示弹窗组件 - 优化加载和切换性能
const ModelDetailDialog = ({ model, isOpen, onClose }: { model: any; isOpen: boolean; onClose: () => void }) => {
    if (!model) return null;
    const { toast } = useToast();
    const { handleShare, handleSameStyle } = useModelPreviewStore();
    const [selectedFileIndex, setSelectedFileIndex] = useState(0);
    const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
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

    const handlePrintConfig = () => {
        setIsPrintDialogOpen(!isPrintDialogOpen);
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
                                    <div className="flex space-y-2 space-x-4">
                                        <Button className="flex cursor-pointer items-center text-xs sm:text-sm" auth onClick={() => handleSendToBambuStudio()} loading={isDonwloadLoading}>
                                            <BambuStudio className="h-3 w-3 text-blue-400 sm:h-4 sm:w-4" />
                                            <span className="text-xs text-gray-300 uppercase hover:text-blue-400 sm:text-sm">{intl.get('modelPreView.sendToBambuStudio')}</span>
                                        </Button>
                                        {/* <Button className="flex cursor-pointer items-center text-xs sm:text-sm" onClick={() => handlePrintConfig()}>
                                            <Package className="h-3 w-3 text-blue-400 sm:h-4 sm:w-4" />
                                            <span className="text-xs text-gray-300 uppercase hover:text-blue-400 sm:text-sm">{intl.get('modelPreView.printConfig')}</span>
                                        </Button> */}
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
            <PrintConfigDialog model={model} modelUrl={modelUrl} isOpen={isPrintDialogOpen} onClose={() => setIsPrintDialogOpen(false)} />
        </Dialog>
    );
};

// 3D模型卡片组件
const ModelCard = ({ model, handleOpenDialog, compact = false, showPublicTag = true }: { model: any; handleOpenDialog: (model: any) => void; compact?: boolean; showPublicTag?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { handleShare, handleSameStyle } = useModelPreviewStore();

    // 检查是否有有效的图片 URL
    const hasImage = model.image_url && !isEmpty(model.image_url) && !imageError;

    // 获取标题的首字符或前两个字符作为占位符文字
    const getPlaceholderText = () => {
        if (model.title) {
            // 如果是中文，取前两个字符；如果是英文，取首字母
            const title = model.title.trim();
            if (/[\u4e00-\u9fa5]/.test(title)) {
                return title.substring(0, 2) || '3D';
            }
            return title.substring(0, 2).toUpperCase() || '3D';
        }
        return '3D';
    };

    return (
        <div
            className="group relative rounded-md border border-gray-700 transition-all duration-300 hover:border-gray-500 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleOpenDialog(model)}
        >
            {/* 模型预览图 */}
            <div className="relative aspect-square cursor-pointer overflow-hidden">
                {hasImage ? (
                    <img
                        src={model.image_url}
                        alt={model.title}
                        className="h-full w-full bg-[#070707] object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={e => {
                            e.currentTarget.src =
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM0Y0NTU5Ii8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiM2QjcyOEQiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgZmlsbD0iIzRCNTQ2QSIvPgo8L3N2Zz4K';
                        }}
                    />
                ) : (
                    // 无图片时的占位符
                    <div className="flex h-full w-full flex-col items-center justify-center p-4">
                        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                            <Package className="h-8 w-8 text-blue-400" />
                        </div>
                        <div className="text-center">
                            <div className="mb-1 text-lg font-semibold text-gray-300">{getPlaceholderText()}</div>
                            <div className="text-xs text-gray-500">3D Model</div>
                        </div>
                    </div>
                )}

                {/* 左上角公开/私有标签 */}
                {showPublicTag && (
                    <div className="absolute top-2 left-2">
                        <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${model.public ? 'bg-emerald-500/80 text-white' : 'bg-gray-600/80 text-gray-200'}`}>
                            {model.public ? intl.get('modelPreView.public') : intl.get('modelPreView.private')}
                        </span>
                    </div>
                )}

                {/* 悬停时显示的按钮 - 位于左下角 */}
                <div className={`absolute bottom-2 left-2 flex items-center gap-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <Button onClick={e => handleShare(e, model.task_id)} variant="secondary" size={compact ? 'sm' : 'default'} className={compact ? 'h-7 w-7 p-0' : ''}>
                        <Share2 className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
                        {!compact && <span className="text-xs font-medium">{intl.get('modelPreView.share')}</span>}
                    </Button>

                    {/* <Button onClick={e => handleSameStyle(e, model)} variant="secondary" size={compact ? 'sm' : 'default'} className={compact ? 'h-7 w-7 p-0' : ''} auth>
                        <Sparkles className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
                        {!compact && <span className="text-xs font-medium">{intl.get('modelPreView.generateSameStyle')}</span>}
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

// Pending 状态卡片
const PendingCard = ({ model, handleOpenDialog }: { model: any; handleOpenDialog: (model: any) => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative overflow-hidden rounded-md border border-yellow-600/30 transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 加载状态区域 - 使用项目中的 Loading 组件 */}
            <div className="relative aspect-square cursor-pointer overflow-hidden bg-gray-800">
                <Loading />
            </div>

            {/* 模型信息 */}
            <div className="p-2">
                <div className="mb-2 flex items-start">
                    <h3 className="truncate text-sm font-semibold text-gray-200">{model.title}</h3>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Avatar className="mr-2 h-6 w-6">
                            <AvatarImage src={model.avatar_url} alt={model.user_name} />
                        </Avatar>
                        <span className="truncate text-xs text-gray-400">{model.user_name}</span>
                    </div>

                    {/* 状态标签 */}
                    <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></div>
                        <span className="text-xs text-yellow-400">{intl.get('modelPreView.pending')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Failed 状态卡片
const FailedCard = ({ model, handleOpenDialog, showPublicTag = true }: { model: any; handleOpenDialog: (model: any) => void; showPublicTag?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative overflow-hidden rounded-md border border-red-600/30 transition-all duration-300 hover:border-red-500/50 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 失败状态区域 - 移除图片 */}
            <div className="relative aspect-square cursor-pointer overflow-hidden bg-gray-800">
                {/* 失败状态显示 */}
                <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center space-y-3">
                        {/* 失败图标 */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                            <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>

                {showPublicTag && (
                    <div className="absolute top-2 left-2">
                        <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${model.public ? 'bg-emerald-500/80 text-white' : 'bg-gray-600/80 text-gray-200'}`}>
                            {model.public ? intl.get('modelPreView.public') : intl.get('modelPreView.private')}
                        </span>
                    </div>
                )}
            </div>

            {/* 模型信息 */}
            <div className="p-2">
                <div className="mb-2 flex items-start">
                    <h3 className="truncate text-sm font-semibold text-gray-200">{model.title}</h3>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Avatar className="mr-2 h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        </Avatar>
                        <span className="truncate text-xs text-gray-400">{model.user_name}</span>
                    </div>

                    {/* 状态标签 */}
                    <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 rounded-full bg-red-400"></div>
                        <span className="text-xs text-red-400">{intl.get('modelPreView.failed')}</span>
                    </div>
                </div>

                {/* 错误信息（如果有） */}
                {model.error_message && (
                    <div className="mt-2">
                        <span className="block truncate text-xs text-red-300" title={model.error_message}>
                            {model.error_message}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// 使用示例：根据状态渲染不同卡片
const ModelCardRenderer = ({ model, handleOpenDialog, compact = false, showPublicTag = true }: { model: any; handleOpenDialog: (model: any) => void; compact?: boolean; showPublicTag?: boolean }) => {
    switch (model.status) {
        case 'processing':
            return <PendingCard model={model} handleOpenDialog={handleOpenDialog} />;
        case 'pending':
            return <PendingCard model={model} handleOpenDialog={handleOpenDialog} />;
        case 'failed':
            return <FailedCard model={model} handleOpenDialog={handleOpenDialog} showPublicTag={showPublicTag} />;
        case 'completed':
            return <ModelCard model={model} handleOpenDialog={handleOpenDialog} compact={compact} showPublicTag={showPublicTag} />;
        default:
            return <ModelCard model={model} handleOpenDialog={handleOpenDialog} compact={compact} showPublicTag={showPublicTag} />;
    }
};

/**
 * 3D 模型加载器
 * @param props.compact - 紧凑模式，用于侧边栏等窄容器
 */
export function ModelPreView(props: {
    datas: any;
    isLoading: boolean;
    hasMore: boolean;
    loadMoreData: () => void;
    setHasMore: (hasMore: boolean) => void;
    getList: () => void;
    reset: () => void;
    isDelete?: boolean;
    compact?: boolean;
    showPublicTag?: boolean;
}) {
    const [selectedModel, setSelectedModel] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // 使用 react-intersection-observer 检测底部元素
    const { ref: bottomRef, inView } = useInView({
        threshold: 0, // 改为 0，只有完全进入视口才触发
        rootMargin: '200px', // 增加距离，提前触发
        triggerOnce: false, // 允许重复触发，但用 ref 控制
        delay: 100 // 添加延迟，减少快速滚动时的重复触发
    });

    const loadingRef = useRef(false);

    // 初始加载
    useEffect(() => {
        props.getList();
        return () => {
            props.reset();
        };
    }, []);

    //  使用 useCallback 缓存 loadMoreData 函数，防止重复创建
    const callBackLoadMoreData = useCallback(() => {
        if (loadingRef.current || !props.hasMore || props.isLoading) {
            return;
        }

        if (props.datas?.list?.length >= props.datas?.pagination?.total) {
            props.setHasMore(false);
        }

        loadingRef.current = true;

        try {
            props.loadMoreData();
        } finally {
            // 延迟重置，防止快速滚动时的重复触发
            setTimeout(() => {
                loadingRef.current = false;
            }, 500);
        }
    }, [props.hasMore, props.isLoading, props.loadMoreData]);

    // 当底部元素进入视口时触发加载
    useEffect(() => {
        if (inView && props.hasMore && !props.isLoading) {
            callBackLoadMoreData();
        }
    }, [inView, props.hasMore, props.isLoading, callBackLoadMoreData]);

    // 手动刷新数据
    const handleRefresh = () => {
        props.setHasMore(true);
        props.getList();
    };

    const handleOpenDialog = (model: any) => {
        setSelectedModel(model);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedModel(null);
        setIsDialogOpen(false);
    };

    return (
        <div>
            {/* 模型列表 */}
            <div className="min-h-0 flex-1">
                {props.datas?.list?.length > 0 ? (
                    <ScrollArea className="h-full w-full">
                        <div className={props.compact ? 'grid grid-cols-2 gap-2 p-2' : 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6'}>
                            {props.datas?.list?.map(model => (
                                <ModelCardRenderer key={model.id} model={model} handleOpenDialog={handleOpenDialog} compact={props.compact} showPublicTag={props.showPublicTag} />
                            ))}

                            {/* 底部加载指示器 */}
                            <div ref={bottomRef} className="col-span-full flex justify-center py-8">
                                {props.isLoading && (
                                    <div className="flex items-center">
                                        <Loading />
                                    </div>
                                )}
                                {!props.hasMore && props.datas?.list?.length > 0 && (
                                    <div className="text-center text-gray-400">
                                        <p className="text-md">{intl.get('modelPreView.noMoreModelsToLoad')}</p>
                                        <p className="mt-2 text-sm">
                                            {intl.get('modelPreView.total')} {props.datas?.list?.length} {intl.get('modelPreView.models')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>
                ) : props.isLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center text-gray-500">
                            <p>{intl.get('modelPreView.noModelsFound')}</p>
                            <Button onClick={handleRefresh} variant="outline" className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                                {intl.get('modelPreView.tryAgain')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3D展示弹窗 */}
            <ModelDetailDialog model={selectedModel} isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </div>
    );
}
