import chalk from 'chalk';


import type { NotifierLogger } from './types';
import { IDENTIFIER } from './constants';

function normalizeLog(text: string) {
  return chalk.greenBright(`[${IDENTIFIER}] - `) + chalk.white(new Date().toLocaleString() + '   ') + text;
}

export const logger: NotifierLogger = {
  info: (...args) => console.log(normalizeLog(chalk.blueBright('[Info] ' + args.join(' ') + '.'))),
  error: (...args) => console.log(normalizeLog(chalk.redBright('[Error] ' + args.join(' ') + '.'))),
  warn: (...args) => console.log(normalizeLog(chalk.yellowBright('[Warn] ' + args.join(' ') + '.'))),
  success: (...args) => console.log(normalizeLog(chalk.greenBright('[Success] ' + args.join(' ') + '.'))),
};
