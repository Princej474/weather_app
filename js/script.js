const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const locationName = document.querySelector("input");
let image = document.querySelector(".top-section img");
let suggest = document.querySelector(".suggestion");
const allCities = [];
console.log(image);

async function getWeatherData(query) {
  if (query.length !== 0) {
    await fetch(`http://localhost:5000/get-weather?city=${query}`)
      .then((data) => {
        return data.json();
      })
      .then((d) => addWeatherData(d))
      .catch((err) => {
        alert("Enter valid city");
      });
  } else {
    alert("Enter a city");
  }
}

function addWeatherData(res) {
  locationName.value = res.location.name;
  temperature.innerHTML = `${res.current.tempC}°`;

  if (res.current.tempC < 5) {
    image.src = "./images/snowy-6.svg";
  } else if (res.current.tempC >= 5 && res.current.tempC < 10) {
    image.src = "./images/snowy-3.svg";
  } else if (res.current.tempC >= 10 && res.current.tempC < 20) {
    image.src = "./images/rainy-4.svg";
  } else if (res.current.tempC >= 20 && res.current.tempC < 30) {
    image.src = "./images/cloudy-day-3.svg";
  } else if (res.current.tempC >= 30 && res.current.tempC < 40) {
    image.src = "./images/cloudy-day-1.svg";
  }

  feelsLike.innerHTML = `Feels ${res.current.feelslikeC}°`;
}

locationName.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log(e.target.value);
    getWeatherData(e.target.value);
  }
});

function addSuggestionCity() {
  allCities.forEach((city) => {
    let li = document.createElement("li");
    li.textContent = city;
    suggest.firstElementChild.appendChild(li);
  });
}

suggest.firstElementChild.addEventListener("click", (e) => {
  locationName.value = e.target.textContent;
  getWeatherData(locationName.value);
});

async function getAllCities() {
  await fetch(`http://localhost:5000/get-all-cities`)
    .then((data) => {
      return data.json();
    })
    .then((d) => {
      d.forEach((city) => {
        allCities.push(city);
      });
    })
    .then(() => addSuggestionCity())
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}

window.addEventListener("click", (e) => {
  if (e.target === locationName) {
    suggest.classList.remove("hide");
  } else {
    suggest.classList.add("hide");
  }
});
locationName.addEventListener("click", (e) => {
  if (e.key === "Enter") {
    getWeatherData(e.target.value);
  }
});

(() => {
  getAllCities();
  getWeatherData("kolkata");
})();