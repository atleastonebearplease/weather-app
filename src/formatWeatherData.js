import { format, formatDistance, formatRelative, addDays, DateArg, parseISO } from "date-fns";

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
        let icon = card.querySelector(".precipiation-type-icon");
        let high = card.querySelector(".high");
        let low = card.querySelector(".low");
        let rainChance = card.querySelector(".rain-chance");

        let dayOfWeekDate = addDays(todayDate, dayNumber);
        dayNumber += 1;

        dayOfWeek.innerText = format(dayOfWeekDate, "EEE") + " - " + format(dayOfWeekDate, "i") + "/" + format(dayOfWeekDate, "yy");
        high.innerText = BLANK;
        low.innerText = BLANK;
        rainChance.innerText = BLANK;
    }
}

function addWeatherDataToToday(data) {

}

function addWeatherDataToForecast(data) {
    
}