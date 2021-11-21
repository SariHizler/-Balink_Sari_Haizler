
let select = document.getElementById("selectCountry")
let selectCountryOneDay = document.getElementById("selectCountryOneDay")
let date = document.getElementById("date")
let thisDayPlusFiveDays = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000))
thisDayPlusFiveDays = `${thisDayPlusFiveDays.getFullYear()}-${thisDayPlusFiveDays.getMonth() + 1}-${thisDayPlusFiveDays.getDate()}`


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

if (window.location.href.includes('index2.html')) {
  date.setAttribute("max", thisDayPlusFiveDays)
  fillCountryiesInAsia()
}

function fillCountryiesInAsia() {
  fetch(`https://www.metaweather.com/api/location/search/?lattlong=31.645303,2035.049099`, {})
    .then((response) => {
      return response.json();
    })
    .then((y) => {
      for (let i = 0; i < y.length; i++) {
        let option = document.createElement('option')
        option.setAttribute("value", y[i].woeid)
        option.innerHTML = y[i].title
        document.getElementById("selectCountryOneDayInAsia").append(option)

      }
    })
}


function changeSelect() {
  if (select.value) {
    fetch(`https://www.metaweather.com/api/location/${select.value}/`, {})
      .then((response) => {
        return response.json();
      })
      .then((y) => {

        let Weather_for_the_next_five_days = y.consolidated_weather
        document.getElementById("Weather_for_the_next_five_days").innerHTML = "";
        let div = document.createElement('div')
        let h1 = document.createElement('h1')


        h1.innerHTML = select.options[select.selectedIndex].text
        div.append(h1)
        let p = document.createElement('p')
        let arr = y.time.split("T")[1].split(".")[0].split(":");
        let time = `${arr[0]}:${arr[1]}`

        p.innerHTML += `Time ${time}`
        div.append(p)
        let p2 = document.createElement('p')
        arr = y.sun_rise.split("T")[1].split(".")[0].split(":")
        time = `${arr[0]}:${arr[1]}`
        p2.innerHTML += `Sunrise ${time}`
        div.append(p2)
        let p3 = document.createElement('p')
        arr = y.sun_set.split("T")[1].split(".")[0].split(":")
        time = `${arr[0]}:${arr[1]}`
        p3.innerHTML += `Sunset ${time}`
        div.append(p3)

        document.getElementById("Weather_for_the_next_five_days").append(div)
        let h2 = document.createElement('h2')
        for (let i = 0; i < Weather_for_the_next_five_days.length; i++) {
          let d = new Date(Weather_for_the_next_five_days[i].applicable_date)

          let div_of_day = document.createElement("div")

          let day = document.createElement("div")

          if (i === 0) {
            day.innerHTML = "Today"


          } else if (i === 1) {
            day.innerHTML = "Tomorrow"

          } else {
            const dayName = days[d.getDay()]
            const month = mlist[d.getMonth()]
            day.innerHTML = `${dayName} ${d.getUTCDate()} ${month}`
          }
          day.classList.add("day")
          div_of_day.append(day)

          let img = document.createElement('img')
          img.src = `https://www.metaweather.com/static/img/weather/ico/${Weather_for_the_next_five_days[i].weather_state_abbr}.ico`
          img.classList.add("img")
          div_of_day.append(img)

          div_of_day.innerHTML += Weather_for_the_next_five_days[i].weather_state_name
          let max = document.createElement('div')
          max.innerHTML += `Max: ${parseInt(Weather_for_the_next_five_days[i].max_temp)}&#8451`
          let min = document.createElement('div')
          min.innerHTML += `Min: ${parseInt(Weather_for_the_next_five_days[i].min_temp)}&#8451`
          let wind_speed = document.createElement('div')
          let wind_direction = document.createElement('div')
          wind_direction.innerHTML += `&#8593`
          wind_direction.style.transform = `rotate(${parseInt(Weather_for_the_next_five_days[i].wind_direction)}deg)`
          wind_direction.style.display = "inline-block"

          wind_speed.append(wind_direction)
          wind_speed.innerHTML += ` ${parseInt(Weather_for_the_next_five_days[i].wind_speed)}mph`

          let humidity = document.createElement('div')
          h2.innerHTML = "Humidity"
          humidity.append(h2)
          humidity.innerHTML += `${Weather_for_the_next_five_days[i].humidity}%`

          let visibility = document.createElement('div')
          h2.innerHTML = "Visibility"
          visibility.append(h2)
          visibility.innerHTML += `${Math.round(Weather_for_the_next_five_days[i].visibility * 10) / 10} miles`

          let pressure = document.createElement('div')
          h2.innerHTML = "Pressure"
          pressure.append(h2)
          pressure.innerHTML += `${parseInt(Weather_for_the_next_five_days[i].air_pressure)}mb`

          let confidence = document.createElement('div')

          h2.innerHTML = "Confidence"
          confidence.append(h2)
          confidence.style.paddingTop = "1rem"


          confidence.innerHTML += `${Weather_for_the_next_five_days[i].predictability}%`

          div_of_day.append(max)
          div_of_day.append(min)
          div_of_day.append(wind_speed)
          div_of_day.append(humidity)
          div_of_day.append(visibility)
          div_of_day.append(pressure)
          div_of_day.append(confidence)
          div_of_day.classList.add("div_of_day")
          document.getElementById("Weather_for_the_next_five_days").append(div_of_day)

        }
      });
  }


}

