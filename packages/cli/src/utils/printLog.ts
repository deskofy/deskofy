import chalk from 'chalk';

const printLog = (message?: any, ...optionalParams: any[]): void =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.log(message, ...optionalParams);

const printError = (message?: any, ...optionalParams: any[]): void =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.error(chalk.redBright('Error:'), message, ...optionalParams);

const printWarning = (message?: any, ...optionalParams: any[]): void =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.warn(chalk.yellowBright('Warning:'), message, ...optionalParams);

export { printLog, printError, printWarning };
