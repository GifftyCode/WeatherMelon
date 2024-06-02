const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateTemplate = (data) => {
  // getting the data
  // const cityDetails = data.cityDetails;
  // const weatherDetails = data.weatherDetails;

  //  Destructuring
  const { cityDetails, weatherDetails } = data;

  // updating the UI
  details.innerHTML = `
          <h5 class="my-3">${cityDetails.EnglishName},
          ${cityDetails.Country.EnglishName}
          </h5>
          <div class="my-3">${weatherDetails.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
  `;

  //Removing display none property
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weatherDetails,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the input value
  const cityInput = cityForm.city.value.trim();
  cityForm.reset();

  // update the UI
  updateCity(cityInput)
    .then((data) => updateTemplate(data))
    .catch((err) => console.log(err));
});
