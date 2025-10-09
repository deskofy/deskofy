import { input, select, Separator } from '@inquirer/prompts';

import { createCleanProject } from '../flows/create/createCleanProject';
import { isDirectoryEmpty } from '../utils/isDirectoryEmpty';
import { printError } from '../utils/printLog';

const createCommand = async (): Promise<void> => {
  const runningDirectory = process.cwd();

  if (!isDirectoryEmpty(runningDirectory)) {
    printError('Deskofy can only create new projects in an empty folder.');
    return;
  }

  const readProjectType = await select({
    message: 'Select the project type:',
    choices: [
      {
        name: 'Empty Project',
        value: 'empty',
        description:
          'Create a new empty project with default settings, perfect for starting from scratch.',
      },
      {
        name: 'Manual Project',
        value: 'manual',
        description:
          'Start a fully customizable project with default settings, ideal if you want complete control and advanced manual configuration.',
      },
      new Separator(),
      {
        name: 'Test Project',
        value: 'test',
        description:
          "Create a test project to explore and test Deskofy's features.",
        disabled: true,
      },
      {
        name: 'AI-based Project',
        value: 'ai',
        description:
          "Create a project from a single prompt using AI, just describe what you need, and we'll generate it for you.",
        disabled: true,
      },
      {
        name: 'Template-based Project',
        value: 'template',
        description:
          'Create a project from an existing template, ideal if you want to start from a predefined setup.',
        disabled: true,
      },
    ],
  });

  if (readProjectType === 'empty' || readProjectType === 'manual') {
    const readProjectName = await input({
      message: 'Enter a name for your project (e.g. "My App"):',
      required: true,
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Project name is required';
        }

        if (value.trim().length < 2) {
          return 'Project name must be at least 2 characters long';
        }

        if (value.trim().length > 100) {
          return 'Project name must be less than 100 characters';
        }

        return true;
      },
    });

    const readProjectVersion = await input({
      message: 'Enter the initial version of your project (e.g. "1.0.0"):',
      default: '1.0.0',
      validate: (value: string) => {
        const semverRegex = /^\d+\.\d+\.\d+$/;
        if (!semverRegex.test(value.trim())) {
          return 'Version must follow semantic versioning format (e.g., 1.0.0)';
        }

        return true;
      },
    });

    const readPackageName = await input({
      message: 'Enter the package identifier (e.g. "my-app"):',
      required: true,
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Package identifier is required';
        }

        const packageNameRegex = /^[a-z0-9-]+$/;
        if (!packageNameRegex.test(value.trim())) {
          return 'Package identifier must contain only lowercase letters, numbers, and hyphens';
        }

        if (value.trim().startsWith('-') || value.trim().endsWith('-')) {
          return 'Package identifier cannot start or end with a hyphen';
        }

        if (value.trim().length < 2) {
          return 'Package identifier must be at least 2 characters long';
        }

        if (value.trim().length > 214) {
          return 'Package identifier must be less than 214 characters';
        }

        return true;
      },
    });

    const readProjectDescription = await input({
      message:
        'Enter a brief description of your project (e.g. "A task management app for teams"):',
      default: 'A Deskofy Application',
      validate: (value: string) => {
        if (value.trim().length > 500) {
          return 'Description must be less than 500 characters';
        }

        return true;
      },
    });

    const readProjectAuthor = await input({
      message: 'Enter the author name (e.g. "Jane Doe <hi@deskofy.com>"):',
      default: 'Deskofy',
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Author name is required';
        }

        if (value.trim().length > 200) {
          return 'Author name must be less than 200 characters';
        }

        const emailRegex = /<([^>]+)>/;
        const emailMatch = value.match(emailRegex);
        if (emailMatch) {
          const email = emailMatch[1];
          const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!validEmailRegex.test(email)) {
            return 'Invalid email format in author field';
          }
        }

        return true;
      },
    });

    const readProjectURL = await input({
      message: 'Enter your project\'s domain URL (e.g. "https://deskofy.app"):',
      required: true,
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Project URL is required';
        }

        try {
          const url = new URL(value.trim());
          if (!url.protocol.startsWith('http')) {
            return 'URL must start with http:// or https://';
          }

          return true;
        } catch {
          return 'Please enter a valid URL (e.g., https://deskofy.app)';
        }
      },
    });

    await createCleanProject({
      directoryToPerform: runningDirectory,
      projectVersion: readProjectVersion,
      projectName: readProjectName,
      projectDescription: readProjectDescription,
      projectAuthor: readProjectAuthor,
      packageName: readPackageName,
      domain: readProjectURL,
      isEmpty: readProjectType === 'empty',
    });
  }
};

export { createCommand };
