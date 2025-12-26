import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';
import { useI18nStore } from '@/store/i18nStore';

export function Page() {
    return (
        <>
            <PageSEO pageKey="privacy" />
            <Privacy></Privacy>
        </>
    );
}

function Privacy() {
    const { lang } = useI18nStore();
    return (
        <MainLayout>
            <section className="mx-auto max-w-(--breakpoint-xl) py-12">
                {lang === 'zh_CN' && (
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl leading-8 font-extrabold text-white sm:text-4xl">隐私政策</h1>
                        <article className="prose dark:prose-invert text-base">
                            <div>
                                <p>生效日期: 2025.09.28</p>
                                <p>更新日期: 2025.11.26</p>
                                <h2>摘要</h2>
                                <p>
                                    欢迎使用 <strong>Meshivo 3D</strong>（以下简称 "本服务"）。我们深知个人信息对您的重要性，并承诺尊重并保护所有使用本服务的用户（以下简称
                                    "用户"）的隐私。本隐私政策（以下简称 "本政策"）将帮助您了解我们如何收集、使用、披露、处理和保护您的个人信息。请在使用本服务前，仔细阅读并充分理解本政策的全部内容。
                                </p>
                                <h2>我们收集的信息</h2>
                                <h3>账户信息</h3>
                                <p>
                                    当您注册或使用本服务时，我们可能会收集您的昵称、电子邮箱、手机号、密码等必要的账户注册信息。如果您使用 Google
                                    账号或其他第三方账号登录，我们将收集您的公开个人资料信息（如昵称、头像、邮箱地址）。这些信息用于为您提供正常的服务、支持及账号管理。
                                </p>
                                <h3>AI 生成数据</h3>
                                <p>
                                    当您使用本服务生成3D模型时，我们可能会收集您输入的文本提示词、图像输入、生成参数设置、生成的3D模型文件、模型预览图像等信息。这些数据用于为您提供AI生成服务，改进算法模型，以及提供个性化的生成体验。
                                </p>
                                <h3>使用数据</h3>
                                <p>
                                    当您使用本服务生成、下载、分享3D模型时，我们可能会收集与您的操作相关的日志信息（如访问时间、生成请求、下载链接、操作系统信息、浏览器类型、IP
                                    地址等），用于统计分析、故障排查及服务优化。
                                </p>
                                <h3>订阅与付费信息</h3>
                                <p>
                                    如果您选择使用我们的付费订阅服务，我们可能会收集并处理与支付相关的信息（如支付账号、支付方式、交易时间、交易金额、交易流水号、订阅计划等），这些信息仅用于完成交易、开具票据、管理订阅状态及提供客户支持。
                                </p>
                                <h3>Cookies 及类似技术</h3>
                                <p>
                                    我们可能使用 Cookies 或类似技术来收集访问量统计、偏好设置、登录状态等信息，以便为您提供更个性化的用户体验。您可以在浏览器或设备设置中禁用或清除
                                    Cookies，但可能会影响部分功能的正常使用。
                                </p>
                                <h2>我们如何使用收集的信息</h2>
                                <h3>提供及维护服务</h3>
                                <p>根据您提供的信息，我们将为您创建并维护账户，为您提供AI驱动的3D模型生成、模型预览、文件下载、模型分享等核心功能。</p>
                                <h3>AI 模型训练与优化</h3>
                                <p>我们可能会使用您提供的文本提示词和生成参数来改进我们的AI算法，提升3D模型生成的质量和准确性。在用于训练前，我们会进行数据脱敏处理。</p>
                                <h3>个性化与优化</h3>
                                <p>我们会根据您在使用过程中的偏好、生成历史、行为记录，对产品功能和界面进行个性化推荐与优化，为您提供更精准的3D模型生成建议。</p>
                                <h3>安全保障</h3>
                                <p>我们使用收集的信息来监测、识别并防范安全风险及欺诈行为，保障账户安全、支付安全和模型文件安全。</p>
                                <h3>客户支持</h3>
                                <p>当您与我们联系以寻求技术支持或提交投诉/反馈时，我们可能需要使用相关信息来为您提供更快捷、准确的服务。</p>
                                <h3>法律合规</h3>
                                <p>
                                    我们遵守业务所在地及用户所在地的相关法律法规。在法律法规要求或征得您同意的情况下，我们可能会使用或共享您的信息以履行相关义务，或处理与法律诉讼、纠纷等相关的事务。
                                </p>
                                <h2>信息共享与披露</h2>
                                <h3>与第三方服务提供商共享</h3>
                                <p>我们可能会与为本服务提供AI技术支持、云计算服务、支付处理或数据分析的第三方服务提供商共享必要的信息，但这些第三方仅可基于本政策的目的使用相关信息。</p>
                                <h3>模型分享功能</h3>
                                <p>当您选择公开分享生成的3D模型时，其他用户将能够查看和下载您的模型。请确保您有权分享相关内容，并注意保护您的隐私。</p>
                                <h3>法律要求</h3>
                                <p>在法律法规或政府主管部门要求的情况下，我们可能会披露您的个人信息，以履行相应的法律义务或保护我们的合法权益。</p>
                                <h3>业务转让</h3>
                                <p>若本服务因合并、收购、重组等产生业务转让，我们会在转让前告知您相关情况，并确保您的个人信息受到与本政策同等或更高的保护。</p>
                                <h2>我们如何保护您的信息</h2>
                                <h3>安全措施</h3>
                                <p>我们采用合理的安全措施，包括数据加密、访问控制、匿名化等手段，防止信息丢失、不当使用、未经授权访问或披露。特别地，我们会对您的3D模型文件进行加密存储。</p>
                                <h3>信息存储</h3>
                                <p>我们会在达到收集目的所需的最短时间内保留您的个人信息，除非法律法规或监管要求另有规定。对于生成的3D模型文件，我们会根据您的订阅状态和设置决定保留期限。</p>
                                <h2>您的权利</h2>
                                <h3>访问、更正与删除</h3>
                                <p>您有权访问、更正或删除您的个人信息和生成的3D模型。如果您无法通过产品功能自行完成这些操作，可以通过联系方式与我们取得联系，我们会在合理期限内回复。</p>
                                <h3>数据导出</h3>
                                <p>您有权导出您生成的3D模型文件和相关数据。我们提供标准格式的导出功能，确保您能够完整获取您的创作内容。</p>
                                <h3>撤回同意</h3>
                                <p>如果您希望撤回对某些信息收集或使用的授权，请联系我们。请注意，撤回同意可能导致某些功能无法继续为您提供。</p>
                                <h2>儿童隐私保护</h2>
                                <p>我们的服务主要面向成年人。如果您是未成年人，请在监护人的陪同下使用本服务。我们不会故意收集未成年人的个人信息。</p>
                                <h2>隐私政策变更</h2>
                                <p>
                                    <strong>Meshivo 3D</strong>
                                    我们可能会不时更新本政策，以适应业务变动或法律法规的要求。更新后的版本将在本页面公布并注明生效日期。如更新涉及对您权益有重大影响的内容，我们会通过弹窗或其他显著方式向您提示。请您在更新后继续使用本服务前仔细阅读并理解更新内容。
                                </p>
                                <h2>联系我们</h2>
                                <p>如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
                                <p>邮箱：neonbit@neonbit.team</p>
                                <p>我们将在收到您的询问后尽快回复。</p>
                            </div>
                        </article>
                    </div>
                )}
                {lang === 'en' && (
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Privacy Policy</h1>
                        <article className="prose dark:prose-invert text-base">
                            <div>
                                <p>Effective Date: 28.09.2025</p>
                                <p>Updated Date: 26.11.2025</p>
                                <h2>Summary</h2>
                                <p>
                                    Welcome to <strong>Meshivo 3D</strong> (hereinafter referred to as "the Service"). We understand the importance of personal information and are committed to
                                    respecting and protecting the privacy of all users (hereinafter "Users") who use the Service. This Privacy Policy (hereinafter "this Policy") is designed to help
                                    you understand how we collect, use, disclose, process, and safeguard your personal information. Please read and fully understand this Policy before using the
                                    Service.
                                </p>
                                <h2>Information We Collect</h2>
                                <h3>Account Information</h3>
                                <p>
                                    When you register for or use the Service, we may collect necessary account registration information such as your nickname, email address, phone number, and
                                    password. If you sign in using a Google account or other third-party accounts, we will collect your public profile information (such as nickname, avatar, and email
                                    address). This information is used to provide you with proper service, support, and account management.
                                </p>
                                <h3>AI Generation Data</h3>
                                <p>
                                    When you use the Service to generate 3D models, we may collect your text prompts, image inputs, generation parameters, generated 3D model files, model preview
                                    images, and other related data. This information is used to provide AI generation services, improve algorithm models, and offer personalized generation experiences.
                                </p>
                                <h3>Usage Data</h3>
                                <p>
                                    When you use the Service to generate, download, or share 3D models, we may collect log information related to your activities (such as access times, generation
                                    requests, download links, operating system details, browser type, IP address, etc.) for the purposes of statistical analysis, troubleshooting, and service
                                    optimization.
                                </p>
                                <h3>Subscription and Payment Information</h3>
                                <p>
                                    If you choose to use our paid subscription service, we may collect and process payment-related information (such as payment account details, payment method,
                                    transaction time, transaction amount, transaction ID, subscription plans, etc.). This information is used solely to complete transactions, issue receipts, manage
                                    subscription status, and provide customer support.
                                </p>
                                <h3>Cookies and Similar Technologies</h3>
                                <p>
                                    We may use Cookies or similar technologies to collect data on website traffic, preferences, login status, and other information to provide you with a more
                                    personalized user experience. You can disable or clear Cookies through your browser or device settings; however, doing so may affect the proper functioning of
                                    certain features.
                                </p>
                                <h2>How We Use the Collected Information</h2>
                                <h3>Provision and Maintenance of the Service</h3>
                                <p>
                                    Based on the information you provide, we will create and maintain your account, and provide core features such as AI-powered 3D model generation, model preview,
                                    file downloading, and model sharing.
                                </p>
                                <h3>AI Model Training and Optimization</h3>
                                <p>
                                    We may use your text prompts and generation parameters to improve our AI algorithms and enhance the quality and accuracy of 3D model generation. Before using data
                                    for training, we will perform data anonymization.
                                </p>
                                <h3>Personalization and Optimization</h3>
                                <p>
                                    We use your preferences, generation history, and behavioral records to offer personalized recommendations and optimize product features and interfaces, providing
                                    you with more accurate 3D model generation suggestions.
                                </p>
                                <h3>Security Assurance</h3>
                                <p>
                                    We use the collected information to monitor, identify, and prevent security risks and fraudulent activities, ensuring the security of your account, payments, and
                                    model files.
                                </p>
                                <h3>Customer Support</h3>
                                <p>
                                    When you contact us for technical support or to submit a complaint/feedback, we may need to use your information to provide you with more efficient and accurate
                                    service.
                                </p>
                                <h3>Legal Compliance</h3>
                                <p>
                                    We comply with applicable laws and regulations in the jurisdictions where we operate and where our users are located. We may use or share your information to
                                    fulfill legal obligations or handle legal disputes, either as required by law or with your consent.
                                </p>
                                <h2>Information Sharing and Disclosure</h2>
                                <h3>Sharing with Third-Party Service Providers</h3>
                                <p>
                                    We may share necessary information with third-party service providers who assist in AI technical support, cloud computing services, payment processing, or data
                                    analysis, but these third parties are restricted to using the information solely for the purposes outlined in this Policy.
                                </p>
                                <h3>Model Sharing Features</h3>
                                <p>
                                    When you choose to publicly share generated 3D models, other users will be able to view and download your models. Please ensure you have the right to share such
                                    content and be mindful of protecting your privacy.
                                </p>
                                <h3>Legal Requirements</h3>
                                <p>
                                    In cases where required by law or requested by governmental authorities, we may disclose your personal information to fulfill legal obligations or protect our legal
                                    rights.
                                </p>
                                <h3>Business Transfers</h3>
                                <p>
                                    In the event of a merger, acquisition, or restructuring that results in a transfer of business, we will notify you in advance and ensure that your personal
                                    information is protected in accordance with this Policy or with a higher standard.
                                </p>
                                <h2>How We Protect Your Information</h2>
                                <h3>Security Measures</h3>
                                <p>
                                    We employ reasonable security measures, including data encryption, access controls, and anonymization, to prevent the loss, misuse, or unauthorized access or
                                    disclosure of your information. Specifically, we encrypt your 3D model files for storage.
                                </p>
                                <h3>Data Storage</h3>
                                <p>
                                    We retain your personal information for the minimum period necessary to achieve the purposes for which it was collected, unless otherwise required by law or
                                    regulation. For generated 3D model files, we determine retention periods based on your subscription status and settings.
                                </p>
                                <h2>Your Rights</h2>
                                <h3>Access, Correction, and Deletion</h3>
                                <p>
                                    You have the right to access, correct, or delete your personal information and generated 3D models. If you are unable to perform these actions through the Service,
                                    please contact us and we will respond within a reasonable timeframe.
                                </p>
                                <h3>Data Export</h3>
                                <p>
                                    You have the right to export your generated 3D model files and related data. We provide export functionality in standard formats to ensure you can fully access your
                                    creative content.
                                </p>
                                <h3>Withdrawal of Consent</h3>
                                <p>
                                    If you wish to withdraw your consent for the collection or use of certain information, please contact us. Please note that withdrawing consent may result in certain
                                    features no longer being available to you.
                                </p>
                                <h2>Children's Privacy Protection</h2>
                                <p>
                                    Our service is primarily intended for adults. If you are a minor, please use the Service under the supervision of a guardian. We do not knowingly collect personal
                                    information from minors.
                                </p>
                                <h2>Changes to the Privacy Policy</h2>
                                <p>
                                    <strong>Meshivo 3D</strong> may update this Policy from time to time to accommodate business changes or legal requirements. The updated version will be posted on
                                    this page along with the effective date. If the changes significantly affect your rights, we will notify you via pop-up or other prominent methods. Please review
                                    the updated Policy carefully before continuing to use the Service.
                                </p>
                                <h2>Contact Us</h2>
                                <p>If you have any questions or suggestions about this Privacy Policy, please contact us through the following methods:</p>
                                <p>Email: neonbit@neonbit.team</p>
                                <p>We will respond to your inquiry as soon as possible after receiving it.</p>
                            </div>
                        </article>
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
