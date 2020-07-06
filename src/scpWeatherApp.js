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

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  return `${day}, ${month} ${date}, ${year} <br /> ${hour}:${min}`;
}

function sunriseTime(timestamp) {
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

function sunsetTime(timestamp) {
  let sunsetTime = new Date(timestamp);
  let hour = sunsetTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = sunsetTime.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}

//main function updating everything
function updateLocationAndConditions(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#current-date").innerHTML = currentDate(
    response.data.dt * 1000
  );
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temp-element").innerHTML = Math.round(
    response.data.main.temp
  );
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
  document.querySelector("#sunrise-info").innerHTML = sunriseTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset-info").innerHTML = sunsetTime(
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
  console.log(response);

  let forecast = null;
  document.querySelector("#weather-forecast").innerHTML = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.daily[index];
    document.querySelector("#weather-forecast").innerHTML += `
  <div class="col day-one">
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
}

//submit and search button functions
function searchCity(city) {
  let apiKey = "2f036bba5972d2593243a4f078d73ef2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateLocationAndConditions);
  //add update forecast function
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
  let updatedFahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temp-element").innerHTML = Math.round(
    updatedFahrenheitTemp
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function updateToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp-element").innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;

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
