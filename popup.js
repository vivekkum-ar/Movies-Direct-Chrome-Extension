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
    const response = await fetch('https://www.omdbapi.com/?t=' + document.getElementById("md-searchBox").value + '&apikey=' + omdb_api_key, {
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
  document.querySelector('.horizontal-scroll-a').children[0].innerHTML = html;
}

/* -------------------------------------------------------------------------- */
/*    Seperate other fetch for horizontal scroll b because it needs to run    */
/*                       as soon as the page initializes                      */
/* -------------------------------------------------------------------------- */
let controller2 = null;
async function fetchYouMightLikeMovies() {
  controller2 = new AbortController();
  try {
    console.log("2Request started...");
    const response2 = await fetch(you_might_like_json_link_here , {
      signal: controller2.signal
    });
    const movies2 = await response2.json();
    console.log(movies2); // Was previousely console.log(`Fetched movies: ${JSON.stringify(movies)}`);
    populateHscrollB(movies2);  //setTimeout(populateHscrollB(movies2), 1000);
  } catch (error) {
    console.log(`2Fetch error: ${error.name}`);
  }
  controller2 = null;  //we can controller2.abort for cancelling the request. But we didnt need to.
}
/* --------- fetchYouMightLikeMovies function runs on page initialization --------- */
fetchYouMightLikeMovies();

/* ---------------------------------------------------------------------------------------------- */
/*                    Function that populates the "horizontal-scroll-b" that is                   */
/*                                present in the hellomd.html file                                */
/* ---------------------------------------------------------------------------------------------- */
function populateHscrollB(movies2){
  html2 = "";
  for (let index = 0; index < 25; index++) {
    // const element = movies2[index];
    html2 += '<div class="col-6 grid-item">  <div class="product-grid">      <div class="product-image">          <a href="https://v2.vidsrc.me/embed/' + movies2[index].imdbID + '/" target="_blank" class="image"><img src='+movies2[index].Poster+'></a>          <span class="product-sale-label-right"><b>' + movies2[index].imdbRating + ' </b><i class="fas fa-star"></i></span>          <span class="product-sale-label-left">' + movies2[index].Rated + '</span>      </div>      <div class="product-content">          <h3 class="title"><a href="https://v2.vidsrc.me/embed/' + movies2[index].imdbID + '/" target="_blank">' + movies2[index].Title + '</a></h3>          <div class="price">            ' + movies2[index].Released + '          </div>          <a class="add-to-cart" href="https://v2.vidsrc.me/embed/' + movies2[index].imdbID + '/" target="_blank">            <i class="fas fa-play-circle"></i>watch now</a>      </div>  </div></div>';
  }
  document.querySelector('.horizontal-scroll-b').children[0].innerHTML = html2;
}