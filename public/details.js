async function getMovie() {
  // get movie ID from url
  let pathname = window.location.pathname;
  let pathname_components = pathname.split("/");

  console.log(pathname_components);

  let pathname_components_length = pathname_components.length;
  let pathname_components_last_index = pathname_components_length - 1;
  let movieId = pathname_components[pathname_components_last_index];

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

// Ratings system

// hardcoded
// initial Ratings need to actually come from db
// should get all ratings for that movie and do Math to provide a current average rating
const ratings = {
  initial_rating: 3.6,
};

// Total Stars
const starsTotal = 5;

// Run getRatings when DOM loads
document.addEventListener("DOMContentLoaded", getRatings);

// Form Element
const ratingControl = document.getElementById("rating-control");

// Get ratings
function getRatings() {
  for (let rating in ratings) {
    // Get percentage
    const starPercentage = (ratings[rating] / starsTotal) * 100;

    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    // Set width of stars-inner to percentage
    document.querySelector(
      `.${rating} .stars-inner`
    ).style.width = starPercentageRounded;

    // Add number rating
    document.querySelector(`.${rating} .number-rating`).innerHTML =
      ratings[rating];
  }
}

// need to add function that pushes to rating to the db, then recalls the function to show the updated rating for the movie
async function getData() {
  try {
    let data = await $.getJSON("/checkdb");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function postData() {
  try {
    await $.post("/checkdb");
  } catch (e) {
    console.log(e);
  }
}
// let userID = 1;

// document.getElementById("rate-btn").onclick = function () {
//   if (userID)
//     pool.query(
//       `INSERT INTO users (movie_id, rating, user_id)
// VALUES ($1, $2, $3)`,
//       [movieID, rating, userID],
//       (err, results) => {
//         if (err) {
//           throw err;
//         }
//         console.log(movieID, rating, userID);
//         req.flash("success_msg", "Movie Rated!");
//         res.redirect("/login");
//       }
//     );
// };

// need to add check if user is logged in, else prevent rating and encourage login/signup (maybe just alert - "you need to be logged in to do that"?)
getMovie();
getData();
postData();
