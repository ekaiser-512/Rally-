// giggle VARIABLES
const giggleButton = document.querySelector('#giggle');
const getGigglesBaseUrl = "https://corsproxy.io/?https://www.yomama-jokes.com/api/v1/jokes/random/";

// facts callback 
giggleButton.addEventListener('click', mommaAPI);

function mommaAPI() {
    const uniqueUrl = `${getGigglesBaseUrl}?t=${Date.now()}`;
    fetch(uniqueUrl, { cache: 'no-cache' })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            showGiggles(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

// function to get jokes to show in browser
function showGiggles(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = "";
    resultsContainer.textContent = data.joke;
    console.log(resultsContainer);
}

// event
giggleButton.addEventListener('click', mommaAPI);