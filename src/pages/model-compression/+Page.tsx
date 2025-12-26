import { PageSEO } from '@/components/seo/pageSEO';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, RotateCcw, Zap, Shield, Globe, FileText, Package, Compass, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MainLayout from '@/components/layouts/mainLayout';
import { loadFileAsArrayBuffer } from '@/utils';
import intl from 'react-intl-universal';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { useI18nStore } from '@/store/i18nStore';

export function Page() {
    const { lang } = useI18nStore();
    return (
        <>
            <PageSEO pageKey="modelCompression" />
            <ModelCompressor />
        </>
    );
}

function ModelCompressor() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFormat, setSelectedFormat] = useState('glb');
    const [compressionLevel, setCompressionLevel] = useState('medium');
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
    const [fileInfo, setFileInfo] = useState<{
        name: string;
        size: number;
        type: string;
    } | null>(null);
    const [compressionStats, setCompressionStats] = useState<{
        originalSize: number;
        compressedSize: number;
        compressionRatio: number;
        savedSpace: number;
    } | null>(null);

    // 支持的格式选项
    const formatOptions = [
        { value: 'glb', label: 'GLB', description: 'Binary GLTF format' },
        { value: 'gltf', label: 'GLTF', description: 'JSON-based 3D format' },
        { value: 'obj', label: 'OBJ', description: 'Wavefront OBJ format' },
        { value: 'fbx', label: 'FBX', description: 'Autodesk FBX format' },
        { value: 'dae', label: 'DAE', description: 'Collada format' }
    ];

    // 压缩级别选项
    const compressionLevels = [
        { value: 'low', label: '轻度压缩', description: '保持最高质量', ratio: 0.1 },
        { value: 'medium', label: '中等压缩', description: '平衡质量与大小', ratio: 0.3 },
        { value: 'high', label: '高度压缩', description: '最大压缩比', ratio: 0.5 }
    ];

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setOriginalFile(file);
        setFileInfo({
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream'
        });
        setCompressedFile(null);
        setCompressionStats(null);
    };

    const compressModel = async () => {
        if (!originalFile) {
            alert('请先上传模型文件');
            return;
        }

        setIsCompressing(true);
        setCompressionProgress(0);

        try {
            const loader = new GLTFLoader();
            const exporter = new GLTFExporter();

            // 模拟进度更新
            const progressInterval = setInterval(() => {
                setCompressionProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            // 1. 读取文件
            setCompressionProgress(10);
            const arrayBuffer = await loadFileAsArrayBuffer(originalFile);

            // 2. 加载模型
            setCompressionProgress(30);
            const gltf = await new Promise((resolve, reject) => {
                loader.parse(
                    arrayBuffer as ArrayBuffer,
                    '',
                    gltf => resolve(gltf),
                    error => reject(error)
                );
            });

            setCompressionProgress(60);

            // 3. 获取压缩级别设置
            const currentLevel = compressionLevels.find(level => level.value === compressionLevel);
            let compressionRatio = currentLevel?.ratio || 0.3;

            // 4. 导出压缩后的模型
            const exportedData = await new Promise((resolve, reject) => {
                exporter.parse(
                    (gltf as any).scene,
                    result => {
                        setCompressionProgress(90);
                        resolve(result);
                    },
                    error => reject(error),
                    {
                        binary: selectedFormat === 'glb',
                        embedImages: true,
                        animations: true,
                        trs: false,
                        onlyVisible: true,
                        truncateDrawRange: true,
                        // 压缩设置
                        draco: {
                            quantizationBits: {
                                POSITION: 14,
                                NORMAL: 10,
                                COLOR: 8,
                                TEX_COORD: 12
                            }
                        }
                    }
                );
            });

            setCompressionProgress(100);

            // 5. 创建压缩后的文件
            let blob: Blob;
            if (selectedFormat === 'glb') {
                blob = new Blob([exportedData as ArrayBuffer], { type: 'model/gltf-binary' });
            } else {
                blob = new Blob([JSON.stringify(exportedData, null, 2)], { type: 'application/json' });
            }

            setCompressedFile(blob);

            // 6. 计算压缩统计信息
            const originalSize = originalFile.size;
            const compressedSize = blob.size;
            const savedSpace = originalSize - compressedSize;
            compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

            setCompressionStats({
                originalSize,
                compressedSize,
                compressionRatio,
                savedSpace
            });

            clearInterval(progressInterval);
        } catch (error) {
            console.error('压缩失败:', error);
            alert('压缩失败: ' + (error as Error).message);
        } finally {
            setIsCompressing(false);
            setCompressionProgress(0);
        }
    };

    const downloadCompressedFile = () => {
        if (!compressedFile || !fileInfo) return;

        const extension = selectedFormat === 'glb' ? '.glb' : '.gltf';
        const filename = fileInfo.name.replace(/\.[^/.]+$/, '') + '_compressed' + extension;

        const url = URL.createObjectURL(compressedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const resetCompressor = () => {
        setOriginalFile(null);
        setCompressedFile(null);
        setFileInfo(null);
        setCompressionStats(null);
        setCompressionProgress(0);
        setIsCompressing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <MainLayout isLanding={true}>
            <section className="pb-24 md:container lg:container">
                {/* 主要内容区域 */}
                <div className="gap-6 sm:gap-12 lg:gap-16">
                    {/* 标题区域 */}
                    <div className="mt-24 mb-24 text-center">
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 text-4xl font-bold text-white md:text-5xl">
                            {intl.get('modelCompression.title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6 text-lg text-gray-300">
                            {intl.get('modelCompression.description')}
                        </motion.p>
                    </div>

                    {/* 压缩器主界面 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mx-auto mb-16 max-w-4xl">
                        <Card className="border-gray-700 bg-gray-900/50">
                            <CardContent className="p-8">
                                {/* 文件上传区域 */}
                                <div className="mb-8 text-center">
                                    <div
                                        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-8 transition-colors hover:border-[#0084d1]"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                        <p className="mb-2 text-gray-300">{intl.get('modelCompression.upload')}</p>
                                        <p className="text-sm text-gray-500">{intl.get('modelCompression.uploadDescription')}</p>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept=".gltf,.glb,.obj,.fbx,.dae" onChange={handleFileUpload} className="hidden" />
                                </div>

                                {/* 文件信息显示 */}
                                {fileInfo && (
                                    <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="h-5 w-5 text-[#0084d1]" />
                                                <div>
                                                    <p className="font-medium text-white">{fileInfo.name}</p>
                                                    <p className="text-sm text-gray-400">{formatFileSize(fileInfo.size)}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="border-[#0084d1] text-[#0084d1]">
                                                {fileInfo.name.split('.').pop()?.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                )}

                                {/* 压缩统计信息 */}
                                {compressionStats && (
                                    <div className="mb-6 rounded-lg bg-gray-800/50 p-6">
                                        <h3 className="mb-4 text-lg font-semibold text-white">{intl.get('modelCompression.result')}</h3>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400">{intl.get('modelCompression.originalSize')}</p>
                                                <p className="text-lg font-bold text-red-400">{formatFileSize(compressionStats.originalSize)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400">{intl.get('modelCompression.compressedSize')}</p>
                                                <p className="text-lg font-bold text-green-400">{formatFileSize(compressionStats.compressedSize)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400">{intl.get('modelCompression.compressionRatio')}</p>
                                                <p className="text-lg font-bold text-[#0084d1]">{compressionStats.compressionRatio.toFixed(1)}%</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-400">{intl.get('modelCompression.savedSpace')}</p>
                                                <p className="text-lg font-bold text-purple-400">{formatFileSize(compressionStats.savedSpace)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 压缩进度 */}
                                {isCompressing && (
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm text-gray-300">{intl.get('modelCompression.progress')}</span>
                                            <span className="text-sm text-[#0084d1]">{compressionProgress}%</span>
                                        </div>
                                        <Progress value={compressionProgress} className="h-2" />
                                    </div>
                                )}

                                {/* 操作按钮 */}
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <Button onClick={compressModel} disabled={!originalFile || isCompressing} className="flex-1 bg-[#0084d1] hover:bg-[#0073b8]">
                                        {isCompressing ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="mr-2">
                                                    <RotateCcw className="h-4 w-4" />
                                                </motion.div>
                                                {intl.get('modelCompression.compressing')}
                                            </>
                                        ) : (
                                            <>
                                                <Compass className="mr-2 h-4 w-4" />
                                                {intl.get('modelCompression.compress')}
                                            </>
                                        )}
                                    </Button>

                                    {compressedFile && (
                                        <Button onClick={downloadCompressedFile} variant="outline" className="flex-1 border-[#0084d1] text-[#0084d1] hover:bg-[#0084d1] hover:text-white">
                                            <Download className="mr-2 h-4 w-4" />
                                            {intl.get('modelCompression.download')}
                                        </Button>
                                    )}

                                    <Button onClick={resetCompressor} variant="ghost" className="flex-1 text-gray-400 hover:text-white">
                                        {intl.get('modelCompression.reset')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 功能特性 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-16">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('modelCompression.whyChoose')}</h2>
                            <p className="text-lg text-gray-300">{intl.get('modelCompression.whyChooseDescription')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0084d1]/20">
                                        <TrendingDown className="h-8 w-8 text-[#0084d1]" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('modelCompression.smartCompression')}</h3>
                                    <p className="text-gray-300">{intl.get('modelCompression.smartCompressionDescription')}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                                        <Shield className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('modelCompression.dataSecurity')}</h3>
                                    <p className="text-gray-300">{intl.get('modelCompression.dataSecurityDescription')}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                                        <Globe className="h-8 w-8 text-purple-500" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('modelCompression.multiFormatSupport')}</h3>
                                    <p className="text-gray-300">{intl.get('modelCompression.multiFormatSupportDescription')}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* 使用说明 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mb-16">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('modelCompression.howToUse')}</h2>
                            <p className="text-lg text-gray-300">{intl.get('modelCompression.howToUseDescription')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0084d1]">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('modelCompression.selectFormat')}</h3>
                                <p className="text-gray-300">{intl.get('modelCompression.selectFormatDescription')}</p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('modelCompression.uploadFile')}</h3>
                                <p className="text-gray-300">{intl.get('modelCompression.uploadFileDescription')}</p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('modelCompression.downloadResult')}</h3>
                                <p className="text-gray-300">{intl.get('modelCompression.downloadResultDescription')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 常见问题 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('modelCompression.faq')}</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="cursor-pointer border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('modelCompression.faq.question1')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('modelCompression.faq.answer1')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('modelCompression.faq.question2')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('modelCompression.faq.answer2')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('modelCompression.faq.question3')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('modelCompression.faq.answer3')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('modelCompression.faq.question4')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('modelCompression.faq.answer4')}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
