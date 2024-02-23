// today
var todayName = document.getElementById('today-day-name')
var todayNumber = document.getElementById("today-day-number")
var todayMonth = document.getElementById("today-month")
var todayLocation = document.getElementById("today-location")
var todayTemp = document.getElementById("today-temp")
var todayConditionImg = document.getElementById("today-condition-img")
var todayConditionText = document.getElementById("today-condition-text")

var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")
var windDirection = document.getElementById("wind-direction")


//tmrw-next day
var nextName = document.getElementsByClassName("next-day-name")
var nextMaxTemp = document.getElementsByClassName("next-max-temp")
var nextMinTemp = document.getElementsByClassName("next-min-temp")
var nextConditionImg = document.getElementsByClassName("next-condition-img")
var nextConditionText =document.getElementsByClassName("next-condition-text")

//search
var search = document.getElementById('search')

//API
async function getWeatherData(cityName){
    var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7276ca7ce0fb4ee29ac195140242102&q=${cityName}&days=3`)
    var weatherData = await weatherResponse.json()
    return weatherData
}



//today data
function displayTodayData(data){

    var todayDate = new Date()
    todayName.innerHTML= todayDate.toLocaleDateString("en-Us", {weekday: "long"})
    todayMonth.innerHTML= todayDate.toLocaleDateString("en-Us", {month: "long"})
    todayNumber.innerHTML = todayDate.getDate()

    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML= data.current.temp_c
    todayConditionImg.setAttribute("src", "https:"+ data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+" %"
    wind.innerHTML =data.current.wind_kph+" km/hr"
    windDirection.innerHTML = data.current.wind_dir
}


//next days data

function displayNextData(data){
    for(var i=0; i<2; i++){

        var nextDay = new Date( data.forecast.forecastday[i+1].date)
        nextName[i].innerHTML = nextDay.toLocaleDateString("en-Us", {weekday: "long"})
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
        nextConditionText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
        nextConditionImg[i].setAttribute("src", "https:" +data.forecast.forecastday[i+1].day.condition.icon)
    }

}




//start API
async function startAPI(city="cairo")
{
    var weatherData = await getWeatherData(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
  
}
startAPI()


search.addEventListener("input",function(){
    // console.log(search.value)
    startAPI(search.value)
})