// DOM
var input = document.querySelector(".input");
var form = document.querySelector(".form");
var currentBox = document.querySelector(".current-box");
var cityTitle = document.querySelector(".city-title");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".uvIndex");

// Function
function getWeather(event) {
  event.preventDefault();
  var cityName = input.value.trim();

  // Error Handling
  if (cityName.length < 1) {
      alert("The text field cannot be empty.")
    }
    else {

  // API for Latitude and Longitude
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=6aef7b488f7359fa679b7e37de1e29a9";
  fetch(apiUrl).then(function (response) {
      response.json().then(function (data) {

        // Error Handling
        if (data.length === 0) {
            alert("City name not recognized; please try again.");
            input.value = "";
        }
        else {
        var getLat = data[0].lat;
        var getLon = data[0].lon;

        // API for Weather Details + Date
        var apiUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          getLat +
          "&lon=" +
          getLon +
          "&appid=6aef7b488f7359fa679b7e37de1e29a9";
        fetch(apiUrl).then(function (response2) {
          if (response2.ok) {
            response2.json().then(function (weatherData) {
              console.log(weatherData);

              // Page Text Content
              for (i = 0; i < 6; i++) {
                  if (i === 0) {
                    currentBox.classList.add("border", "border-dark");

                    // UNIX Conversion
                    var milli = weatherData.current.dt * 1000;
                    var dateObject = new Date(milli);
                    var humanDateTime = dateObject.toLocaleString("en-US", {timezone: "short"})
                    var humanDateFormat = humanDateTime.split(",")[0];
                    
                    cityTitle.textContent = cityName + " (" + humanDateFormat + ")";

                    // Temperature Conversion
                    var fahrenheit = (weatherData.current.temp - 273.15) * (9/5) + 32;
                    
                    temp.textContent = "Temp: " + fahrenheit.toFixed(2) + "°F";
                    wind.textContent = "Wind: " + weatherData.current.wind_speed.toFixed(2) + " MPH";
                    humidity.textContent = "Humidity: " + weatherData.current.humidity + "%";
                    uvIndex.textContent = "UV Index: " + weatherData.current.uvi;
                    
                  } else {
                      var card = document.querySelector(".card" + [i])
                      var cardDate = document.querySelector(".card-date" + [i]);
                      var cardTemp = document.querySelector(".card-temp" + [i]);
                      var cardWind = document.querySelector(".card-wind" + [i]);
                      var cardHumidity = document.querySelector(".card-humidity" + [i]);
                      card.classList.remove("border-0");
                      card.classList.add("cardcolor");

                        // UNIX Conversion
                        var milli = weatherData.daily[i].dt * 1000;
                        var dateObject = new Date(milli);
                        var humanDateTime = dateObject.toLocaleString("en-US", {timezone: "short"})
                        var humanDateFormat = humanDateTime.split(",")[0];

                        cardDate.textContent = humanDateFormat;

                        // Temperature Conversion
                        var fahrenheit = (weatherData.daily[i].temp.day - 273.15) * (9/5) + 32;
                    
                        cardTemp.textContent = "Temp: " + fahrenheit.toFixed(2) + "°F";
                        cardWind.textContent = "Wind: " + weatherData.daily[i].wind_speed.toFixed(2) + " MPH";
                        cardHumidity.textContent = "Humidity: " + weatherData.daily[i].humidity + "%";
                  }
              }
              input.value = "";
            });
          } 
          // Error Handling
          else {
            alert("Server connection error.");
          }
        });
    }
      });
  });
};
}

// Event Listener
form.addEventListener("submit", getWeather);