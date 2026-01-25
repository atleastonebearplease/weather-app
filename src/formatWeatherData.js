import { format, formatDistance, formatRelative, addDays, DateArg, parseISO } from "date-fns";

const weatherIcons = {
    clear: "sun.png",
    partlyCloudy: "partly-cloudy.png",
    cloudy: "clouds.png",
    rain: "rainy.png",
    snow: "snowy.png",
    freezingRain: "freezing-rain.png",
    ice: "ice.png"
}

/* 
<a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/partly-cloudy" title="partly cloudy icons">Partly cloudy icons created by Andy Horvath - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/cloud" title="cloud icons">Cloud icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/rainy" title="rainy icons">Rainy icons created by Konkapp - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/snowy" title="snowy icons">Snowy icons created by Superarticons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/freezing-rain" title="freezing rain icons">Freezing rain icons created by Icon home - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ice" title="ice icons">Ice icons created by Freepik - Flaticon</a>
*/


/* Stuff to add placeholders to all of the cards and such */
const BLANK = "--";

export function addPlaceholders() {
    addPlaceholdersToToday();
    addPlaceholdersToForecast();
}

//Helper for document.querySelector
function get(query) {
    return document.querySelector(query);
}

export function displayWeatherData(data) {
    addWeatherDataToToday(data);
    addWeatherDataToForecast(data);
}

function getTodayObject() {
    return {
        location: get("#forecast-location"), 
        high: get("#today-high"),
        low: get("#today-low"),
        precipitation: get("#today-precipitation")
    }
}

function addPlaceholdersToToday() {
    let today = getTodayObject();

    today.location.innerText = BLANK;
    today.high.innerText = BLANK;
    today.low.innerText = BLANK;
    today.precipitation.innerText = BLANK;
}

function addPlaceholdersToForecast() {
/* IMPORTANT
let day = format(parseISO(data.days[i].datetime), "EEE"); //Mon, Tue, Wed, ...*/
    let forecastCards = document.querySelectorAll(".forecast__card");
    let dayNumber = 0; //0 being today in this case

    let todayDate = new Date();

    for (let i = 0; i < forecastCards.length; i++) {
        let card = forecastCards[i];

        let dayOfWeek = card.querySelector(".day-of-week");
        let high = card.querySelector(".high");
        let low = card.querySelector(".low");
        let rainChance = card.querySelector(".rain-chance");

        let dayOfWeekDate = addDays(todayDate, dayNumber);
        dayNumber += 1;

        dayOfWeek.innerText = format(dayOfWeekDate, "EEE") + " - " + format(dayOfWeekDate, "do");
        high.innerText = BLANK;
        low.innerText = BLANK;
        rainChance.innerText = BLANK;
    }
}

function addWeatherDataToToday(data) {
    let today = getTodayObject(); 

    today.location.innerText = data.location;
    today.high.innerText = data.forecast[0].high;
    today.low.innerText = data.forecast[0].low;

    let toCapital = data.forecast[0].precipitationType;


    today.precipitation.innerText = toCapital.charAt(0).toUpperCase() + toCapital.slice(1);
}

function addWeatherDataToForecast(data) {
    let forecastCards = document.querySelectorAll(".forecast__card");
    let dayNumber = 0; //0 being today in this case

    let todayDate = new Date();

    for (let i = 0; i < forecastCards.length; i++) {
        let dayData = data.forecast[i];
        let card = forecastCards[i];

        let icon = card.querySelector(".precipitation-type-icon").firstElementChild;
        let high = card.querySelector(".high");
        let low = card.querySelector(".low");
        let rainChance = card.querySelector(".rain-chance");

        icon.src = getWeatherIcon(dayData.precipitationType, dayData.cloudCover); 
        high.innerText = dayData.high + "\u00B0F";
        low.innerText = dayData.low + "\u00B0F";
        rainChance.innerText = dayData.precipitationChance + "%";
    }
}

function getWeatherIcon(precipitationType, cloudCover) {
    if(precipitationType === "clear") {
        return getCloudCoverIcon(cloudCover); 
    } else {
        switch(precipitationType) {
            case "rain":
                return weatherIcons.rain;
            case "snow":
                return weatherIcons.snow;
            case "freezing rain":
                return weatherIcons.freezingRain;
            case "ice": 
                return weatherIcons.ice ;
            default: 
                return "NOT FOUND"
        }
    }
}

function getCloudCoverIcon(cover) {
    if(cover < 25) {
        return weatherIcons.clear;
    } else if (cover > 25 && cover < 75) {
        return weatherIcons.partlyCloudy
    } else if (cover > 75) {
        return weatherIcons.cloudy;
    }
}