import chalk from 'chalk';

import type { NotifierLogger } from './types';
import { IDENTIFIER } from './constants';

function normalizeError(error: string) {
  return chalk.greenBright(`[${IDENTIFIER}] - `) + chalk.white(new Date().toLocaleString() + '   ') + error;
}

function log(text: string): void {
  return console.log(text);
}

function info() {}
function error(...args: any[]): void {
  return log(normalizeError(chalk.redBright('[Error] ' + args.join(' ') + '.')));
}
function warn() {}
function success() {}

export const logger: NotifierLogger = {
  log,
  info,
  error,
  warn,
  success,
};
