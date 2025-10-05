import { input, select, Separator } from '@inquirer/prompts';

import { createCleanProject } from '../flows/projectCreate/createCleanProject';

const createCommand = async (): Promise<void> => {
  const readProjectType = await select({
    message: 'Select the project type:',
    choices: [
      {
        name: 'Empty Project',
        value: 'empty',
        description:
          'Create a new empty project with default settings, perfect for starting from scratch.',
      },
      new Separator(),
      {
        name: 'Manual Project',
        value: 'manual',
        description:
          'Start a fully customizable project with default settings, ideal if you want complete control and advanced manual configuration.',
        disabled: true,
      },
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
    });

    const readPackageName = await input({
      message: 'Enter the package identifier (e.g. "my-app"):',
      required: true,
    });

    const readProjectURL = await input({
      message: 'Enter your project\'s domain URL (e.g. "https://deskofy.app"):',
      required: true,
    });

    await createCleanProject({
      directoryToPerform: process.cwd(),
      projectName: readProjectName,
      packageName: readPackageName,
      domain: readProjectURL,
      isEmpty: readProjectType === 'empty',
    });
  }
};

export { createCommand };
