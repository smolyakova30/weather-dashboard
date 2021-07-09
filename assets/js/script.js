let cityInput = document.querySelector('#city-input');
let searchBtn = document.querySelector('#search-btn');
let cityName = document.querySelector('#city-name');
let currentDate = document.querySelector('#current-date');
let recentCities = document.querySelector('#recent-cities');
let cityArr = [];
let formattedCityInput;
const apiKey = '5569f0d8093687922f5c0ba190e02e6c'; // do not forget remove it before push


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
   let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
   fetch(URL).then(function(response){
       if (response.ok){
        response.json().then(function(data){

            console.log(data);

        } 
      )}
   }) 
};

let getCityForecastGetCurrent = function(cityName){
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    fetch(URL).then(function(response){
        if (response.ok){
         response.json().then(function(data){
             console.log(data);
             let currentTempEl = document.querySelector('#current-temp');
             currentTempEl.textContent = forecast.current['humidity']; 
         } 
       )}
    }) 
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
    let citiesStorage = localStorage.getItem('cities');
    let keepCities = JSON.parse(citiesStorage);

    if (!cityArr) {
        cityArr = [];
        return false;
    } else if (cityArr.length > 5) {
        // saves only the five most recent cities
        cityArr.shift();
    }

    for (let i = 0; i<keepCities.length; i++){
        let buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "recentCity");
        buttonEl.innerHTML = keepCities[i];
        recentCities.appendChild(buttonEl);
    }
    

};

keepCities();



//eventListener
searchBtn.addEventListener('click', inputHandeler)