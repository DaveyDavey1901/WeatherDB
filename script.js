var citySrchInput = document.querySelector("#city-srch-input");
var citySrchBtn = document.querySelector("#city-srch-btn");
var cityEl = document.querySelector("#city-placeholder");
var citiesArray = [];
var apiKey = "aded95d03c66a91f2fd2f8899e03ddf9";

var getCityData = function (city) {
  citySrchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    var city = citySrchInput.value;

    var currentForcastApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(currentForcastApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var city = data.name;
        var lon = data.coord["lon"];
        var lat = data.coord["lat"];
        var currentTemp = data.main["temp"];
        var currentHigh = data.main["temp_max"];
        var currentLow = data.main["temp_min"];
        var currentHum = data.main["humidity"];
        var currentWindSpd = data.wind["speed"];

        oneCallForcast(city, lon, lat);
        var cTempEl = document.querySelector("#current-temp");
        cTempEl.textContent = currentTemp;

        var cHighEl = document.querySelector("#current-high");
        cHighEl.textContent = currentHigh;

        var cLowEl = document.querySelector("#current-low");
        cLowEl.textContent = currentLow;

        var cHumidityEl = document.querySelector("#current-humidity");
        cHumidityEl.textContent = currentHum;

        var cWindEl = document.querySelector("#current-wind-speed");
        cWindEl.textContent = currentWindSpd;

        storeCity(city)
        console.log(data);
      });
  });
};

getCityData();

// uses onecall to retrieve all the data available
var oneCallForcast = function (city, lon, lat) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  fetch(oneCall).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        cityEl.textContent = `${city} (${moment().format("DD/MM/YYYY")})`;
        //current forcast variables
        var cUvi = data.current["uvi"];

        var cUviIndex = document.querySelector("#current-uvi");

        cUviIndex.textContent = cUvi;

        // styles UV index
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
        
        

        console.log(data);
      });
    }
  });
};

var storeCity = function (city) {
  // prevents duplicate city from being saved and moves it to end of array
  for (var i = 0; i < citiesArray.length; i++) {
    if (city === citiesArray[i]) {
      citiesArray.splice(i, 1);
    }
  }

  citiesArray.push(city);
  localStorage.setItem("cities", JSON.stringify(citiesArray));
};