import NumberFlow from '@number-flow/react';
import { motion } from 'framer-motion';
import { Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import intl from 'react-intl-universal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@components/ui/tooltip';
import { useUserStore } from '@/store/userStore';
import { isEmpty } from '@/utils';
import { useVNavigate } from '@/hooks/useVNavigate';
import { APP_DOMAIN_URL } from '@/config';

export type PlanLevel = 'free' | 'basic' | 'pro' | string;

export interface PricingFeature {
    name: string;
    description?: string;
    includedPlans: PlanLevel[];
    planLimits?: Partial<Record<PlanLevel, string | number | boolean>>;
    category?: string;
    point?: {
        monthly: number;
        quarter: number;
    };
}

export interface PricingPlan {
    name: string;
    level: PlanLevel;
    downloadCount?: number;
    price: {
        monthly: number;
        quarter: number;
    };
    point: {
        monthly: number;
        quarter: number;
    };
    popular?: boolean;
    description?: string;
    features?: string[];
    buttonText?: string;
    badge?: string;
    highlight?: boolean;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
    onPlanSelect?: (plan: PlanLevel) => void;
    defaultPlan?: PlanLevel;
    defaultInterval?: 'monthly' | 'quarter';
    containerClassName?: string;
    buttonClassName?: string;
    showMobileView?: boolean;
    title?: string;
    subtitle?: string;
}

export function Price({
    onPlanSelect,
    defaultPlan = 'pro',
    defaultInterval = 'monthly',
    className,
    containerClassName,
    buttonClassName,
    showMobileView = false,
    title = intl.get('pricingTable.title'),
    subtitle = intl.get('pricingTable.subtitle'),
    ...props
}: PricingTableProps) {
    // 定价数据 - 完全按照图片设计
    const features = [
        {
            name: intl.get('features.neonEssence'),
            point: true,
            description: [
                {
                    level: 'free',
                    message: intl.get('features.limits.free.neonEssence')
                },
                {
                    level: 'basic',
                    message: intl.get('features.limits.basic.neonEssence')
                },
                {
                    level: 'pro',
                    message: intl.get('features.limits.pro.neonEssence')
                }
            ],
            includedPlans: ['free', 'basic', 'pro']
        },
        {
            name: intl.get('features.downloadCount'),
            includedPlans: ['free']
        },
        {
            name: intl.get('features.moreDownloadCount'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.mutiView'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.agreement'),
            link: 'https://creativecommons.org/licenses/by/4.0/',
            linkName: 'CC BY 4.0',
            includedPlans: ['free']
        },
        {
            name: intl.get('features.inspirationRadar'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.socialMediaSync'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.checkBoxRembg'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.dataAnalysis'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.permanentStorage'),
            includedPlans: ['basic', 'pro']
        },
        {
            name: intl.get('features.aiGenerateImage'),
            includedPlans: ['free', 'basic', 'pro']
        },
        {
            name: intl.get('features.free.permanentStorage'),
            includedPlans: ['free']
        },
        {
            name: intl.get('features.customerSupport'),
            includedPlans: ['basic', 'pro']
        }
    ];

    const plans: PricingPlan[] = [
        {
            name: 'Free',
            level: 'free',
            point: { monthly: 500, quarter: 1500 },
            price: { monthly: 0, quarter: 0 },
            buttonText: intl.get('plans.free.button')
        },
        {
            name: 'Basic',
            level: 'basic',
            popular: true,
            point: { monthly: 1500, quarter: 4500 },
            price: { monthly: 9.9, quarter: 26.9 },
            buttonText: intl.get('plans.basic.button')
        },
        {
            name: 'Pro',
            level: 'pro',
            point: { monthly: 4000, quarter: 12000 },
            price: { monthly: 19.9, quarter: 53.9 },
            buttonText: intl.get('plans.pro.button')
        }
    ];

    const [isQuarter, setIsQuarter] = useState(defaultInterval === 'quarter');
    const [selectedPlan, setSelectedPlan] = useState<PlanLevel>(defaultPlan);
    const { userInfor, getPayUrl, isPayLoading } = useUserStore();
    const navigate = useVNavigate();

    const handlePlanSelect = (plan: PlanLevel, isQuarter: boolean) => {
        setSelectedPlan(plan);
        onPlanSelect?.(plan);

        if (isEmpty(userInfor)) {
            navigate(`${APP_DOMAIN_URL}/login`);
        } else {
            if (plan === 'free') {
                navigate(`${APP_DOMAIN_URL}/ai-generates-3d`);
            } else {
                getPayUrl(plan, isQuarter);
            }
        }
    };

    return (
        <section className={cn('py-0', containerClassName)}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                {/* 标题区域 */}
                <div className="mb-8 text-center sm:mb-12">
                    <motion.h1
                        className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-300 sm:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* 计费周期切换 */}
                    <div className="mt-6 flex justify-center sm:mt-8">
                        <div className="inline-flex items-center rounded-xl bg-[#262626] p-1 sm:p-2">
                            <button
                                type="button"
                                onClick={() => setIsQuarter(false)}
                                className={cn(
                                    'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-8 sm:py-3 sm:text-base',
                                    !isQuarter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'
                                )}
                            >
                                {intl.get('pricingTable.monthly')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsQuarter(true)}
                                className={cn(
                                    'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-8 sm:py-3 sm:text-base',
                                    isQuarter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-white'
                                )}
                            >
                                {intl.get('pricingTable.quarter')}
                                <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800 sm:ml-3 sm:px-3 sm:py-1 sm:text-sm">
                                    {intl.get('pricingTable.quarterSave')}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 价格卡片网格 - 响应式布局 */}
                <div className="mx-auto grid gap-4 sm:gap-6 sm:px-0 lg:grid-cols-3 lg:gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.level}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={cn(
                                'relative cursor-pointer rounded-md p-4 transition-all duration-300 hover:scale-105 sm:p-6 lg:p-8',
                                plan.popular ? 'bg-[#262626]' : 'bg-[#262626]',
                                selectedPlan === plan.level && ''
                            )}
                        >
                            {/* 推荐标签 */}
                            {plan.popular && (
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 sm:-top-4">
                                    <span className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1 text-xs font-bold text-white sm:px-4 sm:py-2 sm:text-sm">Popular</span>
                                </div>
                            )}

                            <div className="flex h-full flex-col">
                                {/* 计划名称和价格 */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white sm:text-2xl">{plan.name}</h3>
                                    <div className="mt-3 flex items-baseline justify-center gap-1 sm:mt-4 sm:gap-2">
                                        <NumberFlow
                                            // format={{
                                            //     style: 'currency',
                                            //     currency: 'USD',
                                            //     trailingZeroDisplay: 'stripIfInteger'
                                            // }}
                                            value={isQuarter ? plan.price.quarter : plan.price.monthly}
                                            className="text-3xl font-bold text-white sm:text-4xl"
                                        />
                                        <span className="text-sm text-gray-400 sm:text-base">/{isQuarter ? intl.get('pricingTable.quarter') : intl.get('pricingTable.month')}</span>
                                    </div>
                                    {plan.description && <p className="mt-2 text-sm text-gray-300 sm:mt-3">{plan.description}</p>}
                                </div>

                                {/* 功能列表 */}
                                <div className="mt-4 flex-1 space-y-3 sm:mt-6 sm:space-y-4">
                                    {features.map(feature => {
                                        let featureName: string | React.ReactNode = feature.name;
                                        const isIncluded = feature.includedPlans.includes(plan.level);

                                        let point = '';

                                        if (feature.point) {
                                            point = isQuarter ? plan.point.quarter.toString() : plan.point.monthly.toString();
                                        }

                                        let downloadCount: number | string = '';

                                        if (plan.downloadCount) {
                                            downloadCount = plan.downloadCount;
                                        }

                                        if (feature.link) {
                                            featureName = (
                                                <a href={feature.link} target="_blank" className="text-xs text-gray-300 hover:text-white hover:underline sm:text-sm">
                                                    {featureName}
                                                </a>
                                            );
                                        }

                                        return (
                                            isIncluded && (
                                                <div key={feature.name} className="flex items-center gap-3">
                                                    <div className="flex h-4 w-4 items-center justify-center rounded-full sm:h-5 sm:w-5">
                                                        <Check className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-300 sm:text-sm">
                                                            {point} {featureName}
                                                        </span>
                                                        {feature.description && feature.description.length > 0 && (
                                                            <TooltipProvider delayDuration={100}>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <HelpCircle className="h-3 w-3 cursor-help text-gray-500 transition-colors hover:text-gray-400" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="max-w-xs">
                                                                        <div className="space-y-1">
                                                                            <p className="text-xs">
                                                                                {feature.description?.find(item => item.level === plan.level)?.message || 'No description available'}
                                                                            </p>
                                                                        </div>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        );
                                    })}
                                </div>

                                {/* 按钮 */}
                                <div className="mt-4 pt-4 sm:mt-6 sm:pt-6">
                                    <Button
                                        onClick={() => handlePlanSelect(plan.level, isQuarter)}
                                        className={cn(
                                            'w-full rounded-md py-3 text-sm font-semibold transition-all duration-200 sm:py-4 sm:text-base',
                                            plan.popular ? 'bg-white text-gray-900 hover:bg-white/90' : 'bg-[#0a0a0a] text-white hover:bg-[#262626]'
                                        )}
                                        loading={isPayLoading}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
