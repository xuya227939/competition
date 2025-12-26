import antfu from '@antfu/eslint-config';
import pluginPromise from 'eslint-plugin-promise';

export default antfu(
    {
        react: true,
        stylistic: false
    },
    {
        ignores: ['src/assets', 'src/whiteboard', 'src/pages/help/components'],
        rules: {
            'no-console': 'off',
            'unused-imports/no-unused-imports': 'error'
        }
    },
    pluginPromise.configs['flat/recommended']
);
