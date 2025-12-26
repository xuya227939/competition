import { useCallback, useEffect, useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/loading';
import { useToast } from '@/components/ui/use-toast';
import { useUserStore } from '@/store/userStore';
import { cn } from '@/lib/utils';
import intl from 'react-intl-universal';
import { isEmpty } from '@/utils';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, useGLTF, CameraControls } from '@react-three/drei';
import * as THREE from 'three';

// 打印预览组件
const PrintPreview = ({ modelUrl, printConfig, sizePresets }: { modelUrl: string | null; printConfig: any; sizePresets: any }) => {
    const [previewSize, setPreviewSize] = useState<{ width: number; height: number; depth: number } | null>(null);

    useEffect(() => {
        if (printConfig.size === 'custom') {
            setPreviewSize(printConfig.customSize);
        } else {
            setPreviewSize(sizePresets[printConfig.size]);
        }
    }, [printConfig.size, printConfig.customSize, sizePresets]);

    if (!modelUrl || !previewSize) return null;

    return (
        <div className="relative h-full w-full rounded-lg border border-gray-700 bg-gray-900">
            <Suspense fallback={<Loading />}>
                <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
                    <ambientLight intensity={3} />
                    <directionalLight position={[10, 10, 5]} intensity={4} />
                    <directionalLight position={[-5, 5, 5]} intensity={2} />

                    {/* 显示模型 */}
                    {modelUrl && <PreviewModelLoader modelUrl={modelUrl} />}

                    {/* 尺寸标注框 */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[previewSize.width / 10, previewSize.height / 10, previewSize.depth / 10]} />
                        <meshStandardMaterial
                            color={
                                printConfig.color === 'white'
                                    ? '#ffffff'
                                    : printConfig.color === 'black'
                                      ? '#000000'
                                      : printConfig.color === 'red'
                                        ? '#ff0000'
                                        : printConfig.color === 'blue'
                                          ? '#0000ff'
                                          : printConfig.color === 'green'
                                            ? '#00ff00'
                                            : printConfig.color === 'yellow'
                                              ? '#ffff00'
                                              : printConfig.color === 'transparent'
                                                ? '#ffffff'
                                                : printConfig.color === 'clear'
                                                  ? '#ffffff'
                                                  : printConfig.color === 'silver'
                                                    ? '#c0c0c0'
                                                    : printConfig.color === 'gold'
                                                      ? '#ffd700'
                                                      : printConfig.color === 'bronze'
                                                        ? '#cd7f32'
                                                        : '#ffffff'
                            }
                            transparent={printConfig.color === 'transparent' || printConfig.color === 'clear'}
                            opacity={printConfig.color === 'transparent' || printConfig.color === 'clear' ? 0.5 : 1}
                            wireframe={false}
                        />
                    </mesh>

                    <Grid
                        args={[8, 8]}
                        cellSize={0.5}
                        cellThickness={0.6}
                        cellColor="#5B6B7D"
                        sectionSize={2}
                        sectionThickness={1.2}
                        sectionColor="#9CA3AF"
                        fadeDistance={25}
                        fadeStrength={0.3}
                        followCamera={false}
                        infiniteGrid={false}
                        position={[0, 0, 0]}
                    />

                    <CameraControls minDistance={2} maxDistance={20} enableDamping={true} dampingFactor={0.05} target={[0, 0, 0]} />
                </Canvas>
            </Suspense>

            {/* 尺寸信息覆盖层 */}
            <div className="absolute bottom-2 left-2 rounded-md border border-gray-700/50 bg-[#070707]/90 px-3 py-2 text-xs text-white backdrop-blur-sm">
                <div className="space-y-1">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-gray-400">尺寸:</span>
                        <span className="font-medium">
                            {previewSize.width} × {previewSize.height} × {previewSize.depth} cm
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-gray-400">材料:</span>
                        <span className="font-medium">{printConfig.material}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-gray-400">颜色:</span>
                        <span className="font-medium capitalize">{printConfig.color}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 简化的模型加载器（用于预览）
const PreviewModelLoader = ({ modelUrl }: { modelUrl: string }) => {
    const gltf = useGLTF(modelUrl);
    const clonedScene = useMemo(() => {
        if (!gltf.scene) return null;
        return gltf.scene.clone();
    }, [gltf.scene, modelUrl]);

    useEffect(() => {
        if (clonedScene) {
            // 计算边界框并居中
            const box = new THREE.Box3().setFromObject(clonedScene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim === 0) return;

            const scale = 1.5 / maxDim;
            clonedScene.scale.setScalar(scale);
            clonedScene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        }
    }, [clonedScene]);

    if (!clonedScene) return null;
    return <primitive object={clonedScene} />;
};

// 材料选项类型
interface MaterialOption {
    name: string;
    colors: string[];
    basePrice: number;
}

// 尺寸预设类型
interface SizePreset {
    width: number;
    height: number;
    depth: number;
    label: string;
}

// 后处理选项类型
interface PostProcessingOption {
    id: string;
    name: string;
    price: number;
}

// 打印配置类型
interface PrintConfig {
    size: 'small' | 'medium' | 'large' | 'custom';
    customSize: { width: number; height: number; depth: number };
    material: 'PLA' | 'PETG' | 'Resin' | 'Metal';
    color: string;
    postProcessing: string[];
    quantity: number;
}

// 价格信息类型
interface PriceInfo {
    basePrice: number;
    materialPrice: number;
    postProcessingPrice: number;
    shippingPrice: number;
    discount: number;
    totalPrice: number;
}

// 打印配置弹窗组件 Props
interface PrintConfigDialogProps {
    model: any;
    modelUrl: string | null;
    isOpen: boolean;
    onClose: () => void;
}

// 打印配置弹窗组件
export const PrintConfigDialog = ({ model, modelUrl, isOpen, onClose }: PrintConfigDialogProps) => {
    const { toast } = useToast();
    const { userInfor } = useUserStore();
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 打印配置状态
    const [printConfig, setPrintConfig] = useState<PrintConfig>({
        size: 'medium',
        customSize: { width: 10, height: 10, depth: 10 },
        material: 'PLA',
        color: 'white',
        postProcessing: [],
        quantity: 1
    });

    // 价格信息
    const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);

    // 材料选项
    const materialOptions: Record<string, MaterialOption> = {
        PLA: {
            name: 'PLA',
            colors: ['white', 'black', 'red', 'blue', 'green', 'yellow', 'transparent'],
            basePrice: 0.5
        },
        PETG: {
            name: 'PETG',
            colors: ['white', 'black', 'transparent'],
            basePrice: 0.8
        },
        Resin: {
            name: 'Resin',
            colors: ['white', 'black', 'transparent', 'clear'],
            basePrice: 1.2
        },
        Metal: {
            name: 'Metal',
            colors: ['silver', 'gold', 'bronze'],
            basePrice: 5.0
        }
    };

    // 尺寸预设
    const sizePresets: Record<string, SizePreset> = {
        small: { width: 5, height: 5, depth: 5, label: '小号 (5×5×5cm)' },
        medium: { width: 10, height: 10, depth: 10, label: '中号 (10×10×10cm)' },
        large: { width: 15, height: 15, depth: 15, label: '大号 (15×15×15cm)' }
    };

    // 后处理选项
    const postProcessingOptions: PostProcessingOption[] = [
        { id: 'polish', name: '打磨抛光', price: 10 },
        { id: 'paint', name: '上色', price: 20 },
        { id: 'assembly', name: '组装', price: 15 }
    ];

    // 计算价格
    const calculatePrice = useCallback(async () => {
        if (!modelUrl) return;

        setIsCalculating(true);
        try {
            // 这里调用后端API计算价格
            // const response = await calculatePrintPrice({
            //     modelUrl,
            //     size: printConfig.size === 'custom' ? printConfig.customSize : sizePresets[printConfig.size],
            //     material: printConfig.material,
            //     color: printConfig.color,
            //     postProcessing: printConfig.postProcessing,
            //     quantity: printConfig.quantity
            // });

            // 临时使用前端计算逻辑（实际应该调用后端API）
            const size = printConfig.size === 'custom' ? printConfig.customSize : sizePresets[printConfig.size];

            const volume = (size.width * size.height * size.depth) / 1000; // cm³ to L
            const materialPrice = materialOptions[printConfig.material].basePrice * volume;
            const basePrice = volume * 2; // 基础打印费用
            const postProcessingPrice = printConfig.postProcessing.reduce((sum, id) => {
                const option = postProcessingOptions.find(opt => opt.id === id);
                return sum + (option?.price || 0);
            }, 0);
            const shippingPrice = 15; // 固定运费
            const discount = userInfor?.user_level === 1 ? 0.1 : userInfor?.user_level === 2 ? 0.2 : 0; // 会员折扣

            const subtotal = (basePrice + materialPrice + postProcessingPrice) * printConfig.quantity;
            const discountAmount = subtotal * discount;
            const totalPrice = subtotal - discountAmount + shippingPrice;

            setPriceInfo({
                basePrice,
                materialPrice,
                postProcessingPrice,
                shippingPrice,
                discount: discountAmount,
                totalPrice
            });
        } catch (error) {
            console.error('Calculate price error:', error);
            toast({
                description: '价格计算失败，请稍后重试',
                variant: 'destructive'
            });
        } finally {
            setIsCalculating(false);
        }
    }, [modelUrl, printConfig, userInfor, toast, materialOptions, sizePresets, postProcessingOptions]);

    // 配置改变时重新计算价格
    useEffect(() => {
        if (isOpen && modelUrl) {
            calculatePrice();
        }
    }, [isOpen, modelUrl, printConfig, calculatePrice]);

    // 提交订单
    const handleSubmitOrder = useCallback(async () => {
        if (!modelUrl || !priceInfo) return;

        if (isEmpty(userInfor)) {
            toast({
                description: intl.get('error.authError.tips') || '请先登录',
                variant: 'destructive'
            });
            return;
        }

        setIsSubmitting(true);
        try {
            // 这里调用后端API创建订单
            // const response = await createPrintOrder({
            //     modelId: model.id,
            //     modelUrl,
            //     config: printConfig,
            //     priceInfo
            // });

            toast({
                description: '订单创建成功！',
                variant: 'default'
            });

            onClose();
        } catch (error) {
            console.error('Create order error:', error);
            toast({
                description: '订单创建失败，请稍后重试',
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [modelUrl, printConfig, priceInfo, userInfor, model, toast, onClose]);

    // 计算打印时间
    const calculatePrintTime = () => {
        const size = printConfig.size === 'custom' ? printConfig.customSize : sizePresets[printConfig.size];
        const volume = (size.width * size.height * size.depth) / 1000;
        const hoursPerLiter = printConfig.material === 'Resin' ? 2 : printConfig.material === 'Metal' ? 6 : 3;
        const estimatedHours = Math.ceil(volume * hoursPerLiter);
        return estimatedHours < 1 ? '< 1小时' : `约 ${estimatedHours} 小时`;
    };

    // 计算预计完成时间
    const calculateDeliveryDate = () => {
        const size = printConfig.size === 'custom' ? printConfig.customSize : sizePresets[printConfig.size];
        const volume = (size.width * size.height * size.depth) / 1000;
        const hoursPerLiter = printConfig.material === 'Resin' ? 2 : printConfig.material === 'Metal' ? 6 : 3;
        const estimatedHours = Math.ceil(volume * hoursPerLiter);
        const deliveryDays = Math.ceil(estimatedHours / 24) + 2; // 打印时间 + 2天物流
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
        return `${deliveryDate.getMonth() + 1}月${deliveryDate.getDate()}日`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto border-gray-700 bg-[#070707]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">{intl.get('modelPreView.printConfig') || '打印配置'}</DialogTitle>
                    <DialogDescription className="text-gray-400">{intl.get('modelPreView.printConfigDesc') || '配置您的3D打印参数'}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* 左侧：配置选项 */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* 尺寸选择 */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">{intl.get('modelPreView.printSize') || '尺寸'}</Label>
                            <Select
                                value={printConfig.size}
                                onValueChange={(value: 'small' | 'medium' | 'large' | 'custom') => {
                                    setPrintConfig(prev => ({ ...prev, size: value }));
                                }}
                            >
                                <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="small">{sizePresets.small.label}</SelectItem>
                                    <SelectItem value="medium">{sizePresets.medium.label}</SelectItem>
                                    <SelectItem value="large">{sizePresets.large.label}</SelectItem>
                                    <SelectItem value="custom">自定义尺寸</SelectItem>
                                </SelectContent>
                            </Select>

                            {printConfig.size === 'custom' && (
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    <div>
                                        <Label className="text-xs text-gray-400">宽度 (cm)</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="30"
                                            value={printConfig.customSize.width}
                                            onChange={e =>
                                                setPrintConfig(prev => ({
                                                    ...prev,
                                                    customSize: { ...prev.customSize, width: Number(e.target.value) }
                                                }))
                                            }
                                            className="border-gray-700 bg-gray-800 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-400">高度 (cm)</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="30"
                                            value={printConfig.customSize.height}
                                            onChange={e =>
                                                setPrintConfig(prev => ({
                                                    ...prev,
                                                    customSize: { ...prev.customSize, height: Number(e.target.value) }
                                                }))
                                            }
                                            className="border-gray-700 bg-gray-800 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-400">深度 (cm)</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="30"
                                            value={printConfig.customSize.depth}
                                            onChange={e =>
                                                setPrintConfig(prev => ({
                                                    ...prev,
                                                    customSize: { ...prev.customSize, depth: Number(e.target.value) }
                                                }))
                                            }
                                            className="border-gray-700 bg-gray-800 text-white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 材料选择 */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">{intl.get('modelPreView.printMaterial') || '材料'}</Label>
                            <Select
                                value={printConfig.material}
                                onValueChange={(value: 'PLA' | 'PETG' | 'Resin' | 'Metal') => {
                                    setPrintConfig(prev => ({
                                        ...prev,
                                        material: value,
                                        color: materialOptions[value].colors[0] // 重置为第一个颜色
                                    }));
                                }}
                            >
                                <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(materialOptions).map(([key, option]) => (
                                        <SelectItem key={key} value={key}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 颜色选择 */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">{intl.get('modelPreView.printColor') || '颜色'}</Label>
                            <div className="flex flex-wrap gap-2">
                                {materialOptions[printConfig.material].colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setPrintConfig(prev => ({ ...prev, color }))}
                                        className={cn(
                                            'rounded-md border px-3 py-1 text-xs transition-colors',
                                            printConfig.color === color ? 'border-blue-500 bg-blue-600 text-white' : 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        )}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 后处理选项 */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">{intl.get('modelPreView.postProcessing') || '后处理'}</Label>
                            <div className="space-y-2">
                                {postProcessingOptions.map(option => (
                                    <label key={option.id} className="flex cursor-pointer items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={printConfig.postProcessing.includes(option.id)}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setPrintConfig(prev => ({
                                                        ...prev,
                                                        postProcessing: [...prev.postProcessing, option.id]
                                                    }));
                                                } else {
                                                    setPrintConfig(prev => ({
                                                        ...prev,
                                                        postProcessing: prev.postProcessing.filter(id => id !== option.id)
                                                    }));
                                                }
                                            }}
                                            className="rounded border-gray-700"
                                        />
                                        <span className="text-sm text-gray-300">
                                            {option.name} (+¥{option.price})
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 数量 */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">{intl.get('modelPreView.quantity') || '数量'}</Label>
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setPrintConfig(prev => ({
                                            ...prev,
                                            quantity: Math.max(1, prev.quantity - 1)
                                        }))
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                >
                                    -
                                </Button>
                                <span className="w-8 text-center font-medium text-white">{printConfig.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setPrintConfig(prev => ({
                                            ...prev,
                                            quantity: prev.quantity + 1
                                        }))
                                    }
                                    className="border-gray-700 bg-gray-800 text-white"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 中间：3D预览 */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <Label className="mb-2 block text-sm font-medium text-gray-300">{intl.get('modelPreView.printPreview') || '打印预览'}</Label>
                            <div className="h-[400px] w-full">
                                <PrintPreview modelUrl={modelUrl} printConfig={printConfig} sizePresets={sizePresets} />
                            </div>

                            {/* 打印时间估算 */}
                            <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">预计打印时间:</span>
                                    <span className="font-medium text-white">{calculatePrintTime()}</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-sm">
                                    <span className="text-gray-400">预计完成时间:</span>
                                    <span className="font-medium text-white">{calculateDeliveryDate()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：价格预览 */}
                    <div className="space-y-4 lg:col-span-1">
                        <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">{intl.get('modelPreView.priceBreakdown') || '价格明细'}</h3>
                                {isCalculating && <Loading />}
                            </div>

                            {priceInfo ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">基础打印费</span>
                                        <span className="text-white">¥{priceInfo.basePrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">材料费</span>
                                        <span className="text-white">¥{priceInfo.materialPrice.toFixed(2)}</span>
                                    </div>
                                    {priceInfo.postProcessingPrice > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">后处理费</span>
                                            <span className="text-white">¥{priceInfo.postProcessingPrice.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">运费</span>
                                        <span className="text-white">¥{priceInfo.shippingPrice.toFixed(2)}</span>
                                    </div>
                                    {priceInfo.discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-400">
                                            <span>会员折扣</span>
                                            <span>-¥{priceInfo.discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <Separator className="bg-gray-700" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-white">总计</span>
                                        <span className="text-blue-400">¥{priceInfo.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8 text-center text-gray-400">{isCalculating ? '计算中...' : '请配置打印参数'}</div>
                            )}
                        </div>

                        <Button onClick={handleSubmitOrder} disabled={!priceInfo || isSubmitting} className="w-full bg-blue-600 text-white hover:bg-blue-700" loading={isSubmitting}>
                            {intl.get('modelPreView.submitOrder') || '提交订单'}
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-gray-700 text-gray-300">
                        {intl.get('modelPreView.cancel') || '取消'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
