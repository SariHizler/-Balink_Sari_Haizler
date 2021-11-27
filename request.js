
function WeatherForParticularCountry(country) {
    return new Promise(function (resolve, reject) {
  
      fetch(`https://www.metaweather.com/api/location/${country}/`, {})
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err)=>{
            reject(err)
        })
  
    })
  }
  function WeatherForParticularCountryOnParticularDate(country, date) {
    return new Promise((resolve, reject) => {
      fetch(`https://www.metaweather.com/api/location/${country}/${date}`, {})
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
  
  }
  function countryiesInAsia() {
    return new Promise((resolve, reject) => {
      fetch(`https://www.metaweather.com/api/location/search/?lattlong=31.645303,2035.049099`, {})
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
  }