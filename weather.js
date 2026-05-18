#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeatherData } from "./services/api.service.js";

function initCLI() {
  const args = getArgs(process.argv);

  switch (true) {
    case Object.hasOwn(args, "c"):
      // save city

      return getWeatherData(args.c);
    case Object.hasOwn(args, "h"):
      // show help

      printHelp();
      break;
    case Object.hasOwn(args, "t"):
      // save token

      return saveToken(args.t);
    default:
      console.log("Undefined arguments");
      break;
  }
}

async function saveToken(token) {
  if (!token) {
    printError("Token is required");

    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved successfully");
  } catch (e) {
    console.log(e);
    printError(`Error saving token: ${e.message}`);
  }
}

void initCLI();
