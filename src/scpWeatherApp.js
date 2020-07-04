//Axios
src = "https://unpkg.com/axios/dist/axios.min.js";

//to update date and time, currently set to default (running on refresh)
let now = new Date();

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

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year} <br /> ${hour}:${min}`;

//trying time code

function getSunrise(response) {
  let sunriseTime = new Date(response * 1000);
  let hour = sunriseTime.getHours();
  let min = sunriseTime.getMinutes();
  let time = `${hour}:${min}`;
  document.querySelector("#sunrise-info").innerHTML = time;
}

//main function updating everything
function updateLocationAndConditions(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#temp-element").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-info").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity-info").innerHTML =
    response.data.main.humidity;
  getSunrise(response);
  document.querySelector("#sunset-info").innerHTML = moment(
    response.data.sys.sunset
  ).format("HH:mm:ss");
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
