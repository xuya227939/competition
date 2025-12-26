import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/utils';
import intl from 'react-intl-universal';

export function FaqC(props: { containerClassName: string }) {
    const faqs = [
        {
            question: intl.get('faq.tips2'),
            answer: intl.get('faq.subTips2')
        },
        {
            question: intl.get('faq.tips3'),
            answer: intl.get('faq.subTips3')
        },
        {
            question: intl.get('faq.tips4'),
            answer: intl.get('faq.subTips4')
        },
        {
            question: intl.get('faq.tips5'),
            answer: intl.get('faq.subTips5')
        },
        {
            question: intl.get('faq.tips7'),
            answer: intl.get('faq.subTips7')
        }
    ];

    return (
        <section className={cn('mt-24', props.containerClassName)}>
            <div className="pb-12 md:pb-20">
                {/* 标题区域 */}
                <div className="mb-12 flex justify-center md:flex">
                    <div className="text-center">
                        <h2 className="font-hkgrotesk mb-4 text-center text-4xl font-extrabold text-white md:mb-0 md:text-5xl">{intl.get('faq.title')}</h2>
                        <div className="mx-auto h-1 w-24 rounded-full"></div>
                    </div>
                </div>

                {/* FAQ手风琴 */}
                <Accordion type="multiple">
                    {faqs.map((faq, index) => {
                        const itemValue = `item-${index}`;
                        return (
                            <AccordionItem value={itemValue} key={index} className="cursor-pointer">
                                <AccordionTrigger className="cursor-pointer text-left">
                                    <span className="font-semibold text-white/90">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-left">
                                    <div className="font-medium text-white/75">{faq.answer}</div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
}
