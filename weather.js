#! /usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printHelp } from './services/log.service.js';

function initWeatherCLI() {
  const args = getArgs(process.argv);

  switch (true) {
    case args.c:
      // save city
      break;
    case args.h:
      // show help
      printHelp();
      break;
    case args.t:
      // save token
      break;
    default:
      console.log('Undefined arguments');
      break;
  }
}

initWeatherCLI();
