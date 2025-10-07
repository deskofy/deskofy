import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createESLintConfig = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = 'eslint.config.mjs';

  const eslintJSONStructure = [
    {
      ignores: [
        '**/*.config.{js,mjs,ts}',
        '**/build/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/out/**',
      ],
    },
    {
      name: 'ESLint Config - Deskofy App',
      files: ['**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'ES2023',
          sourceType: 'module',
        },
      },
      rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'no-await-in-loop': 'error',
        'no-console': 'warn',
        'no-dupe-else-if': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-func-assign': 'error',
        'no-import-assign': 'error',
        'no-self-assign': 'error',
        'no-unreachable': 'error',
        'no-unused-labels': 'error',
        'no-use-before-define': 'off',
        'prefer-destructuring': 'off',
        'valid-typeof': 'error',
      },
    },
  ];

  const fileContent = `import { ESLint } from 'eslint';

/** @type {ESLint.ConfigData} */
export default ${JSON.stringify(eslintJSONStructure, null, 2)};
`;

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    fileContent,
  );
};

export { createESLintConfig };
