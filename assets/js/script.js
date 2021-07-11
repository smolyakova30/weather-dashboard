let cityInput = document.querySelector('#city-input');
let searchBtn = document.querySelector('#search-btn');
let cityNameDisplay = document.querySelector('#city-name');
let currentDateDisplay = document.querySelector('#current-date');
let recentCities = document.querySelector('#recent-cities');
let cityArr = [];
let formattedCityInput;
var currentDate = moment().format("dddd, MMMM Do");
var uvData;
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
        cityInput.value = "";
        //document.getElementById('appear').style.display="block"
    }

    console.log(formattedCityInput); // needs to be deleted
};


let getCityForecastGetCurrent = function(cityName){
    cityNameDisplay.textContent = cityName;

    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetch(URL).then(function(response){
        if (response.ok){
         response.json().then(function(data){
             console.log(data);
             let mIcon = document.querySelector("#main-icon");
             mIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
             
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
                    currentUvi = parseInt(currentUvi)
                    console.log (currentUvi);
                    if (currentUvi <=2){
                        document.querySelector("#current-uvi").classList.add("low")
                    }else if (currentUvi>=3 && currentUvi<=5){
                        document.querySelector("#current-uvi").classList.add("moderate")
                    }else{
                        document.querySelector("#current-uvi").classList.add("high")
                    }
                })
            })

  console.log(data)
        } 
     )}
    }) 

    displayDates();
 };

 let getCityForecast5days = function(cityName){
    let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetch(URL).then(function(response){
        if (response.ok){
         response.json().then(function(data){
 
             console.log(data);
             for (let i=0; i<5; i++) {
                 console.log('we are looping this is turn: ' + i)
                 console.log(data.list[(i*9)+3].main.temp)
                 console.log(data.list[(i*9)+3].wind.speed) 
                 console.log(data.list[(i*9)+3].main.humidity) 
                 console.log(data.list[(i*9)+3].weather[0].icon)     
             }
             //day 1
             let currentIcon1 = document.querySelector("#icon-1");
             currentIcon1.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}.png`);
             let currentTempDisplay1 = document.querySelector("#high-1");
             currentTempDisplay1.textContent = Math.round(data.list[3].main.temp);
             let currentWindDisplay1 = document.querySelector("#low-1");
             currentWindDisplay1.textContent = Math.round(data.list[3].wind.speed);
             let currentHumidityDisplay1 = document.querySelector("#humidity-1");
             currentHumidityDisplay1.textContent = Math.round(data.list[3].main.humidity);
             
             //day 2
             let currentIcon2 = document.querySelector("#icon-2");
             currentIcon2.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[12].weather[0].icon}.png`);
             let currentTempDisplay2 = document.querySelector("#high-2");
             currentTempDisplay2.textContent = Math.round(data.list[12].main.temp);
             let currentWindDisplay2 = document.querySelector("#low-2");
             currentWindDisplay2.textContent = Math.round(data.list[12].wind.speed);
             let currentHumidityDisplay2 = document.querySelector("#humidity-2");
             currentHumidityDisplay2.textContent = Math.round(data.list[12].main.humidity);

             //day 3
             let currentIcon3 = document.querySelector("#icon-3");
             currentIcon3.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[21].weather[0].icon}.png`);
             let currentTempDisplay3 = document.querySelector("#high-3");
             currentTempDisplay3.textContent = Math.round(data.list[21].main.temp);
             let currentWindDisplay3 = document.querySelector("#low-3");
             currentWindDisplay3.textContent = Math.round(data.list[21].wind.speed);
             let currentHumidityDisplay3 = document.querySelector("#humidity-3");
             currentHumidityDisplay3.textContent = Math.round(data.list[21].main.humidity);

             //day 4
             let currentIcon4 = document.querySelector("#icon-4");
             currentIcon4.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[30].weather[0].icon}.png`);
             let currentTempDisplay4 = document.querySelector("#high-4");
             currentTempDisplay4.textContent = Math.round(data.list[30].main.temp);
             let currentWindDisplay4 = document.querySelector("#low-4");
             currentWindDisplay4.textContent = Math.round(data.list[30].wind.speed);
             let currentHumidityDisplay4 = document.querySelector("#humidity-4");
             currentHumidityDisplay4.textContent = Math.round(data.list[30].main.humidity);

             //day 5
             let currentIcon5 = document.querySelector("#icon-5");
             currentIcon5.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png`);
             let currentTempDisplay5 = document.querySelector("#high-5");
             currentTempDisplay5.textContent = Math.round(data.list[39].main.temp);
             let currentWindDisplay5 = document.querySelector("#low-5");
             currentWindDisplay5.textContent = Math.round(data.list[39].wind.speed);
             let currentHumidityDisplay5 = document.querySelector("#humidity-5");
             currentHumidityDisplay5.textContent = Math.round(data.list[39].main.humidity);
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

let searchAgain = function(){
    getCityForecast5days(event.target.textContent);
    getCityForecastGetCurrent(event.target.textContent);

}

//eventListener
searchBtn.addEventListener('click', inputHandeler)
$('.recentCity').on("click", searchAgain);
 




