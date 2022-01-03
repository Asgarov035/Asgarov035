let search = document.querySelector(".search");
let info = document.querySelector(".info");
let change = document.querySelector(".change");
let searchBtn = document.querySelector("#search-btn");
let searchIn = document.querySelector("#search-in");
let conditionImg = document.querySelector("#weather-info .condition-img");
let conditionText = document.querySelector("#weather-info .condition-text");
let tempSpan = document.querySelector("#weather-info .temp span");
let cityText = document.querySelector("#weather-info .city");
let humidityText = document.querySelector("#weather-info .humidity");
let feelsText = document.querySelector("#weather-info .feels");

searchBtn.addEventListener("click", function () {
  getWeatherInfo(searchIn.value);
  searchIn.value = "";
});

change.addEventListener("click", function () {
  info.classList.add("d-none");
  search.classList.remove("d-none");
});

function getWeatherInfo(city) {
  let currentWeatherReq = new XMLHttpRequest();
  currentWeatherReq.onload = function () {
    if (currentWeatherReq.status == 404) {
      alert("City not found!");
      return;
    }
    let weatherInfo = JSON.parse(currentWeatherReq.responseText);
    conditionImg.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        weatherInfo.weather[0].icon +
        "@2x.png"
    );
    conditionText.innerText = weatherInfo.weather[0].description;
    tempSpan.innerText = weatherInfo.main.temp;
    cityText.innerText = weatherInfo.name;
    humidityText.innerText = weatherInfo.main.humidity;
    feelsText.innerText = weatherInfo.main.feels_like;
    search.classList.add("d-none");
    info.classList.remove("d-none");
  };
  currentWeatherReq.open(
    "get",
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=6d5e5b1a579c42c344ac43982aca5649&units=metric"
  );
  currentWeatherReq.send();

  forecastReq = new XMLHttpRequest();
  forecastReq.onload = function () {
    let forecastData = JSON.parse(forecastReq.responseText).list.slice(0, 8);
    document.querySelector(".forecast-wrapper").innerHTML = "";
    for (const fr of forecastData) {
      let div = document.createElement("div");
      div.classList.add("forecast-item","mx-2");

      let img = document.createElement("img");
      img.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + fr.weather[0].icon + ".png"
      );

      let p1 = document.createElement("p");
      p1.innerText = fr.main.temp+" °C";

      let p2 = document.createElement("p");
      let date = new Date(fr.dt * 1000);
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

      p2.innerText = hours + " : 00";

      div.append(img);
      div.append(p1);
      div.append(p2);
      document.querySelector(".forecast-wrapper").append(div);
    }
  };
  forecastReq.open(
    "get",
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=6d5e5b1a579c42c344ac43982aca5649&units=metric"
  );
  forecastReq.send();
}