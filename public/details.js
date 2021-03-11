async function getMovie() {
  let pathname = window.location.pathname;
  let pathname_components = pathname.split("/");

  console.log(pathname_components);
  let pathname_components_length = pathname_components.length;
  let pathname_components_last_index = pathname_components_length - 1;
  let movieId = pathname_components[pathname_components_last_index];

  let result = await $.getJSON(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ba94bd1616bc602ae68a60a2d0e27f05&language=en-US`
  );
  console.log(result);

  let output = `
  <div class ="row">
    <div class="col-md-6">
      <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="thumbnail">
    </div>
    <div class="col-md-4">
      <ul class="list-group">
        <li class="list-group-item"><h2>${result.title}</h2></li>
        <li class="list-group-item"><strong>Genre:</strong> ${result.genres[0].name}</li>
        <li class="list-group-item"><strong>Release Date:</strong> ${result.release_date}</li>
      </ul>
      <hr>
      <div class="well">
      <h3>Overview</h3>
      ${result.overview}
      <hr>
      RATING FUNCTION GOES HERE
    </div>
    <a href="/home" class="btn btn-default">Search and rate another!</a>
    </div>
  </div>
  `;
  $("#movie").html(output);

  // let img = "https://image.tmdb.org/t/p/w500${result.poster_path}";
  // $("#test").html(img);
}
