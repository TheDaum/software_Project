const API_KEY = "b06c41ccee7ab5cece7b8d69daf90f57"; //add your API KEY 
const COORDS = 'coords'; //좌표를 받을 변수 
//DOM객체들 
const weatherInfo1 = document.querySelector('.weatherInfo1');
const weatherInfo2 = document.querySelector('.weatherInfo2');
const weatherInfo3 = document.querySelector('.weatherInfo3');
const weatherIconImg = document.querySelector('.weatherIcon');



var tmp;
//초기화 
function init() {
    askForCoords();
    
}

//좌표를 물어보는 함수 
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

//좌표를 얻는데 성공했을 때 쓰이는 함수 
function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
}
//좌표를 얻는데 실패했을 때 쓰이는 함수 
function handleError() {
    console.log("can't not access to location");
}

//날씨 api를 통해 날씨에 관련된 정보들을 받아온다. 
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        //온도, 위치, 날씨묘사, 날씨아이콘을 받는다. 
        const temperature = Math.round(json.main.temp);
        const max_temperature = Math.round(json.main.temp_max);
        const min_temperature = Math.round(json.main.temp_min);
        const feels_like = Math.round(json.main.feels_like);
        const place = json.name;
        const weatherDescription = json.weather[0].description;
        const weatherIcon = json.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        //받아온 정보들을 표현한다. 
        weatherInfo1.innerText = `${temperature} °C`;
        weatherInfo2.innerText = `${place}`;
        weatherInfo3.innerText = `${max_temperature} °C / ${min_temperature} °C 체감온도 : ${feels_like} °C`;
        weatherIconImg.setAttribute('src', weatherIconAdrs);
        tmp = `${feels_like}`;

        setRecommend(); 
    })
    .catch((error) => console.log("error:", error));
}
init();

function setRecommend(){
    var season;
    if(tmp<=2.2){
        season="winter";
    }
    else if(3.9<tmp && tmp<=12.6){
        season="spring";
    }
    else if(12.9<tmp && tmp<=20){
        season="fall";
    }
    else{
        season="summer";
    }
    //season으로 검색
    var result = [];
    axios.get('http://localhost:8080/clothes').then((Response) => {
        data = Response.data;
        for(var i = 0;i<data.length;i++){
            if(userEmail==data[i].clothesUser&&data[i].clothesSeason==season){
              result.push(data[i].clothesSeason);
            }
            
        }
        console.log(result);
    
    });

     setTimeout(function(){
     var rand = Math.floor(Math.random() * (result.length));
    // $("#recommendImg").attr("src","");
     console.log(tmp);
     
   },50);
   $("#recommendText").text("오늘의 체감온도는 "+tmp+"입니다.")
}