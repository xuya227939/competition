import { useCommunityStore } from '@/store/communityStore';
import { ModelPreView } from '@/components/modelPreView';
import intl from 'react-intl-universal';
import { isEmpty } from '@/utils';
import { useUserStore } from '@/store/userStore';
import { FeatureCards } from '@/components/featureCards';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useI18nStore } from '@/store/i18nStore';
import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';

export function Page() {
    const { getList, datas, hasMore, loadMoreData, isListLoading, setHasMore, resetCommunity, setSearchKeyword, searchParams } = useCommunityStore();
    const { userInfor } = useUserStore();
    // Subscribe to language changes to trigger re-render
    const { lang } = useI18nStore();

    const handleSearch = () => {
        getList();
    };

    return (
        <>
            <PageSEO pageKey="community" />
            <MainLayout>
                <div className="md:container lg:container">
                    {/* 页面标题 */}
                    <div className="mt-4 mb-4 flex-shrink-0">
                        <h1 className="mb-2 text-2xl font-bold text-white">{intl.get('community.title')}</h1>
                        <p className="text-gray-400">{intl.get('community.subTitle')}</p>
                    </div>

                    {/* 功能卡片 */}
                    {!isEmpty(userInfor) && <FeatureCards containerClassName="mt-8 mb-4" />}

                    {/* 搜索栏 */}
                    <div className="border-gray-800 p-2 pb-4">
                        {/* 搜索框 */}
                        <div className="flex items-center justify-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    type="text"
                                    placeholder={intl.get('community.search.placeholder')}
                                    value={searchParams.keyword}
                                    onChange={e => setSearchKeyword(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                    className="h-9 border-gray-700 bg-gray-800/50 pl-9 text-sm text-white placeholder:text-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <Button onClick={handleSearch} size="sm" className="h-9 shrink-0 px-3">
                                <Search className="h-4 w-4" />
                                {intl.get('community.search.button')}
                            </Button>
                        </div>
                    </div>

                    <ModelPreView
                        datas={datas}
                        isLoading={isListLoading}
                        hasMore={hasMore}
                        loadMoreData={loadMoreData}
                        setHasMore={setHasMore}
                        getList={getList}
                        reset={resetCommunity}
                        showPublicTag={false}
                    />
                </div>
            </MainLayout>
        </>
    );
}
