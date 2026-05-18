#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

function initCLI() {
  const args = getArgs(process.argv);

  switch (true) {
    case Object.hasOwn(args, "c"):
      // save city
      break;
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
  try {
    await saveKeyValue("token", token);
    printSuccess("Token saved successfully");
  } catch (e) {
    console.log(e);
    printError(`Error saving token: ${e.message}`);
  }
}

void initCLI();
