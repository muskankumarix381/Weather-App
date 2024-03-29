const input = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchbtn');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const weatherImage = document.querySelector('.weather-image');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind');
const locationNotFound =  document.querySelector('.location-not-found')
const weatherBody = document.querySelector('.weather-body')

 async function checkWeather(city){
    const api_key="8091c4438783de8b40560b918e0e6769"
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weather_data = await  fetch(`${url}`).then(response=>response.json())
    //console.log(weather_data)

    if(weather_data.cod===`404`){
        locationNotFound.style.display="flex"
        weatherBody.style.display="none"
        //console.log('error')
        return;
    }
    locationNotFound.style.display="none"
    weatherBody.style.display="flex"
    temprature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°c`
    description.innerHTML = `${weather_data.weather[0].description}`

    humidity.innerHTML= `${weather_data.main.humidity}%`

    windSpeed.innerHTML = `${weather_data.wind.speed}km/h`

    // for images changes 
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weatherImage.src="/assets/cloud.png";
            break;
        case 'Clear' :
            weatherImage.src="/assets/clear.png";   
            break; 
        case 'Rain':
            weatherImage.src="/assets/rain.png";   
            break;
        case 'Mist':
            weatherImage.src="/assets/mist.png";     
            break;
        case 'Snow':
            weatherImage.src="/assets/snow.png";  
            break;  
    }

}

 

searchBtn.addEventListener('click',()=>{
    checkWeather(input.value);
})