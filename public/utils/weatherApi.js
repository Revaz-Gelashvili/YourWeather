const forecastData = [
  {
    day: "Monday",
    condition: "Sunny",
    icon: "./public/assets/images/default.jpg",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Tuesday",
    condition: "Sunny",
    icon: "./public/assets/images/default.jpg",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Wednesday",
    condition: "Sunny",
    icon: "./public/assets/images/default.jpg",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
];

const apiKey = "65c713a3180c4ed489b125332232709";
const input = document.getElementById("search-weather");
const tableBody = document.getElementById("weather-table-body");

renderTable(forecastData);

document.addEventListener("DOMContentLoaded", () => {
  setWeatherBackground("default");
  renderTable(forecastData);
});

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.day}</td>
      <td>
        <img src="${item.icon}" alt="${item.condition}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
        ${item.condition}
      </td>
      <td>${item.high}</td>
      <td>${item.low}</td>
      <td>${item.precipitation}</td>
      <td>${item.wind}</td>
    `;
    tableBody.appendChild(row);
  });
}

function fetchWeather(city) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&days=7&aqi=no&alerts=no`
  )
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const forecast = data.forecast.forecastday.map((entry) => ({
        day: new Date(entry.date).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        condition: entry.day.condition.text,
        icon: `https:${entry.day.condition.icon}`,
        high: `${entry.day.maxtemp_c}°C`,
        low: `${entry.day.mintemp_c}°C`,
        precipitation: `${entry.day.daily_chance_of_rain}%`,
        wind: `${entry.day.maxwind_kph} km/h`,
      }));
      renderTable(forecast);
      setWeatherBackground(forecast[0].condition);
    })
    .catch((err) => {
      console.error("Ошибка:", err);
      alert("City not found or API error. Please try again.");
      renderTable(forecastData);
    });
}

const getImage = (condition) => {
  switch (condition.toLowerCase()) {
    case "overcast":
      return "./public/assets/images/overcast.jpg";
    case "cloud":
      return "./public/assets/images/cloud.jpg";
    case "fog":
    case "freezing fog":
    case "mist":
      return "./public/assets/images/fog.jpg";
    case "partly cloudy":
    case "cloudy":
      return "./public/assets/images/partly.jpg";
    case "moderate snow":
    case "heavy snow":
    case "moderate or heavy snow showers":
    case "light snow":
    case "light snow showers":
    case "patchy light snow":
      return "./public/assets/images/snow.jpg";
    case "sunny":
    case "clear":
      return "./public/assets/images/sun.jpg";
    case "light rain":
    case "patchy rain possible":
    case "freezing drizzle":
    case "light drizzle":
    case "light freezing rain":
    case "moderate rain":
    case "light rain shower":
    case "Patchy rain nearby":
    case "Heavy rain":
      return "./public/assets/images/rain.jpg";
    default:
      console.warn("Unknown condition:", condition);
      return "./public/assets/images/default.jpg";
  }
};

const setWeatherBackground = (condition) => {
  const weatherImgDiv = document.getElementById("weather-image");
  if (!weatherImgDiv) {
    console.error("Element with id 'weather-image' not found");
    return;
  }
  const imagePath = getImage(condition);
  weatherImgDiv.style.backgroundImage = `url('${imagePath}')`;
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    fetchWeather(input.value.trim());
  }
});
