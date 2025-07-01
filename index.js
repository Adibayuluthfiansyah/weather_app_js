const apiKey = "e88d6d052dcf9b75ae7718cc862d8e3b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}` + "&lang=id");
  let data = await response.json();

  console.log(data);
  console.log(data.weather[0]);

  document.getElementById("location").innerHTML = data.name;
  document.getElementById("temperature").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.getElementById("pressure").innerHTML = data.main.pressure + "hPa";
  document.getElementById("humidity").innerHTML = data.main.humidity + "%";
  document.getElementById("feelsLike").innerHTML =
    Math.round(data.main.feels_like) + "°C";
  document.getElementById("description").innerHTML =
    data.weather[0].description;

  const weatherImg = document.getElementById("weatherImg");
  const imgSrc = getWeatherImg(data.weather[0].main);
  weatherImg.src = imgSrc;
  weatherImg.alt = data.weather[0].description;

  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  this.document.getElementById("date").textContent = now.toLocaleDateString(
    "id-ID",
    options
  );
}

searchBtn.addEventListener("click", () => {
  checkWeather(cityInput.value);
});

function getWeatherImg(weatherMain) {
  const imgMap = {
    Clear: "./images/clear.png",
    Clouds: "./images/clouds.png",
    Rain: "./images/rain.png",
    Drizzle: "./images/drizzle.png",
    Snow: "./images/snow.png",
    Mist: "./images/mist.png",
    Smoke: "./images/mist.png",
    Haze: "./images/mist.png",
    Dust: "./images/mist.png",
    Fog: "./images/mist.png",
    Sand: "./images/mist.png",
    Ash: "./images/mist.png",
    Squall: "./images/wind.png",
    Tornado: "./images/wind.png",
    Thunderstorm: "./images/rain.png",
  };
  return imgMap[weatherMain] || "./images/clear.png";
}

window.addEventListener("load", function () {
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  this.document.getElementById("date").textContent = now.toLocaleDateString(
    "id-ID",
    options
  );
});
