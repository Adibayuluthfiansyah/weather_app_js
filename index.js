const apiKey = "e88d6d052dcf9b75ae7718cc862d8e3b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  console.log(data);

  document.getElementById("location").innerHTML = data.name;
  document.getElementById("temperature").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.getElementById("pressure").innerHTML = data.main.pressure + "hPa";
  document.getElementById("humidity").innerHTML = data.main.humidity + "%";
  document.getElementById("feelsLike").innerHTML =
    Math.round(data.main.feels_like) + "°C";
}

searchBtn.addEventListener("click", () => {
  checkWeather(cityInput.value);
});
