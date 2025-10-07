#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  buildCommand,
  supportedBuildTargets,
  TSupportedBuildPlatforms,
} from './commands/build.js';
import { createCommand } from './commands/create.js';
import { fmtCommand } from './commands/fmt.js';
import { lintCommand } from './commands/lint.js';
import { runCommand } from './commands/run.js';
import { typesCommand } from './commands/types.js';
import { returnPlatform } from './helpers/checkPlatform.js';
import { printDefaultMessage } from './messages/default.js';
import { printError, printLog, printWarning } from './utils/printLog.js';

const yargsInstance = yargs(hideBin(process.argv));

yargsInstance
  .scriptName('deskofy')
  .usage('\nUsage: $0 <command> [options]')
  .version('1.0.0')
  .alias('v', 'version')
  .alias('h', 'help')
  .epilogue(
    '📚 Read the documentation for more information: https://docs.deskofy.app',
  )
  .showHelpOnFail(true, 'Specify --help for available options')
  .demandCommand(1, 'You need to specify a command before moving on')
  .recommendCommands()
  .strict()
  .command(
    'create',
    'Initialize a new deskofy project',
    () => {},
    async () => await createCommand(),
  )
  .command(
    'run [project-config-file]',
    'Run a deskofy project',
    (yargs) =>
      yargs.positional('project-config-file', {
        describe: 'Path to the project configuration file',
        type: 'string',
        default: 'deskofy.config.json5',
      }),
    async (argv) => await runCommand(argv.projectConfigFile),
  )
  .command(
    'build',
    'Build a deskofy project',
    (yargs) =>
      yargs
        .option('config', {
          describe: 'Path to the project configuration file',
          type: 'string',
          default: 'deskofy.config.json5',
          demandOption: true,
          requiresArg: true,
        })
        .option('target', {
          describe: 'Output format for the build',
          type: 'string',
          demandOption: true,
        })
        .check((argv) => {
          const platform = returnPlatform() as TSupportedBuildPlatforms;
          const target = argv.target as string;

          if (!supportedBuildTargets[platform].includes(target)) {
            printError(
              `Invalid target "${target}" for platform "${platform}". Supported targets: ${supportedBuildTargets[platform].join(', ')}`,
            );

            process.exit(1);
          }

          return true;
        }),
    async (argv) => await buildCommand(argv.config, argv.target),
  )
  .command(
    'fmt',
    'Format source code',
    () => {},
    async () => await fmtCommand(),
  )
  .command(
    'lint',
    'Run linter on the project',
    () => {},
    async () => await lintCommand(),
  )
  .command(
    'types',
    'Check TypeScript types in the project',
    () => {},
    async () => await typesCommand(),
  )
  .fail((msg, err, yargs) => {
    if (err) {
      printError(err.message);
    } else if (msg) {
      if (msg.includes('Missing required argument')) {
        printWarning(msg);
      } else if (msg.includes('Unknown argument')) {
        printWarning(msg);
      } else if (msg.includes('Not enough non-option arguments')) {
        printError(msg);
        printLog(`Run 'deskofy --help' to see available commands.\n`);
      } else {
        printError(msg);
      }
    }

    if (!msg && !err) {
      yargs.showHelp();
    }

    process.exit(1);
  })
  .middleware((argv) => {
    if (argv._.length === 0 && !argv.version && !argv.help) {
      printDefaultMessage();
      process.exit(0);
    }
  }, true);

yargsInstance.parse();
