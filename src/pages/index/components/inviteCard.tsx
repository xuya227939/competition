import { Button } from '@/components/ui/button';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Collect, Hot } from '@/components/icon';
import intl from 'react-intl-universal';

interface InviteUser {
    avatarUrl?: string;
    userName?: string;
    code?: string;
}

interface InviteCardProps {
    inviteUser: InviteUser;
    onJoinClick: () => void;
}

export function InviteCard({ inviteUser, onJoinClick }: InviteCardProps) {
    return (
        <div className="container mx-auto pt-12">
            <div className="flex w-full max-w-[1440px] flex-wrap items-stretch justify-center gap-8">
                {/* 左侧卡片 */}
                <div className="relative flex w-full max-w-[450px] flex-col items-center justify-center overflow-hidden rounded bg-gray-900 p-8 text-center shadow-xl">
                    {/* 装饰元素 */}
                    <i className="fas fa-cube absolute top-5 right-5 z-0 rotate-15 text-5xl opacity-5"></i>
                    <i className="fas fa-shapes absolute bottom-5 left-5 z-0 -rotate-15 text-4xl opacity-5"></i>

                    {/* 顶部装饰条 */}
                    <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#F7931E]"></div>

                    <h1 className="relative z-10 mb-6 text-xl leading-tight font-bold text-gray-50">
                        {intl.get('landing.invite.friend')}
                        <span className="font-bold text-yellow-400">{intl.get('landing.invite.friend.1000')}</span>
                        {intl.get('landing.invite.friend.desc')}
                    </h1>

                    <img
                        src={inviteUser.avatarUrl}
                        alt={intl.get('landing.invite.friend.avatar')}
                        className="relative z-10 mb-4 h-20 w-20 rounded-full border-2 border-gray-700 object-cover shadow-lg"
                    />

                    <div className="relative z-10 mt-3 mb-8 text-lg font-semibold text-gray-50">
                        {inviteUser.userName || intl.get('landing.invite.friend')} {intl.get('landing.invite.friend.you')}
                    </div>

                    <Button
                        className="!rounded-button relative z-10 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] px-6 py-3 text-base font-semibold whitespace-nowrap text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        onClick={onJoinClick}
                    >
                        {intl.get('landing.invite.friend.join')}
                    </Button>
                </div>

                {/* 右侧功能卡片 */}
                <div className="flex w-full max-w-[450px] flex-col justify-center rounded-xl bg-gray-900 p-6 shadow-xl">
                    <div className="mb-5 text-center text-xl font-bold text-gray-50">{intl.get('landing.invite.friend.why')}</div>

                    {/* 功能项 1 */}
                    <div className="mb-4 flex items-start">
                        <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#1A936F]">
                            <i className="fas fa-cube text-base text-white"></i>
                            <Collect className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="mb-1 text-base font-semibold text-gray-50">{intl.get('landing.invite.friend.why.tips1')}</div>
                        </div>
                    </div>

                    {/* 功能项 2 */}
                    <div className="mb-4 flex items-start">
                        <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#1A936F]">
                            <i className="fas fa-star text-base text-white"></i>
                            <StarFilledIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="mb-1 text-base font-semibold text-gray-50">{intl.get('landing.invite.friend.why.tips2')}</div>
                            <div className="flex items-center text-sm">
                                <StarFilledIcon className="h-6 w-6 text-yellow-400" />
                                <StarFilledIcon className="h-6 w-6 text-yellow-400" />
                                <StarFilledIcon className="h-6 w-6 text-yellow-400" />
                                <StarFilledIcon className="h-6 w-6 text-yellow-400" />
                                <StarFilledIcon className="h-6 w-6 text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    {/* 功能项 3 */}
                    <div className="flex items-start">
                        <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4ECDC4] to-[#1A936F]">
                            <Hot className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="mb-1 text-base font-semibold text-gray-50">{intl.get('landing.invite.friend.why.tips3')}</div>
                            <div className="text-sm text-gray-300">{intl.get('landing.invite.friend.why.tips3.desc')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
