//WEEK 5

let now = new Date();

function formatDate(Date) {
  let days = [
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let CurrentDayOfTheWeek = days[now.getDay()];

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

  let currentMonth = months[now.getMonth()];

  let currentDay = now.getDate();

  let currentYear = now.getFullYear();

  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentDate = document.querySelector("#today-date");
  currentDate.innerHTML = `${CurrentDayOfTheWeek}, ${currentMonth} ${currentDay} ${currentYear} - ${currentHours}h${currentMinutes}`;

  return formatDate;
}
console.log(formatDate(now));

//Forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`; //serve para transformar em coluna

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                  <div class="days-of-the-week">
                    <h4>
                      ${forecastDay.dt}
                      </h4>
                      <img
                        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                        alt=""
                        width="42"
                       />
                    <div class="forecast-temperatures">
                      <span class="forecast-temperature-max"> 
                      ${forecastDay.temp.max}° 
                      </span>
                      <span class="forecast-temperature-min">${forecastDay.temp.min}°
                      </span>
                    </div>
                  </div>
                </div>
              
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//Search Engine

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input").value;

  let h1 = document.querySelector("#city");
  if (searchInput) {
    h1.innerHTML = `${searchInput}`;
  } else {
    h1.innerHTML = null;
    alert("Something is wrong, please type a city");
  }
  citySearchData(searchInput);
}
function citySearchData(city) {
  let apiKey = "8d356fc67ebb88e8c4c99fed9f89094c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showCityWeatherData);
}

function getForecastCoords(coordinates) {
  console.log(coordinates);
  let apiKey = "8d356fc67ebb88e8c4c99fed9f89094c";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function showCityWeatherData(response) {
  let temperatureValue = Math.round(response.data.main.temp);
  let humidityValue = Math.round(response.data.main.humidity);
  let descriptionText = response.data.weather[0].description;
  let windValue = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp; //storage the value

  let temperature = document.querySelector("#actual-temperature");
  let humidity = document.querySelector("#actual-humidity");
  let wind = document.querySelector("#actual-wind");
  let description = document.querySelector("#actual-description");
  let iconElement = document.querySelector("#icon");
  let h1 = document.querySelector("#city");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  h1.innerHTML = response.data.name;
  temperature.innerHTML = `${temperatureValue}ºC`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  wind.innerHTML = `Wind: ${windValue} m/s`;
  description.innerHTML = `Description:${descriptionText}`;

  console.log(response.data);

  getForecastCoords(response.data.coord);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Current Location Button
function showLocation(event) {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "8d356fc67ebb88e8c4c99fed9f89094c";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    axios.get(url).then(showCurrentLocationWeatherData);
  }
  function showCurrentLocationWeatherData(response) {
    let temperatureValue = Math.round(response.data.main.temp);
    let humidityValue = Math.round(response.data.main.humidity);
    let descriptionText = response.data.weather[0].description;
    let windValue = Math.round(response.data.wind.speed);
    let locationName = response.data.name;

    let temperature = document.querySelector("#actual-temperature");
    let humidity = document.querySelector("#actual-humidity");
    let wind = document.querySelector("#actual-wind");
    let description = document.querySelector("#actual-description");
    let iconElement = document.querySelector("#icon");
    let h1 = document.querySelector("#city");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    h1.innerHTML = response.data.name;

    h1.innerHTML = `${locationName}`;
    temperature.innerHTML = `${temperatureValue}ºC`;
    humidity.innerHTML = `humidity: ${humidityValue}%`;
    wind.innerHTML = `wind: ${windValue} m/s`;
    description.innerHTML = `Description: ${descriptionText}`;

    let searchInput = document.querySelector("#search-text-input").value;
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
let form2 = document.querySelector("#current-location-button");
form.addEventListener("click", showLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let toFahrenheit = document.querySelector("#actual-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  toFahrenheit.innerHTML = `${Math.round(fahrenheitTemperature)}ºF`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let toCelsius = document.querySelector("#actual-temperature");
  toCelsius.innerHTML = `${Math.round(celsiusTemperature)}ºC`;
}

celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
