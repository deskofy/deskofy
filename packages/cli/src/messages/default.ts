import chalk from 'chalk';

const printDefaultMessage = (): void => {
  // prettier-ignore

  {
    console.log(chalk.greenBright("You are currently logged in as a guest user.\n"));

    console.log('██████╗ ███████╗███████╗██╗  ██╗ ██████╗ ███████╗██╗   ██╗     ██████╗██╗     ██╗')
    console.log('██╔══██╗██╔════╝██╔════╝██║ ██╔╝██╔═══██╗██╔════╝╚██╗ ██╔╝    ██╔════╝██║     ██║')
    console.log('██║  ██║█████╗  ███████╗█████╔╝ ██║   ██║█████╗   ╚████╔╝     ██║     ██║     ██║')
    console.log('██║  ██║██╔══╝  ╚════██║██╔═██╗ ██║   ██║██╔══╝    ╚██╔╝      ██║     ██║     ██║')
    console.log('██████╔╝███████╗███████║██║  ██╗╚██████╔╝██║        ██║       ╚██████╗███████╗██║')
    console.log('╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝        ╚═╝        ╚═════╝╚══════╝╚═╝\n')

    console.log("Usage: deskofy [command]\n")
    console.log("Try 'deskofy -h' for a list of available commands.\n")
    console.log("Examples:")
    console.log("  $ deskofy create : Create a deskofy app")
    console.log("  $ deskofy run    : Run deskofy app\n")

    console.log(chalk.yellow("The deskofy is still public preview and not production-ready. Sign up"))
    console.log(chalk.yellow(`for the early access waitlist ${chalk.red('https://deskofy.app')} to receive updates.\n`))
  }
};

export { printDefaultMessage };
