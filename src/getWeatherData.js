import weatherDataJSON from "./testResponse.json"
import { format, formatDistance, formatRelative, addDays, DateArg, parseISO } from "date-fns";

async function getWeatherData(city) {
  
  let searchQuery = city.replace(" ", "+");

  let weekRange = getDateRange(7);

//   const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery}/${weekRange.today}/${weekRange.weekFromToday}?unitGroup=us&include=days,current&key=8ZEGCZEHNLG7BUTQE56KUANQL&contentType=json`);

//   const weatherData = await response.json();

/* TESTING */
  const weatherData = weatherDataJSON;
/* TESTING */

  console.log(weatherData);

//   return weatherData;

/* TESTING */
  let data = await weatherDataJSON;

  return data;
/* TESTING */
}

function getDateRange(daysFromNow) {
  let today = new Date(); 

  let weekFromToday = addDays(today, daysFromNow);

  return {
    today: format(today, "yyyy-MM-dd"), 
    weekFromToday: format(weekFromToday, "yyyy-MM-dd")
  }
}

function processWeatherData(data) {
  console.log(data);

  let sevenDayForecast = {
    location: data.resolvedAddress,
    forecast: processForecastData(data)
  }

  console.log(sevenDayForecast);
}

function processForecastData(data) {
  let days = [];
  
  for(let i = 0; i < data.days.length; i++) {
    const dayData = new Object();

    let day = format(parseISO(data.days[i].datetime), "EEE"); //Mon, Tue, Wed, ...

    dayData.dayOfWeek = day;
    dayData.date = data.days[i].datetime;
    dayData.high = data.days[i].tempmax;
    dayData.low = data.days[i].tempmin;
    dayData.precipitationType = data.days[i].preciptype ? data.days[i].preciptype[0] : "clear";

    days.push(dayData);
  }

  return days;
}

export function searchForWeatherData(event) {
  event.preventDefault();

  let searchBar = document.querySelector("#weather-search");

  let weatherPromise = getWeatherData(searchBar.value);

  weatherPromise
  .then(processWeatherData)
  .then(displayForecast);
}

function displayForecast(data) {
  console.log(data);
}
