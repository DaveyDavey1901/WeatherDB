var citySrchInput = document.querySelector("#city-srch-input");
var citySrchBtn = document.querySelector("#city-srch-btn");
var cityEl = document.querySelector("#city-placeholder");
var citiesArray = [];
var citiesArchive = [];
var apiKey = "aded95d03c66a91f2fd2f8899e03ddf9";

var getCityData = function () {
  citySrchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    var city = citySrchInput.value;

    var currentForcastApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(currentForcastApi)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert (Error("Please enter a city name."));
        }
      })
      .then(function (data) {
        var lon = data.coord["lon"];
        var lat = data.coord["lat"];
        var cTemp = data.main["temp"];
        var cHigh = data.main["temp_max"];
        var cLow = data.main["temp_min"];
        var cHum = data.main["humidity"];
        var cWindSpd = data.wind["speed"];
        var cIcon = data.weather[0].icon;

        oneCallForcast(city, lon, lat);

        var cTempEl = document.querySelector("#current-temp");
        cTempEl.textContent = cTemp;

        var cHighEl = document.querySelector("#current-high");
        cHighEl.textContent = cHigh;

        var cLowEl = document.querySelector("#current-low");
        cLowEl.textContent = cLow;

        var cHumidityEl = document.querySelector("#current-humidity");
        cHumidityEl.textContent = cHum;

        var cWindEl = document.querySelector("#current-wind-speed");
        cWindEl.textContent = cWindSpd;

        var cIconEl = document.querySelector("#today-icon");
        cIconEl.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${cIcon}.png`
        );

        if (document.querySelector(".list-cities")) {
          document.querySelector(".list-cities").remove();
        }

        setCity(city);
        getCities();
      });
  });
  
};
getCityData();

// uses onecall to retrieve all the data available and then use the lat
//on and long in getCityData to find the right location.
var oneCallForcast = function (city, lon, lat) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  fetch(oneCall).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        cityEl.textContent = `${city} (${moment().format("DD/MM/YYYY")})`;
        //current forcast variables could not find this value in the city call to the API.
        var cUvi = data.current["uvi"];

        var cUviIndex = document.querySelector("#current-uvi");

        cUviIndex.textContent = cUvi;

        // styles UV index bootstrap bades and colors
        switch (true) {
          case cUvi <= 2:
            cUviIndex.className = "badge badge-success";
            break;
          case cUvi <= 5:
            cUviIndex.className = "badge badge-warning";
            break;
          case cUvi <= 7:
            cUviIndex.className = "badge badge-danger";
            break;
          default:
            cUviIndex.className = "badge text-light";
            cUviIndex.setAttribute("style", "background-color: #f2d6fa");
        }
        for (var i = 1; i < 6; i++) {
          var datePresent = document.querySelector("#date-" + i);
          datePresent.textContent = moment()
            .add(i, "days")
            .format("DD/MM/YYYY");

          var dailyTemp = data.daily[i].temp.day;
          var dailyHigh = data.daily[i].temp.max;
          var dailyLow = data.daily[i].temp.min;
          var dailyHum = data.daily[i].humidity;
          var iconCode = data.daily[i].weather[0].icon;

          var dTempEl = document.querySelector("#temp-" + i);
          dTempEl.textContent = dailyTemp;

          var dHighEl = document.querySelector("#high-" + i);
          dHighEl.textContent = dailyHigh;

          var dLowEl = document.querySelector("#low-" + i);
          dLowEl.textContent = dailyLow;

          var dHumEl = document.querySelector("#humidity-" + i);
          dHumEl.textContent = dailyHum;

          var iconImg = document.querySelector("#icon-" + i);
          iconImg.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${iconCode}.png`
          );
        }
      });
    }
  });
};

// this function is responsible for setting the inputed city to the local storage
//and removing any doubles... part of this function was found on stack overflow.
var setCity = function (city) {
  for (var i = 0; i < citiesArray.length; i++) {
    if (city === citiesArray[i]) {
      citiesArray.splice(i, 1);
    }
  }

  citiesArray.push(city);
  localStorage.setItem("cities", JSON.stringify(citiesArray));
};

// This function retreaves the city list from local storage and creates a list of buttons.
// How to create a list of buttons i found on stack overflow.
var getCities = function () {
  citiesArray = JSON.parse(localStorage.getItem("cities"));

  var recentCities = document.querySelector("#recent-cities");
  var cityUl = document.createElement("ul");
  cityUl.className = "list-group list-group-item-info list-cities";
  recentCities.appendChild(cityUl);

  for (var i = 0; i < citiesArray.length; i++) {
    var cListItem = document.createElement("button");
    cListItem.setAttribute("type", "button");
    cListItem.className = "list-group-item list-group-item-info";
    cListItem.setAttribute("value", citiesArray[i]);
    cListItem.textContent = citiesArray[i];
    cityUl.prepend(cListItem);
  }
};
