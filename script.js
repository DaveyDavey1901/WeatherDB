var citySrchInput = document.querySelector("#city-srch-input");
var citySrchBtn = document.querySelector("#city-srch-btn");
var cityNameEl = document.querySelector("#city-name");
var cityArr = [];
var apiKey = "1d8cf787e2c996be6b44d48d9aaf4a93";


var getLocation = function (city) {
  var currentForcastApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  
  fetch(currentForcastApi);
}