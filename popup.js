const fetchMoviesButton = document.getElementById("md-searchBtn");
const cancelFetchButton = document.getElementById("md-searchBox");


let controller = null;

document.getElementById("md-searchBtn").addEventListener("click", async () => {
  controller = new AbortController();
  try {
    log("Request started...");
    const response = await fetch('https://www.omdbapi.com/?t='+document.getElementById("md-searchBox").value+'&apikey=YOUR_API_KEY', {
      signal: controller.signal
    });
    const movies = await response.json();
    console.log(movies); // Was previousely console.log(`Fetched movies: ${JSON.stringify(movies)}`);
  } catch (error) {
    log(`Fetch error: ${error.name}`);
  }
  controller = null;
});

cancelFetchButton.addEventListener("click", () => {
  if (controller) {
    controller.abort();
  }
});

/* -------------------------------------------------------------------------- */
/*           Temporary log function tat logs the response from fetch          */
/* -------------------------------------------------------------------------- */
function log(message) {
  document.getElementById("message-new").innerText = message;
}


