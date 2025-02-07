
/* Create Elements >> HEADER */
const $header = document.createElement("div")
$header.classList.add("header")

const $cityWrapper = document.createElement("div")
$cityWrapper.classList.add("cityWrapper")

const $title = document.createElement("div")
$title.classList.add("textTitle")
$title.textContent = "Weather-APP"

const $showTime = document.createElement("div")
$showTime.classList.add("showTime")

const $btnCity = document.createElement("button")
$btnCity.classList.add("addCityBtn")
$btnCity.textContent = "add"

const $cityInput = document.createElement("input")
$cityInput.classList.add("formControl")
$cityInput.type = "text";
$cityInput.setAttribute('required', true);
$cityInput.placeholder = "add city name"

/* Create Elements >> MAIN*/

const $main = document.createElement("div")
$main.classList.add("main__cityName-temp")
const $cityName = document.createElement("div")
$cityName.classList.add("city-Name")
const $cityTemp = document.createElement("div")
$cityTemp.classList.add("city-Temp")
const $cityClouds = document.createElement("div")
$cityClouds.classList.add("city-Clouds")


$main.append($cityName,$cityTemp,$cityClouds)
$cityWrapper.append($cityInput,$btnCity)
$header.append($cityWrapper,$title,$showTime)
document.body.append($header,$main)


/* Function get Time*/
 function getTime(){
  const time = new Date()
  const hours = time.getHours().toString().padStart(2,'0') 
  const minutes = time.getMinutes().toString().padStart(2,'0')

  $showTime.textContent = `${hours} : ${minutes}`
 }

 setInterval(getTime, 30000)
 getTime()

  
 /* Create fetch API */

 $btnCity.addEventListener("click" , async function getWeathe(event) {
  event.preventDefault()

  const apiKey = "629d573a3cff943e93ae8d0b58e35b72";
  const cityName = $cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;




  try{
    const response = await fetch(url)
    const data = await response.json()
    if(data.cod === 200){
      console.log(data);
      $cityName.classList.add("active")
      $cityTemp.classList.add("active")
      $cityClouds.classList.add("active")
      $cityName.innerHTML = `${data.name}<sup>${data.sys.country}</sup>`
      $cityTemp.innerHTML = `Temp:${data.main.temp}<sup>o</sup>C`
      $cityClouds.innerHTML = `Windy:${data.wind.speed}<sup>M/S</sup> `
    }
    else{
      console.log("City is not found");
      
    }

  }
  catch(error){
    console.error("error")
  }
  
 })






