//Axios
src = "https://unpkg.com/axios/dist/axios.min.js";

//sunrise, sunset, and current time functions
function currentDate(timestamp) {
  let now = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();

  //let hour = now.getHours();
  //if (hour < 10) {
  //hour = `0${hour}`;
  //}
  //let min = now.getMinutes();
  //if (min < 10) {
  //min = `0${min}`;
  //}

  return `${day}, ${month} ${date}, ${year}`;
  // ${hour}:${min}
}

function sunTime(timestamp) {
  let sunriseTime = new Date(timestamp);
  let hour = sunriseTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = sunriseTime.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}

//main function updating everything
function updateLocationAndConditions(response) {
  console.log(response);
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#current-date").innerHTML = currentDate(
    response.data.dt * 1000
  );
  document.querySelector("#current-day-high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  currentHighCelsiusTemp = response.data.main.temp_max;
  document.querySelector("#current-day-low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  currentLowCelsiusTemp = response.data.main.temp_min;
  document.querySelector("#temp-element").innerHTML = Math.round(
    response.data.main.temp
  );
  currentCelsiusTemp = response.data.main.temp;
  document
    .querySelector("#current-day-weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-day-weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#current-day-weather-word").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-info").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity-info").innerHTML =
    response.data.main.humidity;
  document.querySelector("#sunrise-info").innerHTML = sunTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset-info").innerHTML = sunTime(
    response.data.sys.sunset * 1000
  );
}

//forecast functions
function forecastDay(timestamp) {
  let forecastDays = new Date(timestamp);
  let dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastDay = dayOptions[forecastDays.getDay()];
  return `${forecastDay}`;
}

function forecastDate(timestamp) {
  let forecastDates = new Date(timestamp);
  let dateOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  let forecastDateDay = dateOptions[forecastDates.getDate()];
  let monthOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  let forecastDateMonth = monthOptions[forecastDates.getMonth()];
  return `${forecastDateDay}/${forecastDateMonth}`;
}

function updateForecast(response) {
  document.querySelector("#weather-forecast").innerHTML = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.daily[index];
    document.querySelector("#weather-forecast").innerHTML += `
  <div class="col">
      <div class="row day-name">${forecastDay(forecast.dt * 1000)}</div>
      <div class="row day-date">${forecastDate(forecast.dt * 1000)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" class="weather-icons">
      </div>
      <div class="row day-high">${Math.round(forecast.temp.max)}°</div>
      <div class="row day-low">${Math.round(forecast.temp.min)}°</div>
  </div>
  `;
  }

  dayOneDayDate = response.data.daily[0].dt * 1000;
  dayOneIcon = response.data.daily[0].weather[0].icon;
  dayOneHighCelsiusTemp = response.data.daily[0].temp.max;
  dayOneLowCelsiusTemp = response.data.daily[0].temp.min;

  dayTwoDayDate = response.data.daily[1].dt * 1000;
  dayTwoIcon = response.data.daily[1].weather[0].icon;
  dayTwoHighCelsiusTemp = response.data.daily[1].temp.max;
  dayTwoLowCelsiusTemp = response.data.daily[1].temp.min;

  dayThreeDayDate = response.data.daily[2].dt * 1000;
  dayThreeIcon = response.data.daily[2].weather[0].icon;
  dayThreeHighCelsiusTemp = response.data.daily[2].temp.max;
  dayThreeLowCelsiusTemp = response.data.daily[2].temp.min;

  dayFourDayDate = response.data.daily[3].dt * 1000;
  dayFourIcon = response.data.daily[3].weather[0].icon;
  dayFourHighCelsiusTemp = response.data.daily[3].temp.max;
  dayFourLowCelsiusTemp = response.data.daily[3].temp.min;

  dayFiveDayDate = response.data.daily[4].dt * 1000;
  dayFiveIcon = response.data.daily[4].weather[0].icon;
  dayFiveHighCelsiusTemp = response.data.daily[4].temp.max;
  dayFiveLowCelsiusTemp = response.data.daily[4].temp.min;
}

