import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, useGLTF, CameraControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Loading } from '@/components/loading';
import intl from 'react-intl-universal';
import { Badge } from '@/components/ui/badge';
import { Circle, Palette, RotateCw, Pause, Grid3x3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

// 模型信息接口
interface ModelStats {
    topology: string;
    faceCount: number;
    vertexCount: number;
}

// 模型信息面板组件
const ModelInfoPanel = ({ stats }: { stats: ModelStats | null }) => {
    if (!stats) return null;

    const formatNumber = (num: number) => {
        return num.toLocaleString('en-US');
    };

    return (
        <div className="absolute top-4 right-4 z-10 rounded-md border border-gray-700/50 bg-[#070707]/90 shadow-lg backdrop-blur-sm">
            <div className="min-w-[200px] space-y-3 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{intl.get('scene.topology')}</span>
                    <span className="text-sm font-medium text-white">{stats.topology}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{intl.get('scene.faceCount')}</span>
                    <span className="text-sm font-medium text-white">{formatNumber(stats.faceCount)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{intl.get('scene.vertexCount')}</span>
                    <span className="text-sm font-medium text-white">{formatNumber(stats.vertexCount)}</span>
                </div>
            </div>
        </div>
    );
};

// 工具栏组件
const ModelToolbar = ({
    currentModelUrl,
    onPRBToggle,
    isPRBEnabled,
    onWhiteModeToggle,
    isWhiteModeEnabled,
    onWireframeToggle,
    isWireframeEnabled,
    onAutoRotateToggle,
    isAutoRotateEnabled
}: {
    currentModelUrl: string | null;
    onPRBToggle: () => void;
    isPRBEnabled: boolean;
    onWhiteModeToggle: () => void;
    isWhiteModeEnabled: boolean;
    onWireframeToggle: () => void;
    isWireframeEnabled: boolean;
    onAutoRotateToggle: () => void;
    isAutoRotateEnabled: boolean;
}) => {
    const hasModel = currentModelUrl !== null;

    return (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-gray-700/50 bg-[#070707]/90 px-3 py-2 shadow-lg backdrop-blur-sm">
            {/* PBR 材质切换 */}
            {hasModel && (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                            <Button
                                onClick={onPRBToggle}
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200',
                                    isPRBEnabled ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                )}
                            >
                                <Palette className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="top"
                            className="shadow-lg"
                            style={{
                                backgroundColor: 'black',
                                color: '#d1d5db'
                            }}
                            sideOffset={2}
                        >
                            <p className="text-sm">{intl.get('scene.pbrMaterial')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            {/* 白模切换 - 始终显示（只要有模型） */}
            {hasModel && (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                            <Button
                                onClick={onWhiteModeToggle}
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200',
                                    isWhiteModeEnabled ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                )}
                            >
                                <Circle className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="top"
                            className="shadow-lg"
                            style={{
                                backgroundColor: 'black',
                                color: '#d1d5db'
                            }}
                            sideOffset={2}
                        >
                            <p className="text-sm">{intl.get('scene.whiteMode')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            {/* 线框模式切换 */}
            {hasModel && (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                            <Button
                                onClick={onWireframeToggle}
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200',
                                    isWireframeEnabled ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                )}
                            >
                                <Grid3x3 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="top"
                            className="shadow-lg"
                            style={{
                                backgroundColor: 'black',
                                color: '#d1d5db'
                            }}
                            sideOffset={2}
                        >
                            <p className="text-sm">{intl.get('scene.wireframeMode')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            {/* 自动旋转 */}
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                        <Button onClick={onAutoRotateToggle} className={cn('flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200')}>
                            {isAutoRotateEnabled ? <Pause className="h-4 w-4" /> : <RotateCw className="h-4 w-4" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="top"
                        className="shadow-lg"
                        style={{
                            backgroundColor: 'black',
                            color: '#d1d5db'
                        }}
                        sideOffset={2}
                    >
                        <p className="text-sm">{intl.get('scene.autoRotate')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* 体素渲染支持 */}
            {/* {supportsVoxel && (
                <>
                    <div className="h-6 w-px bg-gray-700/50" />
                    <Button className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-md bg-gray-800 text-gray-300 opacity-50" title="体素渲染（即将支持）" disabled>
                        <Box className="h-4 w-4" />
                    </Button>
                </>
            )} */}
        </div>
    );
};

// 自动旋转控制器组件 - 使用场景旋转
const AutoRotateController = ({ enabled, sceneRef }: { enabled: boolean; sceneRef: React.MutableRefObject<THREE.Scene | null> }) => {
    useFrame((state, delta) => {
        if (enabled && sceneRef.current) {
            sceneRef.current.rotation.y += delta * 0.5; // 每秒旋转 0.5 弧度（约 28.6 度/秒）
        }
    });
    return null;
};

// 模型加载器组件 - 支持平滑切换
const ModelLoader = ({
    modelUrl,
    onStatsUpdate,
    isPRBEnabled,
    isWhiteModeEnabled,
    isWireframeEnabled,
    sceneRef,
    onGridPositionUpdate
}: {
    modelUrl: string;
    onStatsUpdate: (stats: ModelStats) => void;
    isPRBEnabled: boolean;
    isWhiteModeEnabled: boolean;
    isWireframeEnabled: boolean;
    sceneRef: React.MutableRefObject<THREE.Scene | null>;
    centerModel: boolean;
    onGridPositionUpdate: (position: THREE.Vector3) => void;
}) => {
    const gltf = useGLTF(modelUrl);
    const previousModelRef = useRef<THREE.Scene | null>(null);
    const initializedRef = useRef<string | null>(null);
    const originalMaterialsRef = useRef<Map<THREE.Mesh, THREE.Material>>(new Map());
    const whiteMaterialsRef = useRef<Map<THREE.Mesh, THREE.MeshStandardMaterial>>(new Map());

    // 使用 useMemo 克隆场景，只在 modelUrl 改变时重新克隆
    const clonedScene = useMemo(() => {
        if (!gltf.scene) return null;
        const cloned = gltf.scene.clone();

        // 重置原始材质映射
        originalMaterialsRef.current.clear();
        whiteMaterialsRef.current.clear();

        // 保存所有原始材质
        cloned.traverse(object => {
            if (object instanceof THREE.Mesh) {
                const mesh = object as THREE.Mesh;
                if (mesh.material) {
                    originalMaterialsRef.current.set(mesh, mesh.material);
                }
            }
        });

        return cloned;
    }, [gltf.scene, modelUrl]);

    // 应用材质设置 - 使用 useEffect 直接修改现有场景，不重新克隆
    useEffect(() => {
        if (!clonedScene) return;

        clonedScene.traverse(object => {
            if (object instanceof THREE.Mesh) {
                const mesh = object as THREE.Mesh;
                const originalMaterial = originalMaterialsRef.current.get(mesh);

                if (!originalMaterial) return;

                // 白模模式：移除纹理，使用纯色材质
                if (isWhiteModeEnabled) {
                    // 使用缓存的白色材质或创建新的
                    let whiteMaterial = whiteMaterialsRef.current.get(mesh);
                    if (!whiteMaterial) {
                        whiteMaterial = new THREE.MeshStandardMaterial({
                            color: 0xffffff,
                            metalness: 0.1,
                            roughness: 0.8
                        });
                        whiteMaterialsRef.current.set(mesh, whiteMaterial);
                    }
                    mesh.material = whiteMaterial;
                } else {
                    // 恢复原始材质
                    mesh.material = originalMaterial;

                    // 如果启用 PRB，检查并应用 PRB 设置（仅当材质不是 PRB 时）
                    if (isPRBEnabled && originalMaterial instanceof THREE.MeshStandardMaterial) {
                        // 检查材质是否已经是 PRB（有 metalness 和 roughness 属性）
                        const isAlreadyPRB = originalMaterial.metalness !== undefined && originalMaterial.roughness !== undefined;

                        if (!isAlreadyPRB) {
                            // 只有非 PRB 材质才需要设置默认值
                            originalMaterial.needsUpdate = true;
                            if (originalMaterial.metalness === undefined) {
                                originalMaterial.metalness = 0.5;
                            }
                            if (originalMaterial.roughness === undefined) {
                                originalMaterial.roughness = 0.5;
                            }
                        }
                        // 如果已经是 PRB 材质，不需要修改，保持原样
                    }
                }

                // 应用线框模式（无论是否白模模式都可以应用）
                const currentMaterial = mesh.material;
                if (currentMaterial) {
                    // 处理材质数组的情况
                    if (Array.isArray(currentMaterial)) {
                        currentMaterial.forEach(mat => {
                            if (mat instanceof THREE.Material) {
                                mat.wireframe = isWireframeEnabled;
                                mat.needsUpdate = true;
                            }
                        });
                    } else if (currentMaterial instanceof THREE.Material) {
                        currentMaterial.wireframe = isWireframeEnabled;
                        currentMaterial.needsUpdate = true;
                    }
                }
            }
        });
    }, [clonedScene, isPRBEnabled, isWhiteModeEnabled, isWireframeEnabled]);

    // 计算模型边界框并居中 - 只在模型 URL 改变时执行
    useEffect(() => {
        if (!clonedScene || initializedRef.current === modelUrl) {
            return;
        }

        // 重置之前模型的状态
        if (previousModelRef.current && previousModelRef.current !== clonedScene) {
            previousModelRef.current.scale.setScalar(1);
            previousModelRef.current.position.set(0, 0, 0);
        }

        initializedRef.current = modelUrl;
        previousModelRef.current = clonedScene;

        // 计算边界框
        const box = new THREE.Box3().setFromObject(clonedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim === 0) return;

        // 调整缩放，让模型大小合适
        const scale = 1.5 / maxDim;
        clonedScene.scale.setScalar(scale);
        clonedScene.position.set(0, 0, 0);

        // 重新计算缩放后的边界框
        const scaledBox = new THREE.Box3().setFromObject(clonedScene);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

        // 计算模型位置：让模型在 X、Z 轴居中，Y 轴底部贴合 Grid（Y=0）
        clonedScene.position.x = -scaledCenter.x; // X轴居中
        clonedScene.position.z = -scaledCenter.z; // Z轴居中
        clonedScene.position.y = -scaledBox.min.y; // Y轴：模型底部在 Grid 上（Y=0）

        // 计算 Grid 位置（作为模型底座）
        // Grid 应该在模型底部中心位置，和模型一起居中
        // Grid 的 Y 位置应该在模型底部（Y=0），X 和 Z 与模型中心对齐
        const gridPosition = new THREE.Vector3(
            clonedScene.position.x, // X轴：与模型中心对齐
            0, // Y轴：Grid 在原点（Y=0），模型底部贴合
            clonedScene.position.z // Z轴：与模型中心对齐
        );

        // 更新 Grid 位置
        onGridPositionUpdate(gridPosition);
    }, [clonedScene, modelUrl, onGridPositionUpdate]);

    useEffect(() => {
        if (clonedScene) {
            // 计算模型统计信息
            let totalFaces = 0;
            let totalVertices = 0;
            let topologyType = intl.get('scene.topology');

            clonedScene.traverse(object => {
                if (object instanceof THREE.Mesh && 'geometry' in object && object.geometry) {
                    const geometry = object.geometry as THREE.BufferGeometry;

                    if (geometry.index) {
                        const faceCount = geometry.index.count / 3;
                        totalFaces += faceCount;
                    } else {
                        const positionAttribute = geometry.attributes.position;
                        if (positionAttribute) {
                            const vertexCount = positionAttribute.count;
                            totalFaces += vertexCount / 3;
                        }
                    }

                    const positionAttribute = geometry.attributes.position;
                    if (positionAttribute) {
                        totalVertices += positionAttribute.count;
                    }

                    if (geometry.type === 'TriangleGeometry' || geometry.type === 'BufferGeometry') {
                        if (geometry.index) {
                            const indexCount = geometry.index.count;
                            if (indexCount % 3 === 0) {
                                topologyType = intl.get('scene.topology');
                            }
                        } else {
                            const positionCount = positionAttribute?.count || 0;
                            if (positionCount % 3 === 0) {
                                topologyType = intl.get('scene.topology');
                            }
                        }
                    }
                }
            });

            onStatsUpdate({
                topology: topologyType,
                faceCount: Math.floor(totalFaces),
                vertexCount: totalVertices
            });
        }
    }, [clonedScene, onStatsUpdate]);

    // 更新场景引用
    useEffect(() => {
        if (clonedScene) {
            sceneRef.current = clonedScene;
        }
    }, [clonedScene, sceneRef]);

    // 清理之前的场景引用
    useEffect(() => {
        return () => {
            if (previousModelRef.current) {
                previousModelRef.current = null;
            }
        };
    }, [modelUrl]);

    if (!clonedScene) return null;

    return <primitive object={clonedScene} />;
};

export default function Scene({ datas, centerModel = true }: { datas: any; centerModel?: boolean }) {
    const [modelStats, setModelStats] = useState<ModelStats | null>(null);
    const [currentModelUrl, setCurrentModelUrl] = useState<string | null>(null);
    const [isPRBEnabled, setIsPRBEnabled] = useState(false);
    const [isWhiteModeEnabled, setIsWhiteModeEnabled] = useState(false);
    const [isWireframeEnabled, setIsWireframeEnabled] = useState(false);
    const [isAutoRotateEnabled, setIsAutoRotateEnabled] = useState(false);
    const gridPositionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const sceneRef = useRef<THREE.Scene | null>(null);

    // 检测是否支持体素渲染（检查 WebGL 扩展）
    const [supportsVoxel, setSupportsVoxel] = useState(true);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (gl) {
            // 检查是否支持必要的扩展
            const extensions = gl.getSupportedExtensions() || [];
            // 检查是否支持纹理数组、3D 纹理等体素渲染需要的扩展
            const hasVoxelSupport = extensions.some(ext => ext.includes('texture') || ext.includes('3d') || ext.includes('array'));
            setSupportsVoxel(hasVoxelSupport);
        }
    }, []);

    const allFiles = useMemo(() => {
        return datas.model_url?.all_files || [];
    }, [datas.model_url?.all_files]);

    // 直接使用 allFiles 数组中的最后一个文件
    const defaultModelUrl = useMemo(() => {
        if (allFiles.length === 0) return null;
        return allFiles[allFiles.length - 1];
    }, [allFiles]);

    // 设置当前模型URL
    useEffect(() => {
        if (defaultModelUrl) {
            setCurrentModelUrl(defaultModelUrl);
        }
    }, [defaultModelUrl]);

    // 预加载所有模型（利用 useGLTF 的缓存机制）
    useEffect(() => {
        if (allFiles.length > 0) {
            allFiles.forEach((url: string) => {
                if (url) {
                    // 预加载模型，useGLTF 会自动缓存
                    useGLTF.preload(url);
                }
            });
        }
    }, [allFiles]);

    const handleStatsUpdate = (stats: ModelStats) => {
        setModelStats(stats);
    };

    return (
        <Suspense fallback={<Loading />}>
            <div className="relative h-full w-full">
                {/* 模型信息标签 */}
                {datas.type && (
                    <div className="absolute top-2 left-2 flex gap-2 sm:top-4 sm:left-4">
                        <Badge variant="secondary" className="border-green-600/30 bg-green-600/20 text-xs text-green-400 sm:text-sm">
                            {datas.type === '1' && 'Text'}
                            {datas.type === '2' && 'Image'}
                            {datas.type === '3' && 'Multi-view'}
                        </Badge>
                        {allFiles.length > 1 && (
                            <Badge variant="secondary" className="border-blue-600/30 bg-blue-600/20 text-xs text-blue-400 sm:text-sm">
                                {currentModelUrl?.includes('white') ? 'White Model' : 'Textured Model'}
                            </Badge>
                        )}
                        <Badge variant="secondary" className="border-blue-600/30 bg-blue-600/20 text-xs text-blue-400 sm:text-sm">
                            {datas.ai_model === '3' ? 'Hunyuan3D-3' : 'Hunyuan3D-2'}
                        </Badge>
                    </div>
                )}

                <ModelInfoPanel stats={modelStats} />
                <ModelToolbar
                    currentModelUrl={currentModelUrl}
                    onPRBToggle={() => setIsPRBEnabled(!isPRBEnabled)}
                    isPRBEnabled={isPRBEnabled}
                    onWhiteModeToggle={() => setIsWhiteModeEnabled(!isWhiteModeEnabled)}
                    isWhiteModeEnabled={isWhiteModeEnabled}
                    onWireframeToggle={() => setIsWireframeEnabled(!isWireframeEnabled)}
                    isWireframeEnabled={isWireframeEnabled}
                    onAutoRotateToggle={() => setIsAutoRotateEnabled(!isAutoRotateEnabled)}
                    isAutoRotateEnabled={isAutoRotateEnabled}
                />

                <Canvas
                    camera={{ position: [0, 1, 5], fov: 50 }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {/* 增强的环境光 */}
                    <ambientLight intensity={4} />

                    {/* 主光源 */}
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={6}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />

                    {/* 补充光源 */}
                    {/* <directionalLight position={[-5, 5, 5]} intensity={2.0} />
                    <directionalLight position={[0, 10, -5]} intensity={3.2} />
                    <directionalLight position={[5, -5, 5]} intensity={3.2} /> */}

                    {/* 点光源 */}
                    {/* <pointLight position={[0, 5, 0]} intensity={1.6} distance={20} />
                    <pointLight position={[-3, 3, 3]} intensity={1.0} distance={15} />
                    <pointLight position={[3, 3, 3]} intensity={1.0} distance={15} /> */}

                    {/* 聚光灯 */}
                    {/* <spotLight position={[0, 15, 0]} angle={0.3} penumbra={0.5} intensity={2.0} castShadow /> */}

                    {currentModelUrl && (
                        <ModelLoader
                            modelUrl={currentModelUrl}
                            onStatsUpdate={handleStatsUpdate}
                            isPRBEnabled={isPRBEnabled}
                            isWhiteModeEnabled={isWhiteModeEnabled}
                            isWireframeEnabled={isWireframeEnabled}
                            sceneRef={sceneRef}
                            centerModel={centerModel}
                            onGridPositionUpdate={pos => {
                                gridPositionRef.current.copy(pos);
                            }}
                        />
                    )}

                    {/* 自动旋转控制器 */}
                    <AutoRotateController enabled={isAutoRotateEnabled} sceneRef={sceneRef} />

                    <Grid
                        args={[8, 8]} // 减小网格大小
                        cellSize={0.5}
                        cellThickness={0.6} // 增加线条粗细
                        cellColor="#5B6B7D" // 调亮网格线颜色
                        sectionSize={2}
                        sectionThickness={1.2} // 增加分区线条粗细
                        sectionColor="#9CA3AF" // 调亮分区颜色
                        fadeDistance={25} // 增加淡出距离
                        fadeStrength={0.3} // 减小淡出强度，让网格更明显
                        followCamera={false}
                        infiniteGrid={false}
                        position={[gridPositionRef.current.x, gridPositionRef.current.y, gridPositionRef.current.z]} // Grid 位置跟随模型底部
                    />

                    <CameraControls
                        minDistance={2}
                        maxDistance={20}
                        enableDamping={true}
                        dampingFactor={0.05}
                        target={[0, 0, 0]} // 相机目标点在原点（网格中心）
                    />

                    {/* Gizmo辅助器 */}
                    <GizmoHelper>
                        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
                    </GizmoHelper>
                </Canvas>
            </div>
        </Suspense>
    );
}
