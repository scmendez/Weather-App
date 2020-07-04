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
  console.log(response.data);
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#current-date").innerHTML = currentDate(
    response.data.dt * 1000
  );
  document.querySelector("#temp-element").innerHTML = Math.round(
    response.data.main.temp
  );
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

//submit and search button functions
function searchCity(city) {
  let apiKey = "2f036bba5972d2593243a4f078d73ef2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateLocationAndConditions);
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
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

//event listeners
let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", submittedCity);

let searchCityButton = document.querySelector("#search-city-button");
searchCityButton.addEventListener("click", submittedCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
