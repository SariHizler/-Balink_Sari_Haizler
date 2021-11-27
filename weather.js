const select = document.getElementById("selectCountry")
const selectCountryOneDay = document.getElementById("selectCountryOneDay")
const date = document.getElementById("date")
const thisDayPlusFiveDays = dayjs(dayjs().add(5, 'day').$d).format('YYYY-MM-DD')
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// let [firstName, surname] = arr;
if (window.location.href.includes('WeatherForOneDay.html')) {
  date.setAttribute("max", thisDayPlusFiveDays)
  fillCountryiesInAsia()
}

async function fillCountryiesInAsia() {
  const data = await countryiesInAsia()

  data.forEach((country) => {
    const option = document.createElement('option')
    option.setAttribute("value", country.woeid)
    option.innerHTML = country.title
    document.getElementById("selectCountryOneDayInAsia").append(option)
  })


}


async function changeSelect() {

  if (select.value) {
    const data = await WeatherForParticularCountry(select.value)
    const Weather_for_the_next_five_days = data.consolidated_weather
    document.getElementById("Weather_for_the_next_five_days").innerHTML = "";
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    h1.innerHTML = select.options[select.selectedIndex].text
    div.append(h1)

    // destructuring
    const [time, sun_rise, sun_set] = [`${dayjs(data.time.split(".")[0]).format("hh:mm")}`, `${dayjs(data.sun_rise.split(".")[0]).format("hh:mm")}`, `${dayjs(data.sun_set.split(".")[0]).format("hh:mm")}`]


    const p = document.createElement('p')
    p.innerHTML += `Time ${time}`
    div.append(p)
    const p2 = document.createElement('p')
    p2.innerHTML += `Sunrise ${sun_rise}`
    div.append(p2)
    const p3 = document.createElement('p')
    p3.innerHTML += `Sunset ${sun_set}`
    div.append(p3)

    document.getElementById("Weather_for_the_next_five_days").append(div)
    const h2 = document.createElement('h2')

    Weather_for_the_next_five_days.forEach((weatherOfDay, index) => {
      const d = dayjs(weatherOfDay.applicable_date)
      const div_of_day = document.createElement("div")

      const day = document.createElement("div")

      if (index === 0) {
        day.innerHTML = "Today"


      } else if (index === 1) {
        day.innerHTML = "Tomorrow"

      } else {
        const dayName = days[d.day()]
        const month = mlist[d.month()]
        day.innerHTML = `${dayName} ${d.$D} ${month}`
      }
      day.classList.add("day")
      div_of_day.append(day)

      const img = document.createElement('img')
      img.src = `https://www.metaweather.com/static/img/weather/ico/${weatherOfDay.weather_state_abbr}.ico`
      img.classList.add("img")
      div_of_day.append(img)

      div_of_day.innerHTML += weatherOfDay.weather_state_name
      const max = document.createElement('div')
      max.innerHTML += `Max: ${parseInt(weatherOfDay.max_temp)}&#8451`
      const min = document.createElement('div')
      min.innerHTML += `Min: ${parseInt(weatherOfDay.min_temp)}&#8451`
      const wind_speed = document.createElement('div')
      const wind_direction = document.createElement('div')
      wind_direction.innerHTML += `&#8593`
      wind_direction.style.transform = `rotate(${parseInt(weatherOfDay.wind_direction)}deg)`
      wind_direction.style.display = "inline-block"

      wind_speed.append(wind_direction)
      wind_speed.innerHTML += ` ${parseInt(weatherOfDay.wind_speed)}mph`

      const humidity = document.createElement('div')
      h2.innerHTML = "Humidity"
      humidity.append(h2)
      humidity.innerHTML += `${weatherOfDay.humidity}%`

      const visibility = document.createElement('div')
      h2.innerHTML = "Visibility"
      visibility.append(h2)
      visibility.innerHTML += `${Math.round(weatherOfDay.visibility * 10) / 10} miles`

      const pressure = document.createElement('div')
      h2.innerHTML = "Pressure"
      pressure.append(h2)
      pressure.innerHTML += `${parseInt(weatherOfDay.air_pressure)}mb`

      const confidence = document.createElement('div')

      h2.innerHTML = "Confidence"
      confidence.append(h2)
      confidence.style.paddingTop = "1rem"


      confidence.innerHTML += `${weatherOfDay.predictability}%`

      div_of_day.append(max)
      div_of_day.append(min)
      div_of_day.append(wind_speed)
      div_of_day.append(humidity)
      div_of_day.append(visibility)
      div_of_day.append(pressure)
      div_of_day.append(confidence)
      div_of_day.classList.add("div_of_day")
      document.getElementById("Weather_for_the_next_five_days").append(div_of_day)


    })

  }


}

async function changeSelectOneDay(value) {
  let d = dayjs(date.value).format('YYYY/MM/DD')
  if ((selectCountryOneDay.value || value) && date.value) {
    let select
    if (value) {
      select = document.getElementById("selectCountryOneDayInAsia")
    } else {
      select = selectCountryOneDay
    }
    const data = await WeatherForParticularCountryOnParticularDate(select.value, d)
    const weather_for_one_day = data[0]
    document.getElementById("weather_for_one_day").innerHTML = "";
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    h1.innerHTML = select.options[select.selectedIndex].text
    div.append(h1)
    document.getElementById("weather_for_one_day").append(div)
    const h2 = document.createElement('h2')

    d = dayjs(weather_for_one_day.applicable_date)

    const div_of_day = document.createElement("div")

    const day = document.createElement("div")
    
    // destructuring
    let date = {
      dayName: days[d.day()],
      dayOnMonth:dayjs(d).date(),
      month: mlist[d.month()]
    };
    let {dayName,dayOnMonth,month}=date

    day.innerHTML = `${dayName} ${dayOnMonth} ${month}`

    day.classList.add("day")
    div_of_day.append(day)

    const img = document.createElement('img')
    img.src = `https://www.metaweather.com/static/img/weather/ico/${weather_for_one_day.weather_state_abbr}.ico`
    img.classList.add("img")
    div_of_day.append(img)

    div_of_day.innerHTML += weather_for_one_day.weather_state_name
    const max = document.createElement('div')
    max.innerHTML += `Max: ${parseInt(weather_for_one_day.max_temp)}&#8451`
    const min = document.createElement('div')
    min.innerHTML += `Min: ${parseInt(weather_for_one_day.min_temp)}&#8451`

    const wind_speed = document.createElement('div')
    const wind_direction = document.createElement('div')
    wind_direction.innerHTML += `&#8593`
    wind_direction.style.transform = `rotate(${parseInt(weather_for_one_day.wind_direction)}deg)`
    wind_direction.style.display = "inline-block"

    wind_speed.append(wind_direction)
    wind_speed.innerHTML += ` ${parseInt(weather_for_one_day.wind_speed)}mph`

    const humidity = document.createElement('div')
    h2.innerHTML = "Humidity"
    humidity.append(h2)
    humidity.innerHTML += `${weather_for_one_day.humidity}%`

    const visibility = document.createElement('div')
    h2.innerHTML = "Visibility"
    visibility.append(h2)
    visibility.innerHTML += `${Math.round(weather_for_one_day.visibility * 10) / 10} miles`

    const pressure = document.createElement('div')
    h2.innerHTML = "Pressure"
    pressure.append(h2)
    pressure.innerHTML += `${parseInt(weather_for_one_day.air_pressure)}mb`

    const confidence = document.createElement('div')

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

  }
}
function changeSelectOneDayInAsia() {
  changeSelectOneDay(document.getElementById("selectCountryOneDayInAsia"))
}





