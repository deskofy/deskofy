#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { buildCommand } from './commands/build.js';
import { compileCommand } from './commands/compile.js';
import { createCommand } from './commands/create.js';
import { exportCommand } from './commands/export.js';
import { infoCommand } from './commands/info.js';
import { lintCommand } from './commands/lint.js';
import { runCommand } from './commands/run.js';
import { setupCommand } from './commands/setup.js';
import { telemetryCommand } from './commands/telemetry.js';
import { typesCommand } from './commands/types.js';
import { upgradeCommand } from './commands/upgrade.js';
import { printDefaultMessage } from './messages/default.js';
import { printError, printLog, printWarning } from './utils/printLog.js';

const yargsInstance = yargs(hideBin(process.argv));

yargsInstance
  .scriptName('deskofy')
  .usage('\nUsage: $0 <command> [options]')
  .version('1.0.0')
  .alias('v', 'version')
  .alias('h', 'help')
  .epilogue('Documentation: https://deskofy.dev\n')
  .showHelpOnFail(true, 'Specify --help for available options')
  .demandCommand(1, 'You need to specify a command before moving on')
  .recommendCommands()
  .strict()
  .command(
    'setup [type]',
    'Setup deskofy configuration',
    (yargs) =>
      yargs.positional('type', {
        describe: 'Setup type: "global" for global configuration',
        type: 'string',
        choices: ['global'],
      }),
    (argv) => setupCommand(argv.type),
  )
  .command(
    'upgrade',
    'Upgrade deskofy to the latest version',
    () => {},
    () => upgradeCommand(),
  )
  .command(
    'create',
    'Initialize a new deskofy project',
    () => {},
    async () => await createCommand(),
  )
  .command(
    'compile <project-config-file>',
    'Compile a deskofy project',
    (yargs) =>
      yargs.positional('project-config-file', {
        describe: 'Path to the project configuration file',
        type: 'string',
      }),
    (argv) => compileCommand(argv.projectConfigFile),
  )
  .command(
    'run <project-config-file>',
    'Run a deskofy project',
    (yargs) =>
      yargs.positional('project-config-file', {
        describe: 'Path to the project configuration file',
        type: 'string',
      }),
    (argv) => runCommand(argv.projectConfigFile),
  )
  .command(
    'build',
    'Build a deskofy project',
    (yargs) =>
      yargs
        .option('build', {
          describe: 'Path to the build configuration file',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        })
        .option('config', {
          describe: 'Path to the project configuration file',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        }),
    (argv) => buildCommand(argv.build, argv.config),
  )
  .command(
    'lint',
    'Run linter on the project',
    () => {},
    () => lintCommand(),
  )
  .command(
    'types',
    'Check TypeScript types in the project',
    () => {},
    () => typesCommand(),
  )
  .command(
    'info',
    'Display project and environment information',
    () => {},
    () => infoCommand(),
  )
  .command(
    'export <project-config-file>',
    'Export project',
    (yargs) =>
      yargs.positional('project-config-file', {
        describe: 'Path to the project configuration file',
        type: 'string',
      }),
    (argv) => exportCommand(argv.projectConfigFile),
  )
  .command(
    'telemetry <action>',
    'Manage telemetry settings',
    (yargs) =>
      yargs.positional('action', {
        describe: 'Action: "enable", "disable", or "status"',
        type: 'string',
        choices: ['enable', 'disable', 'status'],
      }),
    (argv) => telemetryCommand(argv.action),
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
