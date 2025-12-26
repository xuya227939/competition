// Blog data - metadata from markdown files
export interface BlogPost {
    id: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
}

export const blogData: Record<string, BlogPost[]> = {
    zh: [
        {
            id: 'ai-3d-revolution',
            title: 'AI驱动的3D建模革命：Meshivo 3D如何改变创作方式',
            description: '探索AI技术如何彻底改变传统3D建模流程，以及Meshivo 3D如何引领这场革命。',
            date: '2025-01-15',
            author: 'Alex Chen',
            tags: ['AI技术', '3D建模', '行业趋势']
        },
        {
            id: 'mesh-ai-features',
            title: 'Meshivo 3D 核心功能深度解析：从文本到3D模型的魔法',
            description: '深入了解 Meshivo 3D 的核心功能，包括智能材质匹配、一键优化、风格定制等特性，以及它们如何简化3D创作流程。',
            date: '2025-02-20',
            author: 'Sarah Johnson',
            tags: ['产品功能', '3D建模', 'AI工具']
        },
        {
            id: 'ai-3d-workflow',
            title: '从创意到成品：使用Meshivo 3D的完整工作流程',
            description: '详细介绍如何使用Meshivo 3D从最初的创意构思到最终3D模型导出的完整工作流程。',
            date: '2025-02-05',
            author: 'Michael Zhang',
            tags: ['工作流程', '教程', '最佳实践']
        },
        {
            id: 'mesh-ai-vs-traditional',
            title: 'AI 3D建模 vs 传统建模：优势对比分析',
            description: '深入对比AI驱动的3D建模与传统建模方法的优劣势，帮助您选择最适合的创作方式。',
            date: '2025-01-28',
            author: 'Emily Wang',
            tags: ['对比分析', '3D建模', 'AI技术']
        },
        {
            id: 'mesh-ai-tips',
            title: '10个提升Meshivo 3D使用效率的专业技巧',
            description: '分享10个实用技巧，帮助您更高效地使用Meshivo 3D，创作出更优质的3D模型。',
            date: '2025-02-12',
            author: 'David Liu',
            tags: ['技巧', '效率提升', '最佳实践']
        },
        {
            id: '3d-industry-impact',
            title: 'AI 3D技术对各行业的影响：游戏、电影、建筑等',
            description: '分析AI 3D建模技术如何影响游戏开发、电影制作、建筑设计等多个行业。',
            date: '2025-01-20',
            author: 'Sophie Chen',
            tags: ['行业应用', '案例研究', '3D技术']
        },
        {
            id: 'future-3d-ai',
            title: '3D AI的未来：技术趋势与发展方向',
            description: '展望3D AI技术的未来发展方向，探讨即将到来的技术突破和应用场景。',
            date: '2025-02-25',
            author: 'James Li',
            tags: ['未来趋势', 'AI技术', '技术展望']
        }
    ],
    en: [
        {
            id: 'ai-3d-revolution',
            title: 'AI-Driven 3D Modeling Revolution: How Meshivo 3D is Changing the Creative Process',
            description: 'Explore how AI technology is fundamentally transforming traditional 3D modeling workflows and how Meshivo 3D is leading this revolution.',
            date: '2025-01-15',
            author: 'Alex Chen',
            tags: ['AI Technology', '3D Modeling', 'Industry Trends']
        },
        {
            id: 'mesh-ai-features',
            title: 'Deep Dive into Meshivo 3D Core Features: The Magic from Text to 3D Models',
            description: "Explore Meshivo 3D's core features including smart material matching, one-click optimization, style customization, and how they streamline the 3D creation process.",
            date: '2025-02-20',
            author: 'Sarah Johnson',
            tags: ['Product Features', '3D Modeling', 'AI Tools']
        },
        {
            id: 'ai-3d-workflow',
            title: 'From Idea to Reality: Complete Workflow with Meshivo 3D',
            description: 'A detailed guide on using Meshivo 3D from initial concept to final 3D model export.',
            date: '2025-02-05',
            author: 'Michael Zhang',
            tags: ['Workflow', 'Tutorial', 'Best Practices']
        },
        {
            id: 'mesh-ai-vs-traditional',
            title: 'AI 3D Modeling vs Traditional Modeling: A Comprehensive Comparison',
            description: 'An in-depth comparison of AI-driven 3D modeling versus traditional modeling methods to help you choose the right approach.',
            date: '2025-01-28',
            author: 'Emily Wang',
            tags: ['Comparison', '3D Modeling', 'AI Technology']
        },
        {
            id: 'mesh-ai-tips',
            title: '10 Pro Tips to Boost Your Meshivo 3D Efficiency',
            description: 'Discover 10 practical tips to use Meshivo 3D more efficiently and create higher quality 3D models.',
            date: '2025-02-12',
            author: 'David Liu',
            tags: ['Tips', 'Efficiency', 'Best Practices']
        },
        {
            id: '3d-industry-impact',
            title: 'The Impact of AI 3D Technology Across Industries: Gaming, Film, Architecture, and More',
            description: 'Analyze how AI 3D modeling technology is impacting game development, film production, architectural design, and other industries.',
            date: '2025-01-20',
            author: 'Sophie Chen',
            tags: ['Industry Applications', 'Case Studies', '3D Technology']
        },
        {
            id: 'future-3d-ai',
            title: 'The Future of 3D AI: Technology Trends and Development Directions',
            description: 'Look ahead at the future of 3D AI technology, exploring upcoming breakthroughs and application scenarios.',
            date: '2025-02-25',
            author: 'James Li',
            tags: ['Future Trends', 'AI Technology', 'Technology Outlook']
        }
    ],
    ja: [
        {
            id: 'ai-3d-revolution',
            title: 'AI主導の3Dモデリング革命：Meshivo 3Dはいかに創造方法を変えるか',
            description: 'AI技術がいかに従来の3Dモデリングプロセスを完全に変革するか、そしてMeshivo 3Dがどのようにこの革命をリードするかを探る。',
            date: '2025-01-15',
            author: 'Alex Chen',
            tags: ['AI技術', '3Dモデリング', '業界トレンド']
        },
        {
            id: 'mesh-ai-features',
            title: 'Meshivo 3D コア機能の徹底解説：テキストから3Dモデルへの魔法',
            description: 'スマートマテリアルマッチング、ワンクリック最適化、スタイルカスタマイズなどのMeshivo 3Dのコア機能を深く掘り下げ、それらがいかに3D制作プロセスを簡素化するかを紹介する。',
            date: '2025-02-20',
            author: 'Sarah Johnson',
            tags: ['製品機能', '3Dモデリング', 'AIツール']
        },
        {
            id: 'ai-3d-workflow',
            title: 'アイデアから完成品まで：Meshivo 3Dを使用した完全なワークフロー',
            description: 'Meshivo 3Dを使用して、最初のアイデア出しから最終的な3Dモデルのエクスポートまでの完全なワークフローを詳細に紹介する。',
            date: '2025-02-05',
            author: 'Michael Zhang',
            tags: ['ワークフロー', 'チュートリアル', 'ベストプラクティス']
        },
        {
            id: 'mesh-ai-vs-traditional',
            title: 'AI 3Dモデリング vs 従来型モデリング：メリット比較分析',
            description: 'AI主導の3Dモデリングと従来のモデリング方法の長所と短所を深く比較分析し、最適な作成方法の選択を支援する。',
            date: '2025-01-28',
            author: 'Emily Wang',
            tags: ['比較分析', '3Dモデリング', 'AI技術']
        },
        {
            id: 'mesh-ai-tips',
            title: 'Meshivo 3Dの使用効率を高める10のプロフェッショナルなヒント',
            description: 'Meshivo 3Dをより効率的に使用し、より高品質な3Dモデルを作成するのに役立つ10の実用的なヒントを共有する。',
            date: '2025-02-12',
            author: 'David Liu',
            tags: ['ヒント', '効率向上', 'ベストプラクティス']
        },
        {
            id: '3d-industry-impact',
            title: 'AI 3D技術が各業界に与える影響：ゲーム、映画、建築など',
            description: 'AI 3Dモデリング技術が、ゲーム開発、映画制作、建築設計など様々な業界にどのように影響を与えるかを分析する。',
            date: '2025-01-20',
            author: 'Sophie Chen',
            tags: ['業界応用', '事例研究', '3D技術']
        },
        {
            id: 'future-3d-ai',
            title: '3D AIの未来：技術トレンドと発展の方向性',
            description: '3D AI技術の将来の発展方向を展望し、間近に迫った技術的ブレイクスルーと応用シナリオを探る。',
            date: '2025-02-25',
            author: 'James Li',
            tags: ['未来トレンド', 'AI技術', '技術展望']
        }
    ],
    ko: [
        {
            id: 'ai-3d-revolution',
            title: 'AI 기반 3D 모델링 혁명: Meshivo 3D가 창작 방식을 어떻게 바꾸는가',
            description: 'AI 기술이 전통적인 3D 모델링 프로세스를 어떻게 완전히 변화시키고 있으며, Meshivo 3D가 이 혁명을 어떻게 주도하는지 탐구합니다.',
            date: '2025-01-15',
            author: 'Alex Chen',
            tags: ['AI 기술', '3D 모델링', '산업 트렌드']
        },
        {
            id: 'mesh-ai-features',
            title: 'Meshivo 3D 핵심 기능 심층 분석: 텍스트에서 3D 모델로의 마법',
            description: '지능형 재질 매칭, 원클릭 최적화, 스타일 맞춤화 등 Meshivo 3D의 핵심 기능을 깊이 이해하고, 이들이 어떻게 3D 창작 과정을 단순화하는지 알아봅니다.',
            date: '2025-02-20',
            author: 'Sarah Johnson',
            tags: ['제품 기능', '3D 모델링', 'AI 도구']
        },
        {
            id: 'ai-3d-workflow',
            title: '아이디어부터 완성품까지: Meshivo 3D를 사용한 완벽한 작업 흐름',
            description: 'Meshivo 3D를 사용하여 최초의 아이디어 구상부터 최종 3D 모델 내보내기까지의 전체 작업 흐름을 자세히 소개합니다.',
            date: '2025-02-05',
            author: 'Michael Zhang',
            tags: ['작업 흐름', '튜토리얼', '모범 사례']
        },
        {
            id: 'mesh-ai-vs-traditional',
            title: 'AI 3D 모델링 vs 전통 모델링: 장점 비교 분석',
            description: 'AI 기반 3D 모델링과 전통적인 모델링 방법의 장단점을 심층적으로 비교 분석하여, 가장 적합한 창작 방식을 선택하도록 돕습니다.',
            date: '2025-01-28',
            author: 'Emily Wang',
            tags: ['비교 분석', '3D 모델링', 'AI 기술']
        },
        {
            id: 'mesh-ai-tips',
            title: 'Meshivo 3D 사용 효율을 높이는 10가지 전문 팁',
            description: 'Meshivo 3D를 더 효율적으로 사용하고 더 우수한 3D 모델을 만들 수 있도록 돕는 10가지 실용적인 팁을 공유합니다.',
            date: '2025-02-12',
            author: 'David Liu',
            tags: ['팁', '효율성 향상', '모범 사례']
        },
        {
            id: '3d-industry-impact',
            title: 'AI 3D 기술이 각 산업에 미치는 영향: 게임, 영화, 건축 등',
            description: 'AI 3D 모델링 기술이 게임 개발, 영화 제작, 건축 설계 등 여러 산업에 어떻게 영향을 미치는지 분석합니다.',
            date: '2025-01-20',
            author: 'Sophie Chen',
            tags: ['산업 응용', '사례 연구', '3D 기술']
        },
        {
            id: 'future-3d-ai',
            title: '3D AI의 미래: 기술 동향 및 발전 방향',
            description: '3D AI 기술의 미래 발전 방향을 전망하고, 곧 다가올 기술적 돌파구와 응용 시나리오를 논의합니다.',
            date: '2025-02-25',
            author: 'James Li',
            tags: ['미래 트렌드', 'AI 기술', '기술 전망']
        }
    ],
    hi: [
        {
            id: 'ai-3d-revolution',
            title: 'AI-संचालित 3D मॉडलिंग क्रांति: Meshivo 3D कैसे बदल रहा है सृजन का तरीका',
            description: 'जानें कि AI तकनीक कैसे पारंपरिक 3D मॉडलिंग प्रक्रिया में पूरी तरह से बदलाव ला रही है, और Meshivo 3D इस क्रांति का नेतृत्व कैसे कर रहा है।',
            date: '2025-01-15',
            author: 'Alex Chen',
            tags: ['AI तकनीक', '3D मॉडलिंग', 'उद्योग रुझान']
        },
        {
            id: 'mesh-ai-features',
            title: 'Meshivo 3D मुख्य विशेषताओं का गहन विश्लेषण: पाठ से 3D मॉडल तक का जादू',
            description:
                'Meshivo 3D की मुख्य विशेषताओं, जैसे स्मार्ट सामग्री मिलान, वन-क्लिक ऑप्टिमाइज़ेशन, स्टाइल कस्टमाइज़ेशन, और वे 3D सृजन प्रक्रिया को कैसे सरल बनाते हैं, उनके बारे में गहराई से जानें।',
            date: '2025-02-20',
            author: 'Sarah Johnson',
            tags: ['उत्पाद सुविधाएँ', '3D मॉडलिंग', 'AI उपकरण']
        },
        {
            id: 'ai-3d-workflow',
            title: 'विचार से अंतिम उत्पाद तक: Meshivo 3D का उपयोग करके संपूर्ण कार्यप्रवाह',
            description: 'Meshivo 3D का उपयोग करके प्रारंभिक विचार से लेकर अंतिम 3D मॉडल निर्यात तक की पूरी कार्यप्रवाह की विस्तृत जानकारी।',
            date: '2025-02-05',
            author: 'Michael Zhang',
            tags: ['कार्यप्रवाह', 'ट्यूटोरियल', 'सर्वोत्तम अभ्यास']
        },
        {
            id: 'mesh-ai-vs-traditional',
            title: 'AI 3D मॉडलिंग बनाम पारंपरिक मॉडलिंग: लाभों का तुलनात्मक विश्लेषण',
            description: 'AI-संचालित 3D मॉडलिंग और पारंपरिक मॉडलिंग विधियों के फायदे और नुकसान की गहन तुलना, जो आपको सबसे उपयुक्त सृजन विधि चुनने में मदद करती है।',
            date: '2025-01-28',
            author: 'Emily Wang',
            tags: ['तुलनात्मक विश्लेषण', '3D मॉडलिंग', 'AI तकनीक']
        },
        {
            id: 'mesh-ai-tips',
            title: 'Meshivo 3D के उपयोग की दक्षता बढ़ाने के 10 पेशेवर सुझाव',
            description: '10 व्यावहारिक सुझाव साझा किए गए हैं, जो आपको Meshivo 3D का अधिक कुशलता से उपयोग करने और बेहतर गुणवत्ता वाले 3D मॉडल बनाने में मदद करेंगे।',
            date: '2025-02-12',
            author: 'David Liu',
            tags: ['सुझाव', 'दक्षता सुधार', 'सर्वोत्तम अभ्यास']
        },
        {
            id: '3d-industry-impact',
            title: 'AI 3D तकनीक का विभिन्न उद्योगों पर प्रभाव: गेम, फिल्म, वास्तुकला आदि',
            description: 'विश्लेषण करें कि AI 3D मॉडलिंग तकनीक गेम विकास, फिल्म निर्माण, वास्तुकला डिजाइन जैसे कई उद्योगों को कैसे प्रभावित कर रही है।',
            date: '2025-01-20',
            author: 'Sophie Chen',
            tags: ['उद्योग अनुप्रयोग', 'केस स्टडी', '3D तकनीक']
        },
        {
            id: 'future-3d-ai',
            title: '3D AI का भविष्य: तकनीकी रुझान और विकास की दिशा',
            description: '3D AI तकनीक के भविष्य के विकास की दिशा पर एक नज़र, आने वाले तकनीकी नवाचारों और अनुप्रयोग परिदृश्यों पर चर्चा।',
            date: '2025-02-25',
            author: 'James Li',
            tags: ['भविष्य के रुझान', 'AI तकनीक', 'तकनीकी दृष्टिकोण']
        }
    ]
};

export default blogData;
