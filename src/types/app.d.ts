/// <reference types="vite/client" />
declare module '*.md' {
    interface MarkdownAttributes {
        title: string;
        date: string;
        tags: string[];
        description: string;
        author: string;
        [key: string]: unknown;
    }
    // "unknown" would be more detailed depends on how you structure frontmatter
    const attributes: MarkdownAttributes;

    // When "Mode.TOC" is requested
    const toc: { level: string; content: string }[];

    // When "Mode.HTML" is requested
    const html: string;

    // When "Mode.MARKDOWN" is requested
    const markdown: string;

    // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
    import type React from 'react';
    const ReactComponent: React.VFC;

    // When "Mode.Vue" is requested
    import type { Component, ComponentOptions } from 'vue';
    const VueComponent: ComponentOptions;
    const VueComponentWith: (components: Record<string, Component>) => ComponentOptions;

    // Modify below per your usage
    export { attributes, html, markdown, ReactComponent, toc, VueComponent, VueComponentWith };
}
