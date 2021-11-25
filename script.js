const api = {
  key: "48f26e932d82012fa8f78fca8da09da8",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

// to fetch values by clicking the mouse button
function getInput(event) {
  event.preventDefault();
  if (event.type == "click") {
    getData(search.value);
    console.log(search.value);
  }
}

// to fetch values using enter
search.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    getData(search.value);
  }
});

function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayData);
}

function displayData(response) {
  // console.log(response);
  if (response.cod === "404") {
    const error = document.querySelector(".error");
    error.textContent = "Please enter a valid city";
    search.value = "";
  } else {
    const error = document.querySelector(".error");
    error.textContent = "";

    const city = document.querySelector(".city");
    city.innerText = `${response.name}, ${response.sys.country}`;

    const today = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateFunction(today);

    const temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(response.main.temp)} <span>°C</span>`;

    const weather = document.querySelector(".weather");
    weather.innerText = `${response.weather[0].main}`;

    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = ` ${Math.round(response.main.temp_min)}°C / ${Math.round(
      response.main.temp_max
    )}°C`;

    const weatherIcon = document.querySelector(".weather-icon");
    const iconURL = "http://openweathermap.org/img/w/";
    weatherIcon.src = iconURL + response.weather[0].icon + ".png";

    search.value = "";
  }
}

function dateFunction(d) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
