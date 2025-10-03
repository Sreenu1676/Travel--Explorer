const unsplashAccessKey = "VrnlI4kwDsyQP-yZfyIfAk5eI6NqkjGljZ7Phw2VaOU";
const weatherApiKey = "87419fd5a53d4872bf4161156250110";

async function searchDestination() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return alert("Search input not found!");
  
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a city name!");

  const photoGrid = document.getElementById("photoGrid");
  const weatherContainer = document.getElementById("weatherContainer");

  if (!photoGrid || !weatherContainer) return alert("Required elements not found!");

  // --- Weather API ---
  weatherContainer.innerHTML = "<p>Loading weather...</p>";
  try {
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${query}`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (weatherData.error) {
      weatherContainer.innerHTML = `<p>${weatherData.error.message}</p>`;
    } else {
      weatherContainer.innerHTML = `
        <h3>Weather in ${weatherData.location.name}, ${weatherData.location.country}</h3>
        <img src="https:${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
        <p>🌡️ Temp: ${weatherData.current.temp_c}°C</p>
        <p>☁️ Condition: ${weatherData.current.condition.text}</p>
        <p>💨 Wind: ${weatherData.current.wind_kph} km/h</p>
        <p>💧 Humidity: ${weatherData.current.humidity}%</p>
      `;
    }
  } catch (err) {
    console.error("Error fetching weather:", err);
    weatherContainer.innerHTML = "<p>Error loading weather data.</p>";
  }

  // --- Unsplash Photos (20 photos) ---
  photoGrid.innerHTML = "<p>Loading photos...</p>";
  try {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAccessKey}&per_page=20`;
    const photoRes = await fetch(unsplashUrl);
    const photoData = await photoRes.json();

    photoGrid.innerHTML = "";
    if (photoData.results.length === 0) {
      photoGrid.innerHTML = "<p>No photos found.</p>";
    } else {
      photoData.results.forEach(img => {
        const image = document.createElement("img");
        image.src = img.urls.small;
        image.alt = query;
        photoGrid.appendChild(image);
      });
    }
  } catch (err) {
    console.error("Error fetching photos:", err);
    photoGrid.innerHTML = "<p>Error loading photos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") searchDestination();
    });
  }
});
