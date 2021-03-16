function getMovieId() {
  let pathname = window.location.pathname;
  let pathname_components = pathname.split("/");
  let pathname_components_length = pathname_components.length;
  let pathname_components_last_index = pathname_components_length - 1;
  let movieId = pathname_components[pathname_components_last_index];
  return movieId;
}

async function getMovie() {
  // get movie ID from url
  let movieId = getMovieId();

  // get movie details from API
  let movie = await $.getJSON(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ba94bd1616bc602ae68a60a2d0e27f05&language=en-US`
  );
  console.log(movie);

  // get each detail, send to ejs
  let img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  $(".movie-poster").attr("src", img);
  $(".movie-title").html(movie.title);
  let genre = movie.genres[0].name;
  $(".genre").html(genre);
  $(".release-date").html(movie.release_date);
  $(".overview").html(movie.overview);
}

async function averageRating() {
  try {
    let movieId = getMovieId();
    let average = await $.getJSON("/averageRating/" + movieId);
    console.log(average);
    displayRating(average, ".initial_rating");
  } catch (e) {
    console.log(e);
  }
}

// Total Stars
const starsTotal = 5;

// Form Element
const ratingControl = document.getElementById("rating-control");

// Get ratings
function displayRating(rating, ratingSelector) {
  // Get percentage
  const starPercentage = (rating / starsTotal) * 100;

  // Round to nearest 10
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  // Set width of stars-inner to percentage
  document.querySelector(
    `${ratingSelector} .stars-inner`
  ).style.width = starPercentageRounded;

  // Add number rating
  document.querySelector(`${ratingSelector} .number-rating`).innerHTML = rating;
}

// need to add function that pushes to rating to the db, then recalls the function to show the updated rating for the movie
async function getData() {
  try {
    let data = await $.getJSON("/ratings");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

// logic for rendering ratings block below

let notLoggedInBlock = $(".state-not-logged");
let loggedInNotRated = $(".state-logged-in-not-rated");
let loggedInAndRated = $(".state-logged-and-rated");

function showUserRating(rating){
  let userRatingSpan = loggedInAndRated.find(".user-rating-span")
  userRatingSpan.html(rating)
  loggedInAndRated.show()
}

async function updateRatingBlock() {
  
  notLoggedInBlock.hide();
  loggedInNotRated.hide();
  loggedInAndRated.hide();

  let user = await $.getJSON("/userinfo");   
  let loggedIn = user;
  
  if (!loggedIn) {
    notLoggedInBlock.show();
  } else {
    let movieId = getMovieId()
    let userMovieRating = await $.getJSON("/currentUserRating/" + movieId)
    let alreadyRated = userMovieRating
  
    if (!alreadyRated) {
      loggedInNotRated.show();
    } else {
      showUserRating(userMovieRating)
    }
  }
}

let rateButton = $("#rate-btn")
rateButton.on("click",
    (event) => {
        event.preventDefault()
        console.log("working")
        postData()
    })

async function postData() {
    try {
      let movieId = getMovieId();
      let ratingFieldValue = $("#rating-control").val()
        await $.post("/ratings", {movie_id: movieId, rating: ratingFieldValue});
        loggedInNotRated.hide();
        showUserRating(ratingFieldValue);
        // loggedInAndRated.hide();
        console.log("it works");
  } catch (e) {
    console.log(e);
  }
}

// need to add check if user is logged in, else prevent rating and encourage login/signup (maybe just alert - "you need to be logged in to do that"?)
getMovie();
//getData();
postData();
averageRating();
updateRatingBlock();