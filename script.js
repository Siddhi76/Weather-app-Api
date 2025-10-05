const apiKey = "60c047204dcf478b82245457250510"; // your API key
const btn = document.getElementById("getWeatherBtn");
const input = document.getElementById("locationInput");
const resultDiv = document.getElementById("weatherResult");

btn.addEventListener("click", () => {
    const location = input.value.trim();
    if (location === "") {
        alert("Please enter a location");
        return;
    }
    fetchWeather(location);
});

function fetchWeather(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Location not found");
            }
            return response.json();
        })
        .then(data => {
            const tempC = data.current.temp_c;
            const condition = data.current.condition.text;
            const city = data.location.name;
            const country = data.location.country;

            resultDiv.innerHTML = `
                <h2>${city}, ${country}</h2>
                <p>Temperature: ${tempC} °C</p>
                <p>Condition: ${condition}</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}
