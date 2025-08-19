const apiKey = "a578e9d47d58744153cdf86f064ed70b";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name 🌍</p>";
    return;
  }

  try {
    // ✅ Build URL once
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "<p>❌ City not found. Try again.</p>";
      return;
    }

    // Dynamic Icon Selection
    const weather = data.weather[0].main.toLowerCase();
    let icon = "🌈";
    if (weather.includes("cloud")) icon = "☁️";
    else if (weather.includes("rain")) icon = "🌧";
    else if (weather.includes("clear")) icon = "☀️";
    else if (weather.includes("snow")) icon = "❄️";
    else if (weather.includes("storm")) icon = "⛈";

    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <div class="icon">${icon}</div>
      <div class="details">
        🌡 <b>Temperature:</b> ${data.main.temp}°C<br>
        🌥 <b>Condition:</b> ${data.weather[0].description}<br>
        💧 <b>Humidity:</b> ${data.main.humidity}%<br>
        💨 <b>Wind Speed:</b> ${data.wind.speed} m/s
      </div>
    `;

    resultDiv.style.opacity = "1"; // Trigger slide animation
  } catch (error) {
    resultDiv.innerHTML = "<p>⚠️ Something went wrong. Please try again.</p>";
  }
}