function changeSelectOneDay(value) {
  let d = new Date(date.value).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  if ((selectCountryOneDay.value || value) && date.value) {
    let select
    if (value) {
      select = document.getElementById("selectCountryOneDayInAsia")
    } else {
      select = selectCountryOneDay
    }
    fetch(`https://www.metaweather.com/api/location/${select.value}/${d}`, {})
      .then((response) => {
        return response.json();
      })
      .then((y) => {
        let weather_for_one_day = y[0]
        document.getElementById("weather_for_one_day").innerHTML = "";
        let div = document.createElement('div')
        let h1 = document.createElement('h1')
        h1.innerHTML = select.options[select.selectedIndex].text
        div.append(h1)
        document.getElementById("weather_for_one_day").append(div)
        let h2 = document.createElement('h2')

        d = new Date(weather_for_one_day.applicable_date)

        let div_of_day = document.createElement("div")

        let day = document.createElement("div")


        const dayName = days[d.getDay()]
        const month = mlist[d.getMonth()]
        day.innerHTML = `${dayName} ${d.getUTCDate()} ${month}`

        day.classList.add("day")
        div_of_day.append(day)

        let img = document.createElement('img')
        img.src = `https://www.metaweather.com/static/img/weather/ico/${weather_for_one_day.weather_state_abbr}.ico`
        img.classList.add("img")
        div_of_day.append(img)

        div_of_day.innerHTML += weather_for_one_day.weather_state_name
        let max = document.createElement('div')
        max.innerHTML += `Max: ${parseInt(weather_for_one_day.max_temp)}&#8451`
        let min = document.createElement('div')
        min.innerHTML += `Min: ${parseInt(weather_for_one_day.min_temp)}&#8451`

        let wind_speed = document.createElement('div')
        let wind_direction = document.createElement('div')
        wind_direction.innerHTML += `&#8593`
        wind_direction.style.transform = `rotate(${parseInt(weather_for_one_day.wind_direction)}deg)`
        wind_direction.style.display = "inline-block"

        wind_speed.append(wind_direction)
        wind_speed.innerHTML += ` ${parseInt(weather_for_one_day.wind_speed)}mph`

        let humidity = document.createElement('div')
        h2.innerHTML = "Humidity"
        humidity.append(h2)
        humidity.innerHTML += `${weather_for_one_day.humidity}%`

        let visibility = document.createElement('div')
        h2.innerHTML = "Visibility"
        visibility.append(h2)
        visibility.innerHTML += `${Math.round(weather_for_one_day.visibility * 10) / 10} miles`

        let pressure = document.createElement('div')
        h2.innerHTML = "Pressure"
        pressure.append(h2)
        pressure.innerHTML += `${parseInt(weather_for_one_day.air_pressure)}mb`

        let confidence = document.createElement('div')

        h2.innerHTML = "Confidence"
        confidence.append(h2)
        confidence.style.paddingTop = "1rem"


        confidence.innerHTML += `${weather_for_one_day.predictability}%`

        div_of_day.append(max)
        div_of_day.append(min)
        div_of_day.append(wind_speed)
        div_of_day.append(humidity)
        div_of_day.append(visibility)
        div_of_day.append(pressure)
        div_of_day.append(confidence)
        div_of_day.classList.add("div_of_day")
        document.getElementById("weather_for_one_day").append(div_of_day)


      });


  }
}
function changeSelectOneDayInAsia() {
  changeSelectOneDay(document.getElementById("selectCountryOneDayInAsia"))
}