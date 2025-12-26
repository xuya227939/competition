import type { ImonialAuthor } from '@/components/ui/imonial-card';
import { ImonialCard } from '@/components/ui/imonial-card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import intl from 'react-intl-universal';

interface ImonialsSectionProps {
    title: string;
    description: string;
    imonials: Array<{
        author: ImonialAuthor;
        text: string;
        title?: string;
        href?: string;
    }>;
    className?: string;
}

export function Evaluate() {
    const imonials = [
        {
            author: {
                name: intl.get('landing.userEvaluate2.name'),
                handle: intl.get('landing.userEvaluate2.company'),
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            },
            text: intl.get('landing.userEvaluate2.subTitle'),
            title: intl.get('landing.userEvaluate2.title')
        },
        {
            author: {
                name: intl.get('landing.userEvaluate3.name'),
                handle: intl.get('landing.userEvaluate3.company'),
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
            },
            text: intl.get('landing.userEvaluate3.subTitle'),
            title: intl.get('landing.userEvaluate3.title')
        },
        {
            author: {
                name: intl.get('landing.userEvaluate4.name'),
                handle: intl.get('landing.userEvaluate4.company'),
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            },
            text: intl.get('landing.userEvaluate4.subTitle'),
            title: intl.get('landing.userEvaluate4.title')
        },
        {
            author: {
                name: intl.get('landing.userEvaluate5.name'),
                handle: intl.get('landing.userEvaluate5.company'),
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
            },
            text: intl.get('landing.userEvaluate5.subTitle'),
            title: intl.get('landing.userEvaluate5.title')
        },
        {
            author: {
                name: intl.get('landing.userEvaluate6.name'),
                handle: intl.get('landing.userEvaluate6.company'),
                avatar: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=150&h=150&fit=crop&crop=face'
            },
            text: intl.get('landing.userEvaluate6.subTitle'),
            title: intl.get('landing.userEvaluate6.title')
        }
    ];
    return (
        <div className="relative w-full">
            <ImonialsSection title={intl.get('landing.userEvaluate1.title')} description={intl.get('landing.userEvaluate1.subTitle')} imonials={imonials} className="relative z-10" />
        </div>
    );
}

function ImonialsSection({ title, description, imonials, className }: ImonialsSectionProps) {
    return (
        <section className={cn('relative w-full bg-[#070707]', 'px-0 py-12', className)}>
            <div className="mx-auto flex flex-col items-center gap-6 text-center sm:gap-12 lg:gap-16">
                <div className="flex flex-col items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <motion.h1
                            className="mb-6 text-4xl font-bold text-white sm:text-5xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {title}
                        </motion.h1>
                        <motion.h2
                            className="text-xl leading-relaxed font-medium text-white/80"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {description}
                        </motion.h2>
                    </motion.div>
                </div>

                <div className="relative flex w-full flex-col items-center">
                    {/* 移动端：单列布局 */}
                    <div className="block w-full sm:hidden">
                        <div className="grid gap-4">
                            {imonials.slice(0, 3).map((testimonial, i) => (
                                <ImonialCard key={i} {...testimonial} className="mx-auto w-full max-w-sm cursor-pointer" />
                            ))}
                        </div>
                    </div>

                    {/* 平板端：双列网格布局 */}
                    <div className="hidden w-full sm:block lg:hidden">
                        <div className="grid grid-cols-2 gap-4 px-4 md:gap-6">
                            <div className="group flex flex-row [gap:var(--gap)] overflow-visible p-4 [--duration:120s] [--gap:1.5rem] lg:[--gap:2rem] xl:[--gap:2.5rem]">
                                <div className="animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
                                    {[...Array.from({ length: 4 })].map((_, setIndex) =>
                                        imonials.map((imonial, i) => <ImonialCard key={`${setIndex}-${i}`} {...imonial} className="min-h-[200px] min-w-[350px] cursor-pointer" />)
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* iPad Pro 和大平板：三列网格布局 */}
                    <div className="hidden w-full lg:block xl:hidden">
                        <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-3 lg:gap-6">
                            <div className="group flex flex-row [gap:var(--gap)] overflow-visible p-4 [--duration:120s] [--gap:1.5rem] lg:[--gap:2rem] xl:[--gap:2.5rem]">
                                <div className="animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
                                    {[...Array.from({ length: 4 })].map((_, setIndex) =>
                                        imonials.map((imonial, i) => <ImonialCard key={`${setIndex}-${i}`} {...imonial} className="min-h-[200px] min-w-[350px] cursor-pointer" />)
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 超大屏幕：滚动动画 */}
                    <div className="hidden w-full xl:block">
                        <div className="group flex flex-row [gap:var(--gap)] overflow-visible p-4 [--duration:120s] [--gap:1.5rem] lg:[--gap:2rem] xl:[--gap:2.5rem]">
                            <div className="animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
                                {[...Array.from({ length: 4 })].map((_, setIndex) =>
                                    imonials.map((imonial, i) => <ImonialCard key={`${setIndex}-${i}`} {...imonial} className="min-h-[200px] min-w-[350px] cursor-pointer" />)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
