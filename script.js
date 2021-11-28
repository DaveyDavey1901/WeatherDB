var citySrchInput = document.querySelector("#city-srch-input");
var citySrchBtn = document.querySelector("#city-srch-btn");
var cityNameEl = document.querySelector("#city-name");
var cityArr = [];
var apiKey = "aded95d03c66a91f2fd2f8899e03ddf9";



citySrchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  var city = citySrchInput.value;
  var currentForcastApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(currentForcastApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});
