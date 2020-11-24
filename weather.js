//openweather information..
const fetch  = require('node-fetch');
require('dotenv').config()
async function getForecast(city){
    const openWeatherKey = process.env.APIKEY;
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const urlToFetch = `${weatherUrl}?q=${city}&appid=${openWeatherKey}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const tempToC = jsonResponse.main.temp - 273.15;
            const theWeather = convertWeather(jsonResponse.weather[0].main);
            const output = `Here's a quick weather report for you.\r\Right now in the city of ${jsonResponse.name} ${theWeather} The average temperature is ${tempToC.toFixed(1)}°C and the average wind speed is ${jsonResponse.wind.speed} mph.`;
            return output;
        } else {
            return "Error!";
        }
    } catch (error) {
        console.log(error);
    }

}

function convertWeather(weather){
    weather = weather.toLowerCase();
    switch(weather){
        case "thunderstorm":
            return "there's a thunderstorm!";
            break;
        case "drizzle":
            return "it's drizzling.";
            break;
        case "rain":
            return "it's raining.";
            break;
        case "snow":
            return "it's snowing!";
            break;
        case "mist":
            return "it's misty.";
            break;
        case "smoke":
            return "it's smoky.";
            break;
        case "haze":
            return "it's hazy.";
            break;
        case "dust":
            return "it's dusty.";
            break;
        case "fog":
            return "it's foggy.";
            break;
        case "ash":
            return "it's ashy.";
            break;
        case "squall":
            return "there's strong, sharp gusts of wind (squalls).";
            break;
        case "tornado":
            return "there's a tornado!";
            break;
        case "clear":
            return "the sky is clear.";
            break;
        case "clouds":
            return "it's cloudy.";
            break;
    }
}

exports.getForecast = getForecast;