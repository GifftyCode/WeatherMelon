const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateTemplate = (data) => {
 
  //  Destructuring
  const { cityInfo, weatherInfo } = data;

  console.log(data);

  // updating the UI
  details.innerHTML = `
          <h5 class="my-3">${cityInfo.EnglishName},
          ${cityInfo.Country.EnglishName}
          </h5>
          <div class="my-3">${weatherInfo.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weatherInfo.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
  `;

  // displaying weather img
  let timeSrc = null;
  if (weatherInfo.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }

  time.setAttribute("src", timeSrc);

  // displaying weather icons
  let iconSrc = `img/icons/${weatherInfo.WeatherIcon}.svg`;

  icon.setAttribute("src", iconSrc);

  //Removing display none property
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the input value
  const cityInput = cityForm.city.value.trim();
  cityForm.reset();

  // update the UI
  forecast
    .updateCity(cityInput)
    .then((data) => updateTemplate(data))
    .catch((err) => console.log(err));

  // Setting the local storage

  localStorage.setItem("city", cityInput);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateTemplate(data))
    .catch((err) => console.log(err));
}
