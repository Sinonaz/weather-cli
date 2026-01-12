#! /usr/bin/env node

import { getArgs } from './helpers/args.js';

function initWeatherCLI() {
  const args = getArgs(process.argv);

  console.log(args);

  switch (true) {
    case args.c:
      // save city
      break;
    case args.h:
      // show help
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