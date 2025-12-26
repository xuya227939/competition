import intl from 'react-intl-universal';

import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';
import { useI18nStore } from '@/store/i18nStore';

export function Page() {
    return (
        <>
            <PageSEO pageKey="service" />
            <Service />
        </>
    );
}

function Service() {
    const { lang } = useI18nStore();
    return (
        <MainLayout>
            <section className="mx-auto max-w-(--breakpoint-xl) py-12">
                {lang === 'zh_CN' && (
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">服务条款</h1>
                        <article className="prose dark:prose-invert text-base">
                            <div>
                                <p>生效日期: 2025.09.28</p>
                                <p>更新日期: 2025.11.26</p>
                                <h2>摘要</h2>
                                <p>
                                    欢迎使用 <strong>Meshivo 3D</strong>（以下简称
                                    "本服务"）。以下条款适用于您使用本服务的所有行为。请在使用本服务前仔细阅读并确保理解和同意以下条款的全部内容。如果您不同意本条款的任何内容，请停止使用本服务。
                                </p>
                                <h2>接受条款</h2>
                                <p>当您访问、浏览或使用本服务时，即表示您已阅读、理解并同意受本条款的约束。</p>
                                <p>我们有权在必要时修改本条款，并会通过网站公告或其他合理方式通知您。若您在本条款更新后继续使用本服务，则视为您已接受修订后的条款。</p>
                                <h2>服务说明</h2>
                                <h3>主要功能</h3>
                                <p>
                                    本服务提供基于人工智能技术的3D模型生成功能，支持通过文本描述或图像输入生成高质量的3D模型。服务包括但不限于：AI模型生成、3D模型预览、模型文件下载、模型分享、个性化推荐等功能。
                                </p>
                                <h3>会员体系</h3>
                                <p>本服务采用订阅制会员体系，提供不同等级的会员服务：</p>
                                <ul>
                                    <li>
                                        <strong>免费用户</strong>：每月可生成有限数量的3D模型，支持基础功能
                                    </li>
                                    <li>
                                        <strong>基础会员</strong>：提供更多生成次数、更高优先级处理、基础技术支持
                                    </li>
                                    <li>
                                        <strong>高级会员</strong>：提供无限生成次数、优先处理、高级功能、专属客服支持
                                    </li>
                                </ul>
                                <p>具体权益与功能以实际页面展示为准。</p>
                                <h3>服务限制</h3>
                                <p>本服务仅用于合法、正当的用途。您应确保所生成内容的使用符合适用法律法规，不得用于违法、有害或侵犯他人权益的用途。</p>
                                <h2>账户注册与管理</h2>
                                <h3>注册方式</h3>
                                <p>本服务仅支持通过 Google 账号进行注册和登录。您需要拥有有效的 Google 账号才能使用本服务。</p>
                                <h3>信息收集</h3>
                                <p>在您注册和使用本服务时，我们会收集并存储以下信息：</p>
                                <ul>
                                    <li>
                                        <strong>邮箱地址</strong>：用于账户识别、登录验证和服务通知
                                    </li>
                                    <li>
                                        <strong>用户名</strong>：用于在平台上展示您的身份
                                    </li>
                                    <li>
                                        <strong>头像</strong>：来自您的 Google 账号（如有）
                                    </li>
                                </ul>
                                <p>我们承诺按照适用的数据保护法律（包括但不限于欧盟《通用数据保护条例》GDPR、美国《加州消费者隐私法案》CCPA 等）处理您的个人信息。详细信息请参阅我们的隐私政策。</p>
                                <h3>账户安全</h3>
                                <p>
                                    您的账户安全由 Google 账号的安全机制保护。请确保您的 Google
                                    账号安全，并对使用您的账户所进行的一切活动承担责任。如发现账户存在安全漏洞或被他人未经授权使用，应及时通知我们。
                                </p>
                                <h2>用户行为规范</h2>
                                <h3>合法使用</h3>
                                <p>您应确保使用本服务的行为不违反法律法规、社会公德以及本服务的相关规则。</p>
                                <h3>内容规范</h3>
                                <p>您在使用本服务时，不得输入或生成包含以下内容的信息：</p>
                                <ul>
                                    <li>违法、有害、威胁、辱骂、诽谤、色情、暴力等内容</li>
                                    <li>侵犯他人知识产权、隐私权或其他合法权益的内容</li>
                                    <li>涉及政治敏感、宗教争议、种族歧视等不当内容</li>
                                    <li>恶意代码、病毒或其他可能损害系统安全的内容</li>
                                </ul>
                                <h3>禁止行为</h3>
                                <p>您不得通过本服务从事以下行为：</p>
                                <ul>
                                    <li>恶意刷取生成次数或滥用服务资源</li>
                                    <li>尝试破解、逆向工程或绕过服务限制</li>
                                    <li>将生成内容用于商业用途而未获得相应授权</li>
                                    <li>传播虚假信息或进行欺诈活动</li>
                                </ul>
                                <h2>订阅与付费</h2>
                                <h3>订阅计划</h3>
                                <p>我们提供多种订阅计划，包括月度和季度等不同周期。订阅费用以页面显示的价格为准，可能因地区、货币等因素有所差异。</p>
                                <h3>付费方式</h3>
                                <p>
                                    本服务使用 <strong>Stripe</strong> 作为唯一的支付处理平台。支持的支付方式包括：
                                </p>
                                <ul>
                                    <li>Visa、Mastercard、American Express 等主流信用卡/借记卡</li>
                                    <li>其他 Stripe 支持的本地支付方式（因地区而异）</li>
                                </ul>
                                <p>所有支付交易均通过 Stripe 安全处理，我们不会直接存储您的完整支付卡信息。</p>
                                <h3>自动续订</h3>
                                <p>
                                    <strong>重要提示：</strong>订阅服务默认开启自动续订功能。我们将在订阅到期前按照约定的周期通过 Stripe
                                    自动扣款续订。您可随时在账户设置中取消自动续订，取消后服务将在当前计费周期结束时停止。
                                </p>
                                <h3>订阅管理</h3>
                                <p>您可以在账户中心查看和管理您的订阅状态，包括：</p>
                                <ul>
                                    <li>当前订阅计划和到期时间</li>
                                    <li>使用情况和剩余积分</li>
                                    <li>取消自动续订</li>
                                    <li>订阅历史记录和发票</li>
                                </ul>
                                <h2>退款政策</h2>
                                <p>
                                    <strong>请在订阅前仔细阅读以下退款政策：</strong>
                                </p>
                                <h3>退款条件</h3>
                                <p>在以下情况下，您可以申请退款：</p>
                                <ul>
                                    <li>
                                        <strong>首次订阅后 7 天内</strong>，且使用的积分不超过免费用户的月度额度（500 积分）
                                    </li>
                                    <li>因我方技术故障导致服务完全无法使用超过连续 72 小时</li>
                                    <li>被 Stripe 确认的重复扣费或错误扣费</li>
                                </ul>
                                <h3>退款流程</h3>
                                <ol>
                                    <li>通过邮箱 neonbit@neonbit.team 联系我们</li>
                                    <li>提供您的注册邮箱、Stripe 支付凭证/订单号、退款原因</li>
                                    <li>我们将在收到申请后 5 个工作日内审核并回复</li>
                                    <li>审核通过后，退款将通过 Stripe 原路返回</li>
                                </ol>
                                <h3>退款到账时间</h3>
                                <p>退款将通过 Stripe 原路返回到您的支付账户。具体到账时间取决于您的银行或发卡机构，一般为 5-10 个工作日。</p>
                                <h3>不予退款的情况（重要）</h3>
                                <p>
                                    <strong>以下情况将不予退款，请您在订阅前充分了解：</strong>
                                </p>
                                <ul>
                                    <li>订阅后超过 7 天</li>
                                    <li>已使用的积分超过 500 积分（免费用户月度额度）</li>
                                    <li>因违反本服务条款被终止服务</li>
                                    <li>因个人原因不再需要服务（如：不想用了、忘记取消续订等）</li>
                                    <li>续订产生的费用（非首次订阅）</li>
                                    <li>促销价格购买的订阅</li>
                                </ul>
                                <h3>取消订阅</h3>
                                <p>您可以随时在账户设置中取消自动续订。取消后：</p>
                                <ul>
                                    <li>当前订阅周期内的服务将继续有效直至到期</li>
                                    <li>到期后将不再自动扣费</li>
                                    <li>到期后账户将降级为免费用户</li>
                                    <li>
                                        <strong>已支付的订阅费用不予退还</strong>
                                    </li>
                                </ul>
                                <h2>知识产权</h2>
                                <h3>Meshivo 3D 的知识产权</h3>
                                <p>
                                    本服务中的软件、技术、算法、页面设计、LOGO、商标等所有相关知识产权均归
                                    <strong>Meshivo 3D</strong>
                                    或其授权方所有。未经许可，任何人不得擅自复制、修改、传播或进行其他侵权行为。
                                </p>
                                <h3>生成内容的知识产权</h3>
                                <p>您通过本服务生成的3D模型，其知识产权归您所有。但您需确保：</p>
                                <ul>
                                    <li>生成内容不侵犯他人知识产权</li>
                                    <li>商业使用时遵守相关法律法规</li>
                                    <li>不得将生成内容用于违法用途</li>
                                </ul>
                                <h3>用户内容</h3>
                                <p>您在使用本服务过程中所上传的文本、图像等内容，其知识产权归您或原始权利人所有。您需保证拥有对该内容进行使用、再传播的合法权利。</p>
                                <h2>免责声明</h2>
                                <h3>生成内容质量</h3>
                                <p>
                                    本服务基于AI技术生成3D模型，生成结果可能存在不完美之处。
                                    <strong>Meshivo 3D</strong>
                                    不保证生成内容完全符合您的预期，用户应自行评估和使用生成内容。
                                </p>
                                <h3>技术故障</h3>
                                <p>
                                    本服务可能因系统维护、设备故障、网络原因等导致暂时中断或无法使用，
                                    <strong>Meshivo 3D</strong>
                                    不承担由此造成的任何损失或责任，但将尽力减少因此给您带来的影响。
                                </p>
                                <h3>用户责任</h3>
                                <p>
                                    由于用户违反本条款或相关法律法规，导致第三方投诉、诉讼或索赔的，用户应自行承担相应责任，并使
                                    <strong>Meshivo 3D</strong>免受损害。
                                </p>
                                <h2>责任限制</h2>
                                <p>
                                    在适用法律允许的范围内，对于因使用或无法使用本服务而造成的任何直接、间接、附带、特殊或衍生损害，
                                    <strong>Meshivo 3D</strong>
                                    不承担任何责任。本服务按"现状"提供，不保证能满足您的全部需求或不出错。
                                </p>
                                <h2>服务变更与终止</h2>
                                <h3>服务变更</h3>
                                <p>
                                    <strong>Meshivo 3D</strong>
                                    有权根据实际情况对本服务的部分或全部功能进行修改、暂停或终止，并提前在网站或通过其他方式通知用户。
                                </p>
                                <h3>订阅终止</h3>
                                <p>您可以在任何时候取消订阅，取消后将在当前计费周期结束时停止服务。已支付的费用不予退还。</p>
                                <h3>账户终止</h3>
                                <p>
                                    如您违反本条款或相关法律法规，<strong>Meshivo 3D</strong>
                                    有权立即终止向您提供服务，并保留追究法律责任的权利。
                                </p>
                                <h2>适用法律与争议解决</h2>
                                <h3>适用法律</h3>
                                <p>本条款的成立、效力、解释及争议解决，均适用本服务运营方所在地的法律。</p>
                                <h2>争议解决</h2>
                                <p>若因本条款或本服务引起争议，双方应友好协商解决；协商不成的，可向运营方所在地有管辖权的人民法院提起诉讼。</p>
                                <h2>联系我们</h2>
                                <p>如果您对本服务条款有任何疑问或建议，请通过以下方式联系我们：</p>
                                <p>邮箱：neonbit@neonbit.team</p>
                                <p>客服时间：周一至周五 9:00-18:00</p>
                            </div>
                        </article>
                    </div>
                )}
                {lang === 'en' && (
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Terms of Service</h1>
                        <article className="prose dark:prose-invert text-base">
                            <div>
                                <p>Effective Date: 28.09.2025</p>
                                <p>Updated Date: 26.11.2025</p>
                                <h2>Summary</h2>
                                <p>
                                    Welcome to <strong>Meshivo 3D</strong> (hereinafter referred to as "the Service"). The following terms apply to all your actions in using the Service. Please read
                                    these terms carefully and ensure that you understand and agree to all of them before using the Service. If you do not agree to any of these terms, please stop using
                                    the Service.
                                </p>
                                <h2>Acceptance of Terms</h2>
                                <p>By accessing, browsing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these terms.</p>
                                <p>
                                    We reserve the right to modify these terms as necessary, and we will notify you via website announcements or other reasonable means. Your continued use of the
                                    Service after any updates will be deemed as acceptance of the revised terms.
                                </p>
                                <h2>Service Description</h2>
                                <h3>Main Features</h3>
                                <p>
                                    The Service provides AI-powered 3D model generation capabilities, supporting high-quality 3D model creation through text descriptions or image inputs. Services
                                    include but are not limited to: AI model generation, 3D model preview, model file downloading, model sharing, and personalized recommendations.
                                </p>
                                <h3>Membership System</h3>
                                <p>The Service operates on a subscription-based membership system, offering different levels of membership services:</p>
                                <ul>
                                    <li>
                                        <strong>Free Users</strong>: Limited monthly 3D model generations with basic features
                                    </li>
                                    <li>
                                        <strong>Basic Members</strong>: More generation credits, higher priority processing, basic technical support
                                    </li>
                                    <li>
                                        <strong>Premium Members</strong>: Unlimited generations, priority processing, advanced features, dedicated customer support
                                    </li>
                                </ul>
                                <p>Specific benefits and features are subject to the actual page display.</p>
                                <h3>Service Limitations</h3>
                                <p>
                                    The Service is for legal and legitimate use only. You must ensure that your use of generated content complies with applicable laws and regulations and does not
                                    violate the rights of others.
                                </p>
                                <h2>Account Registration and Management</h2>
                                <h3>Registration Method</h3>
                                <p>This Service only supports registration and login through Google accounts. You must have a valid Google account to use this Service.</p>
                                <h3>Information Collection</h3>
                                <p>When you register and use this Service, we collect and store the following information:</p>
                                <ul>
                                    <li>
                                        <strong>Email Address</strong>: For account identification, login verification, and service notifications
                                    </li>
                                    <li>
                                        <strong>Username</strong>: For displaying your identity on the platform
                                    </li>
                                    <li>
                                        <strong>Avatar</strong>: From your Google account (if available)
                                    </li>
                                </ul>
                                <p>
                                    We are committed to processing your personal information in accordance with applicable data protection laws, including but not limited to the EU General Data
                                    Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other relevant regulations. For more details, please refer to our Privacy Policy.
                                </p>
                                <h3>Account Security</h3>
                                <p>
                                    Your account security is protected by Google's security mechanisms. Please ensure your Google account is secure and take responsibility for all activities conducted
                                    using your account. If you discover any security vulnerabilities or unauthorized use of your account, please notify us immediately.
                                </p>
                                <h2>User Conduct Guidelines</h2>
                                <h3>Lawful Use</h3>
                                <p>You must ensure that your use of the Service does not violate any laws, regulations, social ethics, or the relevant rules of the Service.</p>
                                <h3>Content Guidelines</h3>
                                <p>When using the Service, you must not input or generate content containing:</p>
                                <ul>
                                    <li>Illegal, harmful, threatening, abusive, defamatory, pornographic, or violent content</li>
                                    <li>Content that infringes on others' intellectual property, privacy, or other legitimate rights</li>
                                    <li>Content involving political sensitivity, religious disputes, racial discrimination, or other inappropriate topics</li>
                                    <li>Malicious code, viruses, or other content that may harm system security</li>
                                </ul>
                                <h3>Prohibited Activities</h3>
                                <p>You may not engage in the following activities through the Service:</p>
                                <ul>
                                    <li>Maliciously exploiting generation credits or abusing service resources</li>
                                    <li>Attempting to crack, reverse engineer, or bypass service limitations</li>
                                    <li>Using generated content for commercial purposes without proper authorization</li>
                                    <li>Spreading false information or engaging in fraudulent activities</li>
                                </ul>
                                <h2>Subscriptions and Payments</h2>
                                <h3>Subscription Plans</h3>
                                <p>
                                    We offer various subscription plans, including monthly and quarterly cycles. Subscription fees are as displayed on the page and may vary by region, currency, and
                                    other factors.
                                </p>
                                <h3>Payment Methods</h3>
                                <p>
                                    This Service uses <strong>Stripe</strong> as the sole payment processing platform. Supported payment methods include:
                                </p>
                                <ul>
                                    <li>Major credit/debit cards including Visa, Mastercard, and American Express</li>
                                    <li>Other local payment methods supported by Stripe (varies by region)</li>
                                </ul>
                                <p>All payment transactions are securely processed through Stripe. We do not directly store your complete payment card information.</p>
                                <h3>Auto-Renewal</h3>
                                <p>
                                    <strong>Important:</strong> Subscription services have auto-renewal enabled by default. We will automatically charge and renew your subscription through Stripe
                                    before the current period expires. You may cancel auto-renewal at any time in your account settings, and the service will stop at the end of the current billing
                                    cycle.
                                </p>
                                <h3>Subscription Management</h3>
                                <p>You can view and manage your subscription status in your account center, including:</p>
                                <ul>
                                    <li>Current subscription plan and expiration date</li>
                                    <li>Usage statistics and remaining credits</li>
                                    <li>Cancel auto-renewal</li>
                                    <li>Subscription history and invoices</li>
                                </ul>
                                <h2>Refund Policy</h2>
                                <p>
                                    <strong>Please read the following refund policy carefully before subscribing:</strong>
                                </p>
                                <h3>Refund Conditions</h3>
                                <p>You may request a refund under the following circumstances:</p>
                                <ul>
                                    <li>
                                        <strong>Within 7 days of your first subscription</strong>, and credits used do not exceed the free user monthly allowance (500 credits)
                                    </li>
                                    <li>Service completely unavailable for more than 72 consecutive hours due to our technical failures</li>
                                    <li>Duplicate or erroneous charges confirmed by Stripe</li>
                                </ul>
                                <h3>Refund Process</h3>
                                <ol>
                                    <li>Contact us via email at neonbit@neonbit.team</li>
                                    <li>Provide your registered email, Stripe payment receipt/order number, and reason for refund</li>
                                    <li>We will review and respond within 5 business days of receiving your request</li>
                                    <li>Upon approval, the refund will be processed through Stripe to your original payment method</li>
                                </ol>
                                <h3>Refund Timeline</h3>
                                <p>
                                    Refunds will be returned to your original payment method through Stripe. The specific arrival time depends on your bank or card issuer, generally 5-10 business
                                    days.
                                </p>
                                <h3>Non-Refundable Situations (Important)</h3>
                                <p>
                                    <strong>The following situations are NOT eligible for refunds. Please understand these terms before subscribing:</strong>
                                </p>
                                <ul>
                                    <li>More than 7 days after subscription</li>
                                    <li>Credits used exceed 500 credits (free user monthly allowance)</li>
                                    <li>Service terminated due to violation of these Terms of Service</li>
                                    <li>Personal reasons for no longer needing the service (e.g., changed mind, forgot to cancel renewal)</li>
                                    <li>Renewal charges (non-first-time subscriptions)</li>
                                    <li>Subscriptions purchased at promotional prices</li>
                                </ul>
                                <h3>Cancelling Your Subscription</h3>
                                <p>You may cancel auto-renewal at any time in your account settings. After cancellation:</p>
                                <ul>
                                    <li>Your service will remain active until the end of the current billing period</li>
                                    <li>No further charges will be made after the current period ends</li>
                                    <li>Your account will be downgraded to free user status after expiration</li>
                                    <li>
                                        <strong>Paid subscription fees are non-refundable</strong>
                                    </li>
                                </ul>
                                <h2>Intellectual Property</h2>
                                <h3>Meshivo 3D's Intellectual Property</h3>
                                <p>
                                    All related intellectual property rights for the software, technology, algorithms, page designs, LOGO, trademarks, etc., in the Service belong to{' '}
                                    <strong>Meshivo 3D</strong> or its licensors. No one is allowed to copy, modify, distribute, or otherwise infringe upon these rights without permission.
                                </p>
                                <h3>Generated Content Intellectual Property</h3>
                                <p>3D models generated through the Service belong to you. However, you must ensure:</p>
                                <ul>
                                    <li>Generated content does not infringe on others' intellectual property</li>
                                    <li>Commercial use complies with relevant laws and regulations</li>
                                    <li>Generated content is not used for illegal purposes</li>
                                </ul>
                                <h3>User Content</h3>
                                <p>
                                    The intellectual property rights for the text, images, and other content you upload during your use of the Service belong to you or the original rights holder. You
                                    must ensure that you have the legal right to use and redistribute such content.
                                </p>
                                <h2>Disclaimer</h2>
                                <h3>Generated Content Quality</h3>
                                <p>
                                    The Service generates 3D models based on AI technology, and generated results may have imperfections.
                                    <strong>Meshivo 3D</strong> does not guarantee that generated content will fully meet your expectations. Users should evaluate and use generated content at their
                                    own discretion.
                                </p>
                                <h3>Technical Failures</h3>
                                <p>
                                    The Service may be temporarily interrupted or unavailable due to system maintenance, equipment failure, network issues, etc. <strong>Meshivo 3D</strong> is not
                                    responsible for any losses or liabilities resulting from such interruptions, but will make every effort to minimize the impact on you.
                                </p>
                                <h3>User Responsibility</h3>
                                <p>
                                    If a user violates these terms or applicable laws and regulations, resulting in complaints, litigation, or claims from third parties, the user shall bear the
                                    corresponding responsibilities and indemnify <strong>Meshivo 3D</strong> from any damage.
                                </p>
                                <h2>Limitation of Liability</h2>
                                <p>
                                    To the extent permitted by applicable law, <strong>Meshivo 3D</strong> shall not be liable for any direct, indirect, incidental, special, or consequential damages
                                    arising from or relating to your use or inability to use the Service. The Service is provided on an "as is" basis, and we do not guarantee that it will meet all of
                                    your needs or be error-free.
                                </p>
                                <h2>Changes and Termination of the Service</h2>
                                <h3>Service Changes</h3>
                                <p>
                                    <strong>Meshivo 3D</strong> reserves the right to modify, suspend, or terminate part or all of the Service's functions as necessary, and will notify users in
                                    advance via the website or other means.
                                </p>
                                <h3>Subscription Termination</h3>
                                <p>You may cancel your subscription at any time. The service will stop at the end of the current billing cycle. Paid fees are non-refundable.</p>
                                <h3>Account Termination</h3>
                                <p>
                                    If you violate these terms or applicable laws and regulations, <strong>Meshivo 3D</strong> reserves the right to immediately terminate the Service for you and to
                                    pursue any legal remedies available.
                                </p>
                                <h2>Governing Law and Dispute Resolution</h2>
                                <h3>Governing Law</h3>
                                <p>
                                    These terms, their validity, interpretation, and any disputes arising out of them shall be governed by the laws of the jurisdiction in which the Service operator is
                                    located.
                                </p>
                                <h2>Dispute Resolution</h2>
                                <p>
                                    In the event of any disputes arising from these terms or the Service, both parties shall attempt to resolve the dispute amicably; if an amicable resolution cannot
                                    be reached, the dispute may be submitted to the competent People's Court in the jurisdiction where the Service operator is located.
                                </p>
                                <h2>Contact Us</h2>
                                <p>If you have any questions or suggestions about these Terms of Service, please contact us through the following methods:</p>
                                <p>Email: neonbit@neonbit.team</p>
                                <p>Customer Service Hours: Monday to Friday 9:00-18:00</p>
                            </div>
                        </article>
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
