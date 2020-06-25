//Current date and time
let now = new Date();
let currentDate = document.querySelector("#current-date");

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
currentDate.innerHTML = `${day}, ${month} ${date}, ${year} <br /> ${hour}:${min}`;

//Display city and city's current temp in C after submitting
function showCelTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-element");
  tempElement.innerHTML = `${temp}`;
}

function callTemp() {
  let apiKey = "2f036bba5972d2593243a4f078d73ef2";
  let searchCityInput = document.querySelector("#search-city-input");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCelTemp);
}

function updateCity(event) {
  event.preventDefault();

  let searchCityInput = document.querySelector("#search-city-input");
  let h1City = document.querySelector("#searched-city");
  if (searchCityInput.value) {
    h1City.innerHTML = `${searchCityInput.value}`;
  } else {
    h1City.innerHTML = null;
  }

  callTemp();
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", updateCity);
