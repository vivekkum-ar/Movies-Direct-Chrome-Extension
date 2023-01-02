/* ---------------------------------------------------------------------------------------------- */
/*                       Initialized search button and cancel search button                       */
/* ---------------------------------------------------------------------------------------------- */
const fetchMoviesButton = document.getElementById("md-searchBtn");
const cancelFetchButton = document.getElementById("md-searchBox");

/* ---------------------------------------------------------------------------------------------- */
/*                    defaultMovie JSON is used when local storage is empty for                   */
/*                    running populateHscrollA so that first grid is not empty                    */
/* ---------------------------------------------------------------------------------------------- */
let defaultMovie = {
  "Title": "Top Gun: Maverick",
  "Year": "2022",
  "Rated": "PG-13",
  "Released": "27 May 2022",
  "Runtime": "130 min",
  "Genre": "Action, Drama",
  "Director": "Joseph Kosinski",
  "Writer": "Jim Cash, Jack Epps Jr., Peter Craig",
  "Actors": "Tom Cruise, Jennifer Connelly, Miles Teller",
  "Plot": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to ...",
  "Language": "English",
  "Country": "United States",
  "Awards": "4 wins & 16 nominations",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "8.4/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "96%"
    },
    {
      "Source": "Metacritic",
      "Value": "78/100"
    }
  ],
  "Metascore": "78",
  "imdbRating": "8.4",
  "imdbVotes": "435,970",
  "imdbID": "tt1745960",
  "Type": "movie",
  "DVD": "22 Aug 2022",
  "BoxOffice": "$716,498,761",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

/* -------------------------------------------------------------------------- */
/*           Movie search history stored in chrome.storage.local is           */
/*                    called for filling the first hscroll                    */
/* -------------------------------------------------------------------------- */
chrome.storage.local.get(/* String or Array */['imdbID', 'Poster', 'imdbRating', 'Rated', 'Title', 'Released', 'Type'], function (items) {
  if (items.Title === undefined) {   //if not stored then load default movie
    document.getElementById("message-new-a").innerText = "You might like: " + defaultMovie.Title;
    populateHscrollA(defaultMovie);
    // console.log("populateHscrollA(defaultMovie);")
  }
  else {   // if saved load movies from history
    document.getElementById("message-new-a").innerText = "You recently searched for: " + items.Title;
    populateHscrollA(items);
    // console.log(items.Title);
  }
});

/* ---------------------------------------------------------------------------------------------- */
/*                                  fetch for horizontal scroll a                                 */
/* ---------------------------------------------------------------------------------------------- */
let controller = null;
document.getElementById("md-searchBtn").addEventListener("click", async () => {
  if (document.getElementById("md-searchBox").value === "") {
    document.getElementById("errorShake").classList.toggle("d-none");
  } else {
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
  }
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
function populateHscrollA(movies) {
  chrome.storage.local.set({ "imdbID": movies.imdbID, "Poster": movies.Poster, "imdbRating": movies.imdbRating, "Rated": movies.Rated, "Title": movies.Title, "Released": movies.Released, "Type": movies.Type }, function () {
    //  movie search data has been saved 
    // console.log("saved");
  });
  html = '<div class="col-6 grid-item">  <div class="product-grid">      <div class="product-image">          <a href="https://v2.vidsrc.me/embed/' + movies.imdbID + '/" class="image"><img src=' + movies.Poster + '></a>          <span class="product-sale-label-right"><b>' + movies.imdbRating + ' </b><i class="fas fa-star"></i></span>          <span class="product-sale-label-left">' + movies.Rated + '</span>      </div>      <div class="product-content">          <h3 class="title"><a href="https://v2.vidsrc.me/embed/' + movies.imdbID + '/">' + movies.Title + '</a></h3>          <div class="price">            ' + movies.Released + '          </div>          <a class="add-to-cart" href="https://v2.vidsrc.me/embed/' + movies.imdbID + '/">            <i class="fas fa-play-circle"></i>watch now</a>      </div>  </div></div>';
  buyMeACoffee = '<div class="col-6 d-flex justify-content-center align-items-center">        <a href="https://www.buymeacoffee.com/vivekkum.ar" target="_blank">  <button href="https://www.buymeacoffee.com/vivekkum.ar" type="button" class="d-flex align-items-center rounded-pill btn btn-primary poppins-gfont" style="font-size: smaller;">            <i class="fs-5 fa-solid fa-mug-hot"></i>            <p class="mb-0 ps-1 fw-bold"> Buy me a coffee !</p>          </button></a>        </div>';
  document.querySelector('.horizontal-scroll-a').children[0].innerHTML = html + buyMeACoffee;
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