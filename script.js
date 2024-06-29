const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=';
const form = document.querySelector('form');
const cityElement = document.querySelector('.name');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const searchInput = document.getElementById('name');
const cloudsElement = document.getElementById('clouds');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const mainElement = document.querySelector('main');

// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

// Function to fetch weather data
const fetchWeather = (city) => {
    const url = `${baseUrl}${apiKey}&q=${city}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherUI(data);
            } else {
                showError();
            }
            searchInput.value = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError();
        });
};

// Function to update the UI with weather data
const updateWeatherUI = (data) => {
    cityElement.querySelector('figcaption').innerText = data.name;
    cityElement.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperatureElement.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    temperatureElement.querySelector('span').innerText = data.main.temp;
    descriptionElement.innerText = data.weather[0].description;

    cloudsElement.innerText = data.clouds.all;
    humidityElement.innerText = data.main.humidity;
    pressureElement.innerText = data.main.pressure;
};

// Function to handle errors
const showError = () => {
    mainElement.classList.add('error');
    setTimeout(() => {
        mainElement.classList.remove('error');
    }, 1000);
};

// Function to initialize the app with a default city
// const initApp = () => {
//     const defaultCity = 'Washington';
//     fetchWeather(defaultCity);
// };

// initApp();
