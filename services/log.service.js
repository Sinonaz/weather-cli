import chalk from 'chalk';
import dedent from 'dedent-js';

function printError(error) {
  console.error(`${chalk.bgRed('ERROR')}: ${error}`);
}

function printSuccess(message) {
  console.log(`${chalk.bgGreen('SUCCESS')}: ${message}`);
}

function printHelp() {
  console.log(dedent`
    ${chalk.bgCyan('HELP')}:
    Without any arguments, the CLI will prompt you for a location if it not saved.

    -c [city] for the city
    -h for help
    -t for token
  `);
}

export { printError, printSuccess, printHelp };
