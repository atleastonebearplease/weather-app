import { format, formatDistance, formatRelative, addDays } from "date-fns";

function getSevenDayDateRange() {
  let todayString = new Date();

  let todaysDate = { 
    year: todayString.getFullYear,
    month: todayString.getMonth,
    day: todayString.getDay 
  }

  console.log(format(todayString, "eee - M/DD"));
}

async function getWeatherData(city) {

  

}








/* https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/huntingdon%2C%20tennessee/[date1]/[date2]
  ?unitGroup=us
  &include=days,hours,current
  &key=8ZEGCZEHNLG7BUTQE56KUANQL
  &contentType=json 
  
    https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/
    timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY&include


Actually, it looks like this should give us 15 days of data: However, we can request future dates and those will be forecasts
  https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=YOUR_API_KEY

  */
//Call to the API for the data that you need

//My KEY: 8ZEGCZEHNLG7BUTQE56KUANQL

/* 
Notes from the date-fns API

format(new Date(2025, 0, 13), "eee - M/DD")
Output: Tue - 1/13

format(Date object, formatString)

Date object month starts at 0 (goes 0-11) add one for correct month

Play with it

*/