import type { PropsWithoutRef } from 'react';
import { cn } from '@/utils';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
interface MarkdownProps {
    type: 'blog' | 'detail';
    text: string;
    className?: string;
}

export function Markdown(props: PropsWithoutRef<MarkdownProps>) {
    let cl = cn('prose dark:prose-invert mx-auto max-w-prose', props.className);

    if (props.type !== 'blog') {
        cl = cn('', props.className);
    }

    return (
        <div className={cl}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                {props.text}
            </ReactMarkdown>
        </div>
    );
}
