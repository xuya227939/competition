import { Discord, WhiteTwitter } from '@/components/icon';
import { useI18nStore } from '@/store/i18nStore';
import { showToast } from '@/utils';
import { VLink } from '@/components/navigation/VLink';
import intl from 'react-intl-universal';

export function Footer() {
    const { lang } = useI18nStore();

    return (
        <footer className="mb-8 px-4 md:container lg:container">
            <div className="grid grid-cols-1 gap-12 border-t border-gray-800 pt-8 md:grid-cols-4 lg:flex lg:justify-between">
                {/* 第一列 */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">{intl.get('footer.col1.title')}</h4>
                    <p className="max-w-xs leading-relaxed text-gray-400">{intl.get('footer.col1.subTitle')}</p>
                </div>

                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">{intl.get('footer.col5.title')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <VLink href="/online-viewer" className="transition-colors duration-200 hover:text-white hover:underline">
                                {intl.get('footer.col5.subTitle')}
                            </VLink>
                        </li>
                        <li>
                            <VLink href="/model-compression" className="transition-colors duration-200 hover:text-white hover:underline">
                                {intl.get('footer.col5.subTitle2')}
                            </VLink>
                        </li>
                        <li>
                            <VLink href="/file-converter" className="transition-colors duration-200 hover:text-white hover:underline">
                                {intl.get('footer.col5.subTitle3')}
                            </VLink>
                        </li>
                        <li>
                            <div
                                className="cursor-pointer transition-colors duration-200 hover:text-white hover:underline"
                                onClick={() => {
                                    showToast({
                                        description: intl.get('footer.col5.subTitle4.tips')
                                    });
                                }}
                            >
                                {intl.get('footer.col5.subTitle4')}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 第二列 */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">{intl.get('footer.col2.title')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <VLink href="/" className="transition-colors duration-200 hover:text-white hover:underline">
                                {intl.get('footer.col2.subTitle')}
                            </VLink>
                        </li>
                        <li>
                            <VLink className="transition-colors duration-200 hover:text-white hover:underline" href="/price">
                                {intl.get('footer.col2.subTitle2')}
                            </VLink>
                        </li>
                        <li>
                            <VLink className="cursor-pointer transition-colors duration-200 hover:text-white hover:underline" href="/blog">
                                {intl.get('footer.col2.subTitle3')}
                            </VLink>
                        </li>
                        <li>
                            <VLink className="cursor-pointer transition-colors duration-200 hover:text-white hover:underline" href="/community">
                                {intl.get('footer.col2.subTitle4')}
                            </VLink>
                        </li>
                    </ul>
                </div>

                {/* 第三列 */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">{intl.get('footer.col3.title')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <a href="mailto:hezhiqianye@gmail.com" className="transition-colors duration-200 hover:text-white hover:underline">
                                {intl.get('footer.col3.subTitle')}
                            </a>
                        </li>
                        <li>
                            <VLink className="transition-colors duration-200 hover:text-white hover:underline" href="/privacy">
                                {intl.get('footer.col3.subTitle2')}
                            </VLink>
                        </li>
                        <li>
                            <VLink className="transition-colors duration-200 hover:text-white hover:underline" href="/service">
                                {intl.get('footer.col3.subTitle3')}
                            </VLink>
                        </li>
                    </ul>
                </div>

                {/* 第四列 - 社交账号 */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">{intl.get('footer.col4.title')}</h4>
                    <div className="flex space-x-4">
                        <a href="https://x.com/hezhiqianye" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:scale-120">
                            <WhiteTwitter className="size-6" />
                        </a>
                        <a href="https://discord.gg/dVsv7nQUCn" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:scale-120">
                            <Discord className="size-8" />
                        </a>
                    </div>
                </div>
            </div>

            {/* 版权信息 */}
            <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                <p className="text-sm text-gray-500">Copyright © 2025 NeonBit, All Rights Reserved.</p>
            </div>
        </footer>
    );
}
