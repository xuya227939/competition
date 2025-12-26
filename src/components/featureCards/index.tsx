import { ImageIcon, Type, Palette, Video, Sparkles, Zap, Crown, Clock } from 'lucide-react';
import { useVNavigate } from '@/hooks/useVNavigate';
import intl from 'react-intl-universal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Price } from '@/components/price';
import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { APP_DOMAIN_URL } from '@/config';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
    gradient: string;
}

const FeatureCard = ({ icon, title, subtitle, onClick, gradient }: FeatureCardProps) => {
    return (
        <div
            className="group cursor-pointer rounded-md border border-gray-700 bg-gray-800/50 pt-2 pr-4 pb-2 pl-4 transition-all duration-300 hover:border-gray-500 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/10"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${gradient}`}>{icon}</div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

// 促销活动Banner组件
const PromoBanner = ({ isUpgradeToPro, setIsUpgradeToPro }: { isUpgradeToPro: boolean; setIsUpgradeToPro: (isUpgradeToPro: boolean) => void }) => {
    return (
        <div className="relative rounded-md border border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 pt-2 pb-2 shadow-2xl">
            {/* 3D立方体装饰 */}
            <div className="absolute inset-0 right-12 left-12 flex items-center justify-between opacity-20">
                <div className="h-16 w-16">
                    <div className="h-full w-full rotate-45 transform rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg"></div>
                </div>
                <div className="h-12 w-12">
                    <div className="h-full w-full rotate-12 transform rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 shadow-lg"></div>
                </div>
                <div className="h-14 w-14">
                    <div className="h-full w-full -rotate-12 transform rounded-lg bg-gradient-to-br from-blue-500 to-purple-400 shadow-lg"></div>
                </div>
                <div className="h-16 w-16">
                    <div className="h-full w-full -rotate-45 transform rounded-lg bg-gradient-to-br from-purple-500 to-blue-400 shadow-lg"></div>
                </div>
            </div>

            {/* 主要内容 */}
            <div className="relative text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg font-semibold text-yellow-400">
                        {intl.get('community.promoBanner.limitTime')} {intl.get('community.promoBanner.code')}
                    </span>
                    <Sparkles className="h-6 w-6 text-yellow-400" />
                </div>

                <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">{intl.get('community.promoBanner.title')}</h2>

                {/* 倒计时和按钮 */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <div className="flex items-center gap-2 text-orange-400">
                        <Clock className="h-5 w-5" />
                        <span className="text-sm font-medium">{intl.get('community.promoBanner.countdown')}</span>
                    </div>

                    <Button variant="primary" onClick={() => setIsUpgradeToPro(!isUpgradeToPro)}>
                        <Crown className="h-5 w-5" />
                        {intl.get('community.promoBanner.upgradeButton')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const FeatureCards = ({ containerClassName }: { containerClassName?: string }) => {
    const navigate = useVNavigate();
    const [isUpgradeToPro, setIsUpgradeToPro] = useState(false);
    const { userInfor } = useUserStore();

    const features = [
        {
            icon: <Type className="h-6 w-6 text-white" />,
            title: intl.get('community.featureCards.textToImage.title'),
            subtitle: intl.get('community.featureCards.textToImage.subtitle'),
            gradient: 'bg-gradient-to-br from-blue-500 to-purple-500',
            onClick: () => navigate(`${APP_DOMAIN_URL}/ai-generates-3d`)
        },
        {
            icon: <ImageIcon className="h-6 w-6 text-white" />,
            title: intl.get('community.featureCards.imageTo3D.title'),
            subtitle: intl.get('community.featureCards.imageTo3D.subtitle'),
            gradient: 'bg-gradient-to-br from-pink-500 to-orange-500',
            onClick: () => navigate(`${APP_DOMAIN_URL}/ai-generates-3d`)
        },
        {
            icon: <ImageIcon className="h-6 w-6 text-white" />,
            title: intl.get('community.featureCards.multiViewTo3D.title'),
            subtitle: intl.get('community.featureCards.multiViewTo3D.subtitle'),
            gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
            onClick: () => navigate(`${APP_DOMAIN_URL}/ai-generates-3d`)
        }
    ];

    return (
        <div className={containerClassName}>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white">{intl.get('community.featureCards.greeting', { name: userInfor.user_name })}</h1>
            </div>
            <div className="flex justify-center">
                <div className="mt-8 flex gap-4">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} icon={feature.icon} title={feature.title} subtitle={feature.subtitle} gradient={feature.gradient} onClick={feature.onClick} />
                    ))}
                </div>
            </div>

            {/* 促销活动Banner */}
            {/* {userInfor.user_level === 0 && (
                <div className="mt-8">
                    <PromoBanner isUpgradeToPro={isUpgradeToPro} setIsUpgradeToPro={setIsUpgradeToPro} />
                </div>
            )} */}

            <Dialog open={isUpgradeToPro} onOpenChange={setIsUpgradeToPro}>
                <DialogContent className="h-[85vh] w-6xl border-0 p-0">
                    <Price containerClassName="w-full overflow-y-auto p-4"></Price>
                </DialogContent>
            </Dialog>
        </div>
    );
};
