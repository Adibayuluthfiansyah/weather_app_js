const apiKey = "e88d6d052dcf9b75ae7718cc862d8e3b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("errorMsg");
const weatherCard = document.getElementById("weatherCard");

function showLoading() {
  loading.style.display = "block";
  errorMsg.style.display = "none";
  weatherCard.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
}

function showError(message = "Kota tidak dapat ditemukan") {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  weatherCard.style.display = "none";
  hideLoading();
}

function showWeatherCard() {
  weatherCard.style.display = "block";
  errorMsg.style.display = "none";
  hideLoading();
}

function updateWeatherDisplay(data) {
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
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}` + "&lang=id");
  let data = await response.json();
  updateWeatherDisplay(data);
  showWeatherCard();

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

locationBtn.addEventListener("click", getCurrentLocation);

async function checkWeatherByCoords(lat, lon) {
  try {
    showLoading();
    const response = await fetch(
      `${apiUrlCoords}&lat=${lat}&lon=${lon}&appid=${apiKey}&lang=id`
    );
    if (!response.ok) {
      throw new Error("Gagal mengambil data cuaca");
    }

    let data = await response.json();
    updateWeatherDisplay(data);
    showWeatherCard();
  } catch (error) {
    console.log("Error:", error);
    showError("Gagal mengambil data cuaca untuk lokasi anda");
  }
}

function getCurrentLocation() {
  if (!navigator.geolocation) {
    showError("Pengambilan lokasi tidak didukung oleh browser anda");
    return;
  }
  showLoading();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      checkWeatherByCoords(lat, lon);
    },
    (error) => {
      let errorMessage = "Gagal mendapatkan lokasi anda";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage =
            "Izin lokasi ditolak aktifkan izin lokasi di browser anda";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Informasi tidak tersedia";
          break;
        case error.TIMEOUT:
          errorMessage = "Waktu perminttan lokasi habis";
          break;
      }
      console.log("Geolocation error:", error);
      showError(errorMessage);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    }
  );
}

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
  showWeatherCard();
});