//submit and search button functions
function cityLongitudeLatitude(response) {
  let apiKey = "2f036bba5972d2593243a4f078d73ef2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=currently,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateForecast);
}

function searchCityForecastAndConditionsCall(response) {
  cityLongitudeLatitude(response);
  updateLocationAndConditions(response);
}

function searchCity(city) {
  let apiKey = "2f036bba5972d2593243a4f078d73ef2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchCityForecastAndConditionsCall);
}

function submittedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

//current location functions
function searchCurrentLocation(position) {
  let apiKey = "2f036bba5972d2593243a4f078d73ef2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateLocationAndConditions);
  //calling update forecast function
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&
  exclude=currently,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// temp functions
function updateToFahrenheit(event) {
  event.preventDefault();
  let updatedCurrentFahrenheitTemp = (currentCelsiusTemp * 9) / 5 + 32;
  let updatedCurrentHighFahrenheitTemp = (currentHighCelsiusTemp * 9) / 5 + 32;
  let updatedCurrentLowFahrenheitTemp = (currentLowCelsiusTemp * 9) / 5 + 32;
  document.querySelector("#temp-element").innerHTML = Math.round(
    updatedCurrentFahrenheitTemp
  );
  document.querySelector("#current-day-high").innerHTML = `${Math.round(
    updatedCurrentHighFahrenheitTemp
  )}°`;
  document.querySelector("#current-day-low").innerHTML = `${Math.round(
    updatedCurrentLowFahrenheitTemp
  )}°`;

  dayOneHighFarTemp = (dayOneHighCelsiusTemp * 9) / 5 + 32;
  dayOneLowFarTemp = (dayOneLowCelsiusTemp * 9) / 5 + 32;
  dayTwoHighFarTemp = (dayTwoHighCelsiusTemp * 9) / 5 + 32;
  dayTwoLowFarTemp = (dayTwoLowCelsiusTemp * 9) / 5 + 32;
  dayThreeHighFarTemp = (dayThreeHighCelsiusTemp * 9) / 5 + 32;
  dayThreeLowFarTemp = (dayThreeLowCelsiusTemp * 9) / 5 + 32;
  dayFourHighFarTemp = (dayFourHighCelsiusTemp * 9) / 5 + 32;
  dayFourLowFarTemp = (dayFourLowCelsiusTemp * 9) / 5 + 32;
  dayFiveHighFarTemp = (dayFiveHighCelsiusTemp * 9) / 5 + 32;
  dayFiveLowFarTemp = (dayFiveLowCelsiusTemp * 9) / 5 + 32;

  document.querySelector("#weather-forecast").innerHTML = `
  <div class="col">
      <div class="row day-name">${forecastDay(dayOneDayDate)}</div>
      <div class="row day-date">${forecastDate(dayOneDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayOneIcon}@2x.png" class="weather-icons">
      </div>
      <div class="row day-high">${Math.round(dayOneHighFarTemp)}°</div>
      <div class="row day-low">${Math.round(dayOneLowFarTemp)}°</div>
  </div>
    <div class="col">
      <div class="row day-name">${forecastDay(dayTwoDayDate)}</div>
      <div class="row day-date">${forecastDate(dayTwoDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayTwoIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayTwoHighFarTemp)}°</div>
      <div class="row day-low">${Math.round(dayTwoLowFarTemp)}°</div>
  </div>  <div class="col">
      <div class="row day-name">${forecastDay(dayThreeDayDate)}</div>
      <div class="row day-date">${forecastDate(dayThreeDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayThreeIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayThreeHighFarTemp)}°</div>
      <div class="row day-low">${Math.round(dayThreeLowFarTemp)}°</div>
  </div>  <div class="col">
      <div class="row day-name">${forecastDay(dayFourDayDate)}</div>
      <div class="row day-date">${forecastDate(dayFourDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayFourIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayFourHighFarTemp)}°</div>
      <div class="row day-low">${Math.round(dayFourLowFarTemp)}°</div>
  </div>  <div class="col">
      <div class="row day-name">${forecastDay(dayFiveDayDate)}</div>
      <div class="row day-date">${forecastDate(dayFiveDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayFiveIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayFiveHighFarTemp)}°</div>
      <div class="row day-low">${Math.round(dayFiveLowFarTemp)}°</div>
  </div>
  `;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function updateToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp-element").innerHTML = Math.round(
    currentCelsiusTemp
  );
  document.querySelector("#current-day-high").innerHTML = `${Math.round(
    currentHighCelsiusTemp
  )}°`;
  document.querySelector("#current-day-low").innerHTML = `${Math.round(
    currentLowCelsiusTemp
  )}°`;

  document.querySelector("#weather-forecast").innerHTML = `
  <div class="col">
      <div class="row day-name">${forecastDay(dayOneDayDate)}</div>
      <div class="row day-date">${forecastDate(dayOneDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayOneIcon}@2x.png" class="weather-icons">
      </div>
      <div class="row day-high">${Math.round(dayOneHighCelsiusTemp)}°</div>
      <div class="row day-low">${Math.round(dayOneLowCelsiusTemp)}°</div>
  </div>
    <div class="col">
      <div class="row day-name">${forecastDay(dayTwoDayDate)}</div>
      <div class="row day-date">${forecastDate(dayTwoDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayTwoIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayTwoHighCelsiusTemp)}°</div>
      <div class="row day-low">${Math.round(dayTwoLowCelsiusTemp)}°</div>
  </div>  <div class="col">
      <div class="row day-name">${forecastDay(dayThreeDayDate)}</div>
      <div class="row day-date">${forecastDate(dayThreeDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayThreeIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayThreeHighCelsiusTemp)}°</div>
      <div class="row day-low">${Math.round(dayThreeLowCelsiusTemp)}°</div>
  </div>  <div class="col">
      <div class="row day-name">${forecastDay(dayFourDayDate)}</div>
      <div class="row day-date">${forecastDate(dayFourDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayFourIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayFourHighCelsiusTemp)}°</div>
      <div class="row day-low">${Math.round(dayFourLowCelsiusTemp)}°</div>
  </div>  <div class="col">
      <div class="row day-name">${forecastDay(dayFiveDayDate)}</div>
      <div class="row day-date">${forecastDate(dayFiveDayDate)}</div>
      <div class="row day-icon">
        <img src="https://openweathermap.org/img/wn/${dayFiveIcon}@2x.png" class="weather-icons">
      </div>
   <div class="row day-high">${Math.round(dayFiveHighCelsiusTemp)}°</div>
      <div class="row day-low">${Math.round(dayFiveLowCelsiusTemp)}°</div>
  </div>
  `;

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

//global variables
let currentCelsiusTemp = null;
let currentHighCelsiusTemp = null;
let currentLowCelsiusTemp = null;
let forecast = null;
let dayOneDayDate = null;
let dayOneIcon = null;
let dayOneHighCelsiusTemp = null;
let dayOneLowCelsiusTemp = null;
let dayTwoDayDate = null;
let dayTwoIcon = null;
let dayTwoHighCelsiusTemp = null;
let dayTwoLowCelsiusTemp = null;
let dayThreeDayDate = null;
let dayThreeIcon = null;
let dayThreeHighCelsiusTemp = null;
let dayThreeLowCelsiusTemp = null;
let dayFourDayDate = null;
let dayFourIcon = null;
let dayFourHighCelsiusTemp = null;
let dayFourLowCelsiusTemp = null;
let dayFiveDayDate = null;
let dayFiveIcon = null;
let dayFiveHighCelsiusTemp = null;
let dayFiveLowCelsiusTemp = null;

//event listeners
let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", submittedCity);

let searchCityButton = document.querySelector("#search-city-button");
searchCityButton.addEventListener("click", submittedCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", updateToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", updateToCelsius);

//upon loading the page
searchCity("Madrid");
