import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap, Shield, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PageSEO } from '@/components/seo/pageSEO';
import MainLayout from '@/components/layouts/mainLayout';
import { isZip, loadFileAsArrayBuffer, isGlb, isGltf } from '@/utils';
import JSZip from 'jszip';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';
import { Canvas } from '@react-three/fiber';
import { CameraControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Grid } from '@react-three/drei';
import intl from 'react-intl-universal';
import { useI18nStore } from '@/store/i18nStore';

export function Page() {
    const { lang } = useI18nStore();
    return (
        <>
            <PageSEO pageKey="onlineViewer" />
            <OnlineViewer />
        </>
    );
}

function OnlineViewer() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [modelUrl, setModelUrl] = useState('');
    const [scene, setScene] = useState<any | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const buffers = new Map<string, ArrayBuffer>();

            // 1. 读取所有文件为 ArrayBuffer
            await Promise.all(Array.from(event.target.files || []).map(file => loadFileAsArrayBuffer(file).then(buffer => buffers.set(file.name.replace(/^\//, ''), buffer as ArrayBuffer))));

            // 2. 解压 zip 文件
            for (const [path, buffer] of Array.from(buffers.entries())) {
                if (isZip(path)) {
                    const { files } = await JSZip.loadAsync(buffer);
                    for (const [innerPath, file] of Object.entries(files)) {
                        // @ts-ignore
                        const innerBuffer = await file.async('arraybuffer');
                        buffers.set(innerPath, innerBuffer);
                    }
                    buffers.delete(path);
                }
            }

            // 3. 查找 glb/gltf 文件
            const filePath = Array.from(buffers.keys()).find(path => isGlb(path) || isGltf(path));
            if (!filePath) {
                // alert('请上传 glb/gltf 文件或包含 glb/gltf 的 zip 文件');
                return;
            }

            const blob = new Blob([buffers.get(filePath)!], { type: 'model/gltf-binary' });
            const url = URL.createObjectURL(blob);

            setModelUrl(url);
        }
    };

    let scene2: any | null = null;

    if (modelUrl) {
        const { scene } = useGLTF(modelUrl, true);
        scene2 = scene as any;
    }
    useEffect(() => {
        setScene(scene2 as any);
    }, [modelUrl, scene2]);

    return (
        <MainLayout isLanding={true}>
            <section className="pb-24 md:container lg:container">
                {/* 主要内容区域 */}
                <div className="gap-6 sm:gap-12 lg:gap-16">
                    {/* 标题区域 */}
                    <div className="mt-24 mb-24 text-center">
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 text-4xl font-bold text-white md:text-5xl">
                            {intl.get('onlineViewer.title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6 text-lg text-gray-300">
                            {intl.get('onlineViewer.description')}
                        </motion.p>
                    </div>

                    {/* 上传区域 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mx-auto mb-16 max-w-2xl">
                        <div className="space-y-6 text-center">
                            <div
                                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-8 transition-colors hover:border-[#0084d1]"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p className="mb-2 text-gray-300">{intl.get('onlineViewer.upload.supportTitle')}</p>
                                <p className="text-sm text-gray-500">{intl.get('onlineViewer.upload.support')}</p>
                            </div>

                            <input ref={fileInputRef} type="file" accept=".glb,.fbx,.obj" onChange={handleFileUpload} className="hidden" />
                        </div>
                    </motion.div>

                    {/* 3D查看器区域 */}
                    {scene && (
                        <Suspense fallback={<Loading />}>
                            <div className="mb-24 h-100">
                                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[10, 10, 5]} intensity={1} />
                                    <primitive object={scene} />

                                    <Grid
                                        position={[0, -1, 0]}
                                        args={[10, 10]}
                                        cellSize={0.5}
                                        cellThickness={0.5}
                                        cellColor="#6f6f6f"
                                        sectionSize={3}
                                        sectionThickness={1}
                                        sectionColor="#000"
                                        fadeDistance={30}
                                        fadeStrength={1}
                                        followCamera={false}
                                        infiniteGrid={true}
                                    />

                                    <CameraControls />

                                    <GizmoHelper>
                                        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
                                    </GizmoHelper>
                                </Canvas>
                            </div>
                        </Suspense>
                    )}

                    {/* 功能特性 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mb-16">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('onlineViewer.whyChoose.title')}</h2>
                            <p className="text-lg text-gray-300">{intl.get('onlineViewer.whyChoose.description')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0084d1]/20">
                                        <Zap className="h-8 w-8 text-[#0084d1]" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('onlineViewer.whyChoose.feature1.title')}</h3>
                                    <p className="text-gray-300">{intl.get('onlineViewer.whyChoose.feature1.description')}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                                        <Shield className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('onlineViewer.whyChoose.feature2.title')}</h3>
                                    <p className="text-gray-300">{intl.get('onlineViewer.whyChoose.feature2.description')}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                                        <Globe className="h-8 w-8 text-purple-500" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('onlineViewer.whyChoose.feature3.title')}</h3>
                                    <p className="text-gray-300">{intl.get('onlineViewer.whyChoose.feature3.description')}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* 使用说明 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="mb-16">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('onlineViewer.howToUse.title')}</h2>
                            <p className="text-lg text-gray-300">{intl.get('onlineViewer.howToUse.description')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0084d1]">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('onlineViewer.howToUse.step1.title')}</h3>
                                <p className="text-gray-300">{intl.get('onlineViewer.howToUse.step1.description')}</p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('onlineViewer.howToUse.step2.title')}</h3>
                                <p className="text-gray-300">{intl.get('onlineViewer.howToUse.step2.description')}</p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('onlineViewer.howToUse.step3.title')}</h3>
                                <p className="text-gray-300">{intl.get('onlineViewer.howToUse.step3.description')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 常见问题 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('onlineViewer.faq.title')}</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="cursor-pointer border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question1')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer1')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question2')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer2')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question3')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer3')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question4')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer4')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question5')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer5')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question6')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer6')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-7" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question7')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer7')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-8" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('onlineViewer.faq.question8')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('onlineViewer.faq.answer8')}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
