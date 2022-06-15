const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const locationBtn = document.querySelector("#location-btn");
const currentRegionName = document.querySelector("header h3");
const currentDayDate = document.querySelector("#currentDayDate");
const daysNames = document.querySelectorAll(".day-name");
const conds = document.querySelectorAll(".cond");
const temps = document.querySelectorAll(".temp");
const minTemps = document.querySelectorAll(".minTemp");
const imgs = document.querySelectorAll("header img");

getWeather("auto:ip");

locationBtn.addEventListener("input", function(){
    let weather = getWeather(this.value);
})

function setValues(json){
    
    let currentDate = new Date(json.location.localtime);
    let month = currentDate.toLocaleString('default', { month: 'long' });
    currentRegionName.innerHTML = json.location.name;
    currentDayDate.innerHTML = `${currentDate.getDate()}${month}`;
    
    daysNames[0].innerHTML = weekday[currentDate.getDay()];
    temps[0].innerHTML = json.current.temp_c;
    conds[0].innerHTML = json.current.condition.text;
    imgs[0].setAttribute("src", json.current.condition.icon);

    currentDate = new Date(json.forecast.forecastday[1].date);
    month = currentDate.toLocaleString('default', { month: 'long' });
    daysNames[1].innerHTML = weekday[currentDate.getDay()];
    temps[1].innerHTML = json.forecast.forecastday[1].day.maxtemp_c;
    conds[1].innerHTML = json.forecast.forecastday[1].day.condition.text;
    imgs[1].setAttribute("src", json.forecast.forecastday[1].day.condition.icon);
    minTemps[0].innerHTML = json.forecast.forecastday[1].day.mintemp_c;
    
    currentDate = new Date(json.forecast.forecastday[2].date);
    month = currentDate.toLocaleString('default', { month: 'long' });
    daysNames[2].innerHTML = weekday[currentDate.getDay()];
    temps[2].innerHTML = json.forecast.forecastday[2].day.maxtemp_c;
    conds[2].innerHTML = json.forecast.forecastday[2].day.condition.text;
    imgs[2].setAttribute("src", json.forecast.forecastday[2].day.condition.icon);
    minTemps[1].innerHTML = json.forecast.forecastday[2].day.mintemp_c;

    
}

async function getWeather(country){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8bdf4853f7ac4458b96175342221506&q=${country}&days=3`);
    let responseJson = await response.json();

    console.log(responseJson);

    if (response.ok){
        setValues(responseJson);
    }
}