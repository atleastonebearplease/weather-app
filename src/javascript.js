import { format, formatDistance, formatRelative, addDays, DateArg } from "date-fns";
import weatherDataJSON from "./testResponse.json"

function getSevenDayDateRange() {
  let today = new Date(); 

  console.log(format(today, "eee - M/dd"));

  let weekFromToday = addDays(today, 6);

  return {
    today: format(today, "yyyy-MM-dd"), 
    weekFromToday: format(weekFromToday, "yyyy-MM-dd")
  }
}

async function getWeatherData(city) {
  let weekRange = getSevenDayDateRange();

  // const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/huntingdon%2C%20tennessee/${weekRange.today}/${weekRange.weekFromToday}?unitGroup=us&include=days,current&key=8ZEGCZEHNLG7BUTQE56KUANQL&contentType=json`);

  //const weatherData = await response.json();

  //return JSON.parse(weatherData);

  let data = await weatherDataJSON;

  return data;
}

function processWeatherData(data) {
  console.log(data);

  let sevenDayForecast = [];

  for(let i = 0; i < 7; i++) {
    const dayData = new Object();

    dayData.high = data.days[i].tempmax;
    dayData.low = data.days[i].templow;

    sevenDayForecast.push(dayData);
  }

  console.log(sevenDayForecast);
}

let weatherDataObj = getWeatherData("Huntingdon, TN");

weatherDataObj.then(processWeatherData);




/* 
========================================================
WEATHER API STUFF
========================================================

https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/huntingdon%2C%20tennessee/[date1]/[date2]
  ?unitGroup=us
  &include=days,current
  &key=8ZEGCZEHNLG7BUTQE56KUANQL
  &contentType=json
  
Format: 
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/
timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY&include

Types of precipitation:
  rain, snow, freezing rain and ice.

Just need five icons, one for sunny and the rest of these

My KEY: 8ZEGCZEHNLG7BUTQE56KUANQL

Need: 
Location
The temperature for today
The day of the week
The date of the day
The high of the day
The low of the day
The type of precipitation, if any


========================================================
DATE FUNCTIONS STUFF
========================================================
Notes from the date-fns API

format(new Date(2025, 0, 13), "eee - M/dd")
Output: Tue - 1/13

format(Date object, formatString)

Date object month starts at 0 (goes 0-11) add one for correct month

Play with it

*/