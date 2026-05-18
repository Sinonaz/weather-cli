#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { getValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeatherData } from "./services/api.service.js";

function initCLI() {
  const args = getArgs(process.argv);

  switch (true) {
    case Object.hasOwn(args, "c"):
      // save city

      return saveCity(args.c);
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

  void getForecast();
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

async function saveCity(city) {
  if (!city) {
    printError("City is required");

    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City saved successfully");
  } catch (e) {
    console.log(e);
    printError(`Error saving city: ${e.message}`);
  }
}

async function getForecast() {
  try {
    const city = process.env.CITY || await getValue(TOKEN_DICTIONARY.city);
    const data = await getWeatherData(city);

    console.log(data);
  } catch (e) {
    switch (e?.response?.status) {
      case 401:
        printError("Invalid token");
        break;
      case 404:
        printError("City not found");
        break;
      default:
        printError(`Error fetching weather data: ${e.message}`);
        break;
    }
  }
}

void initCLI();
