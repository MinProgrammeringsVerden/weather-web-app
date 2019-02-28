 let apiKey ='faf7c54213cc65aa65ab8fe16e7d823e';
 let unit='metric';
 let searchMethod ;
   


function findSearchMethod (term){
    if(term.length === 5 && Number.parseInt(term) + '' === term ) 
        searchMethod = 'zip';

    else 
        searchMethod ='q';
    
}; 


 function searchWeather(term){
     findSearchMethod(term)
     fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${term}&APPID=${apiKey}&units=${unit}`).then(response => {
         return response.json()
     } )
     .then(response=>{
         init(response)
     })
     };


 function init(serverResponse){

        
     switch(serverResponse.weather[0].main){
         case 'Clear':
          document.body.style.backgroundImage = "url('photo/sunny2.jpeg')";
           break;
         case 'Clouds':
              document.body.style.backgroundImage = "url('photo/cloudy2.jpeg')";

            break;
         case 'Snow':
             document.body.style.backgroundImage = "url('photo/snow.jpeg')";
           break;
         case 'Mist':
              document.body.style.backgroundImage = "url('photo/mist.jpeg')";
           break;
         case 'Thunderstorm':
             document.body.style.backgroundImage = "url('photo/tord.jpeg')";
           break;
         case 'Rain':
             document.body.style.backgroundImage = "url('photo/rain.jpg')";
           break;
         case 'Drizzle':
           document.body.style.backgroundImage = "url('photo/cloudy.jpeg')";
             break;
         case 'Fog':
         document.body.style.backgroundImage = "url('photo/fog.jpeg')";
            break;
         default:
            document.body.style.backgroundImage= "url('photo/default3.jpeg')";
            
            break;
     }

     let temperature = document.getElementById('temperature');
     let description = document.getElementById('descriptionHeader');
     let windSpeed = document.getElementById('windSpeed');
     let humidity = document.getElementById('humidity');
     let cityHeader = document.getElementById('cityHeader');


     let weatherIcon = document.getElementById('weatherIcon');
     weatherIcon.src='http://openweathermap.org/img/w/' + serverResponse.weather[0].icon + '.png';
    
     let descriptionHeader = serverResponse.weather[0].description;
     description.innerHTML = descriptionHeader.charAt(0).toUpperCase() + descriptionHeader.slice(1);

     cityHeader.innerHTML = serverResponse.name;
     humidity.innerHTML = ' Humidity levels at ' + serverResponse.main.humidity + ' % ';
     windSpeed.innerHTML = ' Winds at ' + Math.floor(serverResponse.wind.speed) + ' m/s ';
     let temperatureResponse = serverResponse.main.temp;
     temperature.innerHTML = Math.floor(temperatureResponse ) +'&#176';

     let weatherDescription = serverResponse.weather[0].description;
     description.src = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);


     setPositionForWeatherInfo();
     
 };

 function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
  }


 document.getElementById('searchBtn').addEventListener('click' , () => {
let term = document.getElementById('searchInput').value;
 if (term){
     searchWeather(term);
 }
 })