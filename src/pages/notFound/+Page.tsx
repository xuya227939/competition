import MainLayout from '@/components/layouts/mainLayout';
import { useVNavigate } from '@/hooks/useVNavigate';
import { motion, Variants } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import intl from 'react-intl-universal';
import { Button } from '@/components/ui/button';
import { PageSEO } from '@/components/seo/pageSEO';
import { APP_DOMAIN_URL } from '@/config';

export function Page() {
    const navigate = useVNavigate();

    // 动画配置 - 添加类型注解
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    const numberVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.3
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <>
            <PageSEO pageKey="notFound" />
            <MainLayout>
                <div className="md:container lg:container">
                    <motion.div className="flex flex-col items-center justify-center py-20" variants={containerVariants} initial="hidden" animate="visible">
                        {/* 404 数字区域 - 大号显示 */}
                        <motion.div className="relative flex items-center justify-center" variants={itemVariants}>
                            {/* 背景光晕效果 */}
                            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                                <div className="h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
                            </div>

                            {/* 404 数字 */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {['4', '0', '4'].map((num, index) => (
                                    <motion.div key={index} className="relative" variants={numberVariants} whileHover="hover">
                                        <span className="bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-[8rem] font-black text-transparent">{num}</span>
                                        {/* 数字发光效果 */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-[8rem] font-black text-transparent opacity-50 blur-xl">
                                            {num}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 标题和描述 */}
                        <motion.div className="mb-12 text-center" variants={itemVariants}>
                            <p className="mx-auto max-w-md text-lg text-gray-400 sm:text-xl">{intl.get('notFound.subTitle')}</p>

                            {/* 错误代码 */}
                            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-700/50 bg-gray-800/50 px-4 py-2 backdrop-blur-sm">
                                <code className="font-mono text-sm text-gray-400">{intl.get('notFound.errorCode')}</code>
                            </div>
                        </motion.div>

                        {/* 操作按钮 */}
                        <motion.div className="flex flex-col gap-4 sm:flex-row" variants={itemVariants}>
                            <Button variant="primary" size="lg" onClick={() => navigate('/')} icon={<Home className="h-5 w-5" />}>
                                <span className="relative z-10">{intl.get('notFound.homePage')}</span>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.history.back()}
                                className="group border-gray-600 bg-gray-800/50 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-500 hover:bg-gray-700/50 hover:text-white"
                                icon={<ArrowLeft className="h-5 w-5" />}
                            >
                                <span className="relative z-10">{intl.get('notFound.back')}</span>
                            </Button>
                        </motion.div>

                        {/* 装饰性元素 */}
                        <motion.div
                            className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                        />
                    </motion.div>
                </div>
            </MainLayout>
        </>
    );
}
