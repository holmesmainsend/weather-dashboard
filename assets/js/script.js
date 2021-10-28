// DOM
var input = document.querySelector(".input");
var form = document.querySelector(".form");

// Functions
function getWeather(event) {
    event.preventDefault();
    var cityName = input.value.trim();

  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=6aef7b488f7359fa679b7e37de1e29a9";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
    response.json().then(function (data) {
      var getLat = data[0].lat;
      var getLon = data[0].lon;
      var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat + "&lon=" + getLon + "&appid=6aef7b488f7359fa679b7e37de1e29a9";
      fetch(apiUrl).then(function (response2) {
        if (response2.ok) {
        response2.json().then(function (weatherData) {
          console.log(weatherData);
          input.value = "";
        });
        };
      });
    });
    } else {alert("City name not recognized; please try again")}
  });
}

// Event Listener
form.addEventListener("submit", getWeather);
