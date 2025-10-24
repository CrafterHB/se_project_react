import { latitude, longitude, apiKey } from "./constants.js";

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error from weather API: ${res.status}`);
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parsedData = { temp: {} };

  parsedData.city = data.name;
  parsedData.temp.F = Math.round(data.main.temp);
  parsedData.temp.C = Math.round(((data.main.temp - 32) * 5) / 9);

  return parsedData;
}

export function getWeatherCondition(data) {
  if (data.temp >= 86) {
    return "hot";
  } else if (data.temp >= 65 && data.temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
