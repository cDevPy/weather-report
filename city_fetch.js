// Greeting based on time
let now = new Date();
let hours = now.getHours();
let greet;
if (hours < 12) {
  greet = "Good Morning";
} else if (hours < 18) {
  greet = "Good Afternoon";
} else {
  greet = "Good Evening";
}
let welcomeTxt = document.getElementById("welcome-txt");
welcomeTxt.textContent = `${greet}, Enter a city name to get the current weather.`;
async function getWeather(city) {
  let api_key = "76772d1b94bc4721af4111512252710";
  let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`;

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    let data = await response.json();

    // Extract what you want
    let cityName = data.location.name;
    let countryName = data.location.country
    let temp = data.current.temp_c;
    let wDescribe = data.current.condition.text
    let icon = data.current.condition.icon;
    let currTime = data.location.localtime;

    // Display
    document.getElementById("city-name").textContent = `${cityName}, ${countryName}`;
    document.getElementById("temp").textContent = `Temperature: ${temp}°C`;
    document.getElementById("currTime").textContent = `Current Time: ${currTime}`;
    document.getElementById("weather-description").textContent = `Condition: ${wDescribe}`;
    document.getElementById("icon").src = "https:" + icon;
  } catch (error) {
    document.getElementById("city-name").textContent = "City not found";
    console.error(error);
  }
}

// Event listener for button click
document.getElementById("searchBtn").addEventListener("click", () => {
  let city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});
