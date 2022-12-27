/* ---------------------------------------------------------------------------------------------- */
/*                       Initialized search button and cancel search button                       */
/* ---------------------------------------------------------------------------------------------- */
const fetchMoviesButton = document.getElementById("md-searchBtn");
const cancelFetchButton = document.getElementById("md-searchBox");

/* ---------------------------------------------------------------------------------------------- */
/*                                  fetch for horizontal scroll a                                 */
/* ---------------------------------------------------------------------------------------------- */
let controller = null;
document.getElementById("md-searchBtn").addEventListener("click", async () => {
  controller = new AbortController();
  try {
    console.log("Request started...");
    const response = await fetch('https://www.omdbapi.com/?t='+document.getElementById("md-searchBox").value+'&apikey=YOUR_API_KEY', {
      signal: controller.signal
    });
    const movies = await response.json();
    console.log(movies); // Was previousely console.log(`Fetched movies: ${JSON.stringify(movies)}`);
    populateHscrollA(movies);
  } catch (error) {
    console.log(`Fetch error: ${error.name}`);
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


/* -------------------------------------------------------------------------- */
/*          Function that populates the "horizontal-scroll-a" that is         */
/*                      present in the hellomd.html file                      */
/* -------------------------------------------------------------------------- */
function populateHscrollA(movies){
  html = '<div class="col-6 grid-item">  <div class="product-grid">      <div class="product-image">          <a href="https://v2.vidsrc.me/embed/' + movies.imdbID + '/" class="image"><img src='+movies.Poster+'></a>          <span class="product-sale-label-right"><b>' + movies.imdbRating + ' </b><i class="fas fa-star"></i></span>          <span class="product-sale-label-left">' + movies.Rated + '</span>      </div>      <div class="product-content">          <h3 class="title"><a href="https://v2.vidsrc.me/embed/' + movies.imdbID + '/">' + movies.Title + '</a></h3>          <div class="price">            ' + movies.Released + '          </div>          <a class="add-to-cart" href="https://v2.vidsrc.me/embed/' + movies.imdbID + '/">            <i class="fas fa-play-circle"></i>watch now</a>      </div>  </div></div>';
  document.querySelector('.horizontal-scroll-a').children[1].innerHTML = html;
}