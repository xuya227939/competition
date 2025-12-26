import { useState, useEffect } from 'react';
import { FaqC } from '@components/faq';
import { Price } from '@components/price';
import Threads from '@components/ui/threads';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import intl from 'react-intl-universal';
import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';
import { Button } from '@/components/ui/button';
import { Evaluate } from './components/evaluate';
import { CommunityList } from './components/communityList';
import { ProductIntroduction } from './components/productIntroduction';
import { InviteCard } from './components/inviteCard';
import { useUserStore } from '@/store/userStore';
import { useI18nStore } from '@/store/i18nStore';
import { isEmpty } from '@/utils';
import { APP_DOMAIN_URL } from '@/config';

export function Page() {
    return (
        <>
            <PageSEO pageKey="landing" />
            <Landing />
        </>
    );
}

function Landing() {
    const [code, setCode] = useState('');
    const { userInfor, getInviteUser, inviteUser } = useUserStore();
    const [isLoginDialog, setIsLoginDialog] = useState(false);
    const containerRef = useRef(null);
    const { lang } = useI18nStore();

    // 定义动画变量
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    useEffect(() => {
        const str = new URLSearchParams(window.location.search).get('code');
        if (str) {
            localStorage.setItem('invite_code', str);
            setCode(str);
            getInviteUser(str);
        }
    }, []);

    return (
        <MainLayout isLanding={true}>
            <motion.div ref={containerRef} className="relative min-h-screen overflow-hidden pb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                {!isEmpty(inviteUser?.code) && (
                    <motion.div className="mt-0">
                        <InviteCard inviteUser={inviteUser} onJoinClick={() => setIsLoginDialog(!isLoginDialog)} />
                    </motion.div>
                )}

                <div style={{ width: '100%', height: '800px', position: 'relative' }}>
                    <Threads amplitude={1.5} distance={0} enableMouseInteraction={true} />
                    <motion.h1
                        className="absolute inset-x-0 top-32 mx-auto w-fit max-w-[65vw] bg-gradient-to-b from-white via-white to-white/90 bg-clip-text text-center text-3xl leading-tight font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
                        variants={fadeInUp}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {intl.get('landing.title')}
                    </motion.h1>
                    <div className="absolute bottom-30 left-1/2 flex -translate-x-1/2 gap-4 space-x-4">
                        <Button
                            variant="link"
                            className="neumorphism-glass h-12 rounded-md text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                            onClick={() => {
                                if (!isEmpty(userInfor)) {
                                    window.location.href = `${APP_DOMAIN_URL}/home`;
                                } else {
                                    window.location.href = `${APP_DOMAIN_URL}/login`;
                                }
                            }}
                        >
                            {intl.get('landing.start')}
                        </Button>

                        <Button
                            variant="outline"
                            className={`h-12 rounded-md text-lg font-semibold text-white underline-offset-4 transition-all duration-300 hover:scale-105 hover:text-white hover:underline hover:shadow-lg`}
                            onClick={() => {
                                window.location.href = `${APP_DOMAIN_URL}/community`;
                            }}
                        >
                            {intl.get('landing.creationCollection')}
                        </Button>
                    </div>
                </div>

                {/* 产品特性 */}
                <motion.div className="mt-0">
                    <ProductIntroduction containerClassName="lg:container md:container" />
                </motion.div>

                <motion.div className="mt-32">
                    <CommunityList />
                </motion.div>
                {/* 用户评价 */}
                <motion.div className="mt-32">
                    <Evaluate />
                </motion.div>
                <motion.div className="mt-32">
                    <Price
                        defaultPlan="basic"
                        defaultInterval="monthly"
                        onPlanSelect={plan => {}}
                        // showMobileView={true}
                        buttonClassName="bg-primary hover:bg-primary/90"
                        containerClassName="lg:container md:container"
                    />
                </motion.div>
                <motion.div>
                    <FaqC containerClassName="lg:container md:container" />
                </motion.div>
            </motion.div>
        </MainLayout>
    );
}
