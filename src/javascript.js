import './styles.css'

import { searchForWeatherData } from './getWeatherData.js';
import { addPlaceholders } from "./formatWeatherData.js";


let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchForWeatherData);

addPlaceholders();

let searchButton = document.querySelector("#search-button");

/* TESTING */
searchButton.click();
/* TESTING */


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