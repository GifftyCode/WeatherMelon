const cityForm = document.querySelector("form");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weatherDetails: weatherDetails,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the input value
  const cityInput = cityForm.city.value.trim();
  cityForm.reset();

  // update the UI
  updateCity(cityInput)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
