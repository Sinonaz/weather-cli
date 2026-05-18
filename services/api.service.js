import { printError } from "./log.service.js";
import { getValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

async function getWeatherData(city) {
  if (!city) {
    printError("City is required");
  }

  const token = process.env.TOKEN || await getValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error("Token is not defined");
  }

  const { lat, lon } = await getLocationData(city, token);
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat,
      lon,
      appid: token,
      units: "metric",
      lang: "en",
    },
  });

  return data;
}

async function getLocationData(location, token) {
  const { data } = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: {
      q: location,
      limit: 5,
      appid: token,
    },
  });

  return data[0];
}

export { getWeatherData };
