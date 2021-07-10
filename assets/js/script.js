let cityInput = document.querySelector('#city-input');
let searchBtn = document.querySelector('#search-btn');
let cityNameDisplay = document.querySelector('#city-name');
let currentDateDisplay = document.querySelector('#current-date');
let recentCities = document.querySelector('#recent-cities');
let cityArr = [];
let formattedCityInput;
var currentDate = moment().format("dddd, MMMM Do");
const apiKey = '5569f0d8093687922f5c0ba190e02e6c'; // do not forget remove it before push

function displayDates() {
    // display current date
    currentDateDisplay.textContent = currentDate
    // display future forecast dates
    for (let i = 0; i < 5; i++) {
        let forecastDate = $(".date")
        forecastDate[i].textContent = moment().add(i, "d").format("dddd, MMM Do");
    }
}
//function to fromat city Input and add alert if input is empty
let inputHandeler = function(event){
    event.preventDefault();
    console.log("test"); // needs to be deleted
    formattedCityInput = cityInput
    .value
    .trim()
    .toLowerCase()
    .split(' ')
    .map((l) => l.charAt(0).toUpperCase() + l.substring(1))
    .join(' ');

    if (formattedCityInput === ""){
        alert("Please, enter city name!")
    }else{
        saveCity(formattedCityInput);
        getCityForecast5days(formattedCityInput);
        getCityForecastGetCurrent(formattedCityInput);
    }

    console.log(formattedCityInput); // needs to be deleted
};

let getCityForecast5days = function(cityName){
   let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
   fetch(URL).then(function(response){
       if (response.ok){
        response.json().then(function(data){

            console.log(data);

        } 
      )}
   }) 
   displayDates();

};

let getCityForecastGetCurrent = function(cityName){
    cityNameDisplay.textContent = cityName;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetch(URL).then(function(response){
        if (response.ok){
         response.json().then(function(data){
             console.log(data);
             
             let currentTempDisplay = document.querySelector("#current-temp");
             currentTempDisplay.textContent = Math.round(data.main.temp);

             let currentWindDisplay = document.querySelector("#current-wind");
             currentWindDisplay.textContent = Math.round(data.wind.speed);

             let currentHumidityDisplay = document.querySelector("#current-humidity");
             currentHumidityDisplay.textContent = Math.round(data.main.humidity);

             var cityLat = data.coord.lat
             var cityLon = data.coord.lon
             var uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${apiKey}`
            fetch(uvApi)
            .then(response => response.json())
            .then(data => {
                var currentUvi = Math.round(data.current.uvi)
                var currentUviDisplay = document.querySelectorAll("#current-uvi")
                currentUviDisplay.forEach(node =>{
                    node.textContent = currentUvi;
                })
            })
  console.log(data)
         } 
       )}
    }) 

    


    displayDates();
 };


let saveCity = function(city){
    //check for duplicates and push in the end of array
    var count = 0;
    for (var i = 0; i < cityArr.length; i++) {
        if (city === cityArr[i]) {
            count++;
        }
    }
    if (count===0){
        cityArr.push(city);
        let buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "recentCity");
        buttonEl.innerHTML = city;
        recentCities.appendChild(buttonEl);
    }
   
    localStorage.setItem('cities', JSON.stringify(cityArr)); 
}

let keepCities = function(){
    cityArr = JSON.parse(localStorage.getItem('cities'));
    
    if (!cityArr) {
        cityArr = [];
        return false;
    } else if (cityArr.length > 10) {
        cityArr.shift();
    }

    for (let i = 0; i<cityArr.length; i++){
        let buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "recentCity");
        buttonEl.innerHTML = cityArr[i];
        recentCities.appendChild(buttonEl);
    }  
 };

keepCities();



//eventListener
searchBtn.addEventListener('click', inputHandeler)