const api = {
  key: "48f26e932d82012fa8f78fca8da09da8",
  base: "https://api.openweathermap.org/data/2.5/",
};


const input = document.querySelector('#search');
const search = document.querySelector('.btn');

search.addEventListener('click', () => {
  console.log(input.value);
  getWeather(input.value);
});

input.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    console.log(input.value);
    getWeather(input.value);
  }
})

function getWeather(city) {
  fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayWeather);
}

function displayWeather(weather) {
  if (weather.cod === "404") {
    const error = document.querySelector('#error');
    error.innerText = "Please enter a valid city";
    input.value = "";
    return;
  }
  error.innerText = "";
  const city = document.querySelector('#city');
  city.innerText = `${weather.name},  ${weather.sys.country}`;

  const date = document.querySelector('#date');
  date.innerText = todaysDate();

  const temp = document.querySelector('#temp');
  temp.innerHTML = `${Math.ceil(weather.main.temp)}<span> °C</span>`;

  const description = document.querySelector('#description');
  description.innerText = `${weather.weather[0].main}`;

  const range = document.querySelector('#max-min');
  range.innerHTML = `${Math.floor(weather.main.temp_min)}<span> °C / </span>${Math.ceil(weather.main.temp_max)} <span> °C</span>`

  const weatherIcon = document.querySelector("#weather-icon");
  const iconURL = "http://openweathermap.org/img/w/";
  weatherIcon.src = iconURL + weather.weather[0].icon + ".png";

}


setInterval(showTime, 1000);

function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" + min + ":" + sec;

  document.getElementById("clock").innerHTML = currentTime;
}



showTime();


function todaysDate() {
  const d = new Date();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const dayinNumber = d.getDate();
  const dayInWords = days[d.getDay()];
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${dayInWords},   ${dayinNumber} ${month} ${year}`
}
