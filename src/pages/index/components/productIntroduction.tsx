import { motion, useReducedMotion } from 'framer-motion';
import { Box, Eye, Layers3, Move3D, Palette } from 'lucide-react';
import { useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { useI18nStore } from '@/store/i18nStore';
import { cn } from '@/lib/utils';

export function ProductIntroduction(props: { containerClassName: string }) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const { lang } = useI18nStore();

    // 重新设计的特色功能配置 - 更精准的色彩和层次
    const features = useMemo(
        () => [
            {
                id: 1,
                title: intl.get('landing.productFeatures.feature1.title'),
                subtitle: intl.get('landing.productFeatures.feature1.subTitle'),
                icon: Box,
                gridClass: 'md:col-span-2',
                // 深度蓝色系 - 专业、可靠
                accentColor: '#0EA5E9',
                glowColor: 'rgba(14, 165, 233, 0.15)',
                iconBg: 'from-sky-500/20 to-blue-600/20'
            },
            {
                id: 2,
                title: intl.get('landing.productFeatures.feature2.title'),
                subtitle: intl.get('landing.productFeatures.feature2.subTitle'),
                icon: Eye,
                gridClass: 'md:col-span-1',
                // 紫色系 - 创新、洞察
                accentColor: '#8B5CF6',
                glowColor: 'rgba(139, 92, 246, 0.15)',
                iconBg: 'from-violet-500/20 to-purple-600/20'
            },
            {
                id: 3,
                title: intl.get('landing.productFeatures.feature3.title'),
                subtitle: intl.get('landing.productFeatures.feature3.subTitle'),
                icon: Palette,
                gridClass: 'md:col-span-1',
                // 翠绿色系 - 创造、生机
                accentColor: '#10B981',
                glowColor: 'rgba(16, 185, 129, 0.15)',
                iconBg: 'from-emerald-500/20 to-green-600/20'
            },
            {
                id: 4,
                title: intl.get('landing.productFeatures.feature4.title'),
                subtitle: intl.get('landing.productFeatures.feature4.subTitle'),
                icon: Layers3,
                gridClass: 'md:col-span-2',
                // 橙色系 - 活力、效率
                accentColor: '#F59E0B',
                glowColor: 'rgba(245, 158, 11, 0.15)',
                iconBg: 'from-amber-500/20 to-orange-600/20'
            },
            {
                id: 5,
                title: intl.get('landing.productFeatures.feature5.title'),
                subtitle: intl.get('landing.productFeatures.feature5.subTitle'),
                icon: Move3D,
                gridClass: 'md:col-span-3',
                // 靛蓝色系 - 深度、技术
                accentColor: '#6366F1',
                glowColor: 'rgba(99, 102, 241, 0.15)',
                iconBg: 'from-indigo-500/20 to-blue-500/20'
            }
        ],
        [lang] // 添加 lang 依赖，语言切换时重新计算
    );

    // 精简但有效的动画配置
    const containerVariants = useMemo(
        () => ({
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.1,
                    delayChildren: shouldReduceMotion ? 0 : 0.2
                }
            }
        }),
        [shouldReduceMotion]
    );

    const itemVariants = useMemo(
        () => ({
            hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 20,
                scale: shouldReduceMotion ? 1 : 0.95
            },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: shouldReduceMotion ? 0.2 : 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94] // 更自然的缓动
                }
            }
        }),
        [shouldReduceMotion]
    );

    return (
        <section className={props.containerClassName}>
            <div className="mx-auto flex flex-col items-center gap-6 text-center sm:gap-12 lg:gap-16">
                {/* 标题区域 - 更强的视觉层次 */}
                <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                    <motion.h1
                        className="mb-6 text-4xl font-bold text-white sm:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {intl.get('landing.productFeatures.title')}
                    </motion.h1>

                    <motion.p
                        className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-white/80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {intl.get('landing.productFeatures.subTitle')}
                    </motion.p>
                </motion.div>

                {/* 功能特性网格 - 重新设计的卡片 */}
                <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
                    {features.map(feature => {
                        const IconComponent = feature.icon;
                        const isHovered = hoveredCard === feature.id;

                        return (
                            <motion.div
                                key={feature.id}
                                // @ts-ignore
                                variants={itemVariants}
                                className={cn('group relative cursor-pointer', feature.gridClass)}
                                onMouseEnter={() => setHoveredCard(feature.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* 主卡片容器 */}
                                <div className="relative h-full overflow-hidden rounded-md border border-white/12 bg-white/[0.04] backdrop-blur-xl transition-all duration-700 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/10">
                                    {/* 悬停时的发光效果 */}
                                    <div
                                        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                        style={{
                                            background: `radial-gradient(600px circle at 50% 50%, ${feature.glowColor}, transparent 40%)`
                                        }}
                                    />

                                    {/* 顶部装饰线 */}
                                    <div
                                        className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                        style={{ color: feature.accentColor }}
                                    />

                                    <div className="relative p-8">
                                        {/* 图标区域 */}
                                        <div className="mb-6">
                                            <div
                                                className={cn(
                                                    'relative inline-flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br shadow-lg transition-all duration-500',
                                                    feature.iconBg,
                                                    'group-hover:scale-110 group-hover:shadow-xl'
                                                )}
                                            >
                                                {/* 图标背景光晕 */}
                                                <div
                                                    className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                                                    style={{ backgroundColor: feature.accentColor }}
                                                />
                                                <IconComponent
                                                    className="relative z-10 h-7 w-7 transition-colors duration-500"
                                                    style={{
                                                        color: isHovered ? feature.accentColor : '#ffffff'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* 内容区域 */}
                                        <div className="space-y-3">
                                            <h3
                                                className="text-xl leading-tight font-bold transition-colors duration-500"
                                                style={{
                                                    color: isHovered ? feature.accentColor : '#FFFFFF'
                                                }}
                                            >
                                                {feature.title}
                                            </h3>
                                            <p className="leading-relaxed font-medium text-white/75 transition-colors duration-500 group-hover:text-white/90">{feature.subtitle}</p>
                                        </div>

                                        {/* 底部装饰 */}
                                        <div className="absolute right-8 bottom-0 left-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
