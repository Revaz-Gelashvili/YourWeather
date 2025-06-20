const forecastData = [
  {
    day: "Monday",
    condition: "Sunny",
    icon: "sunny",
    high: "25°C",
    low: "15°C",
    precipitation: "0%",
    wind: "10 km/h",
  },
  {
    day: "Tuesday",
    condition: "Cloudy",
    icon: "cloudy",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Wednesday",
    condition: "Cloudy",
    icon: "cloudy",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Thursday",
    condition: "Cloudy",
    icon: "cloudy",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Friday",
    condition: "Cloudy",
    icon: "cloudy",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Saturday",
    condition: "Cloudy",
    icon: "cloudy",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
  {
    day: "Sunday",
    condition: "Cloudy",
    icon: "cloudy",
    high: "27°C",
    low: "17°C",
    precipitation: "10%",
    wind: "12 km/h",
  },
];

function renderTable(data) {
  const tableBody = document.getElementById("weather-table-body");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.day}</td>
      <td><span class="condition-icon ${item.icon}"></span> ${item.condition}</td>
      <td>${item.high}</td>
      <td>${item.low}</td>
      <td>${item.precipitation}</td>
      <td>${item.wind}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Отрисовываем фейковые данные
renderTable(forecastData);

// Пример будущего подключения к API (можно заменить позже)
fetch(`https://your-weather-api.com/forecast?...`)
  .then((res) => res.json())
  .then((data) => {
    // Здесь ты должен привести `data` из API к нужной структуре
    const parsedData = data.map((entry) => ({
      day: entry.day,
      condition: entry.condition.text,
      icon: entry.condition.iconClass, // тут адаптируй под своё API
      high: `${entry.temp_max}°C`,
      low: `${entry.temp_min}°C`,
      precipitation: `${entry.pop}%`,
      wind: `${entry.wind_kph} km/h`,
    }));

    renderTable(parsedData);
  });
