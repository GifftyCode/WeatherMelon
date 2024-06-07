class Forecast {
  constructor() {
    this.key = "n6f3Rc70G3d1TAj1HvJPBeGAOxs0IwyU";
    this.cityURL =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherURL =
      "http://dataservice.accuweather.com/currentconditions/v1/";
  }
  async updateCity(city) {
    const cityInfo = await this.getCity(city);
    const weatherInfo = await this.getWeather(cityInfo.Key);

    return {
      cityInfo,
      weatherInfo,
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    return data[0];
  }
}

