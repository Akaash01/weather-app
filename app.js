const api = {
  key: "1614c8307ee24f5e34eab3adbd55db4f",
  base: "https://api.openweathermap.org/data/2.5/",
};
const search = document.querySelector(".input");
const button = document
  .querySelector(".btn")
  .addEventListener("click", getdata);

function getdata(e) {
  e.preventDefault();
  const city = search.value;
  fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then((res) => {
      return res.json();
    })
    .then(display);
}

function display(data) {
  if (data.cod == 200) {
    var city = data.name;
    var temp = data.main.temp;
    var con = data.sys.country;
    var min = data.main.temp_min;
    var max = data.main.temp_min;
    var climate = data.weather[0].main;
    var citycon = document.querySelector(".city");
    citycon.innerText = `${city},${con}`;
    var today = new Date();
    var date = document.querySelector(".date");
    date.innerText = getdate(today);
    var weather = document.querySelector(".weather");
    weather.innerText = `Weather : ${climate}`;
    var classtemp = document.querySelector(".temp");
    classtemp.innerText = ` ${Math.round(temp)}°C`;
    var range = document.querySelector(".range");
    range.innerText = `Temp Range: ${Math.round(min)}°C / ${Math.round(max)}°C`;
    var icon = document.querySelector(".icon");
    icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var wind = document.querySelector(".wind");
    wind.innerText = `Wind : ${Math.round(data.wind.speed * 3.6)} km/h`;
    var text = document.querySelector(".text");
    text.classList.add("text-active");
  } else {
    const error = document.querySelector(".error");
    error.textContent = "Please enter the valid city";
    search.value = "";
    setTimeout(() => {
      error.textContent = "";
    }, 3000);
  }
}
function getdate(d) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
}
