// find a div with id #search-result-cards that contains the "cards"(html for displaying movies)
let results_container = $("#search-result-cards")

let card_template = $(".movie-card").detach() // takes out a card div from ejs and saves for later in memory (sort of)

// function puts a new "card"(html div for displaying a movie) into the results_container div
function addCard(movie) { // there go searchResults, later

    let new_card = card_template.clone() // makes a copy of card template, puts in new_card

    // change movie-img, different to others cause we change attributes, not the content of the div
    let movie_img = new_card.find(".movie-img")
    movie_img.attr("src", `https://image.tmdb.org/t/p/w500${movie.poster_path}`)

    // change movie-title
    let movie_title = new_card.find(".movie-title")
    movie_title.html(movie.title) 

    // change movie-description
    // let movie_description = new_card.find(".movie-description")
    // movie_description.html(movie.overview)

    // change movie-rate-link
    let movie_rate_link = new_card.find(".movie-rate-link")
    movie_rate_link.attr("href", `/details/${movie.id}`)

    // let new_card = $(`<div>Name: ${movie.title} (${movie.release_date})</div>`)
    results_container.append(new_card)
}

// the main function
// makes use of other small functions

// it finds what you entered in the search field,
// puts it into query,
// sends to API,
// displays results

function displayMoviesResponse(response) {

    let results = response.results

    results_container.empty() // empty the container (div) with the search results

    for (let i = 0; i < 12 && i < results.length; i++) { // seed it again with new search results, not more than 1-12, to get all results searchResults.length
        addCard(results[i])
    }
}

async function getMoviedbJSON(api_method_path, new_options) {
    let api_url = "https://api.themoviedb.org/3/" + api_method_path
    
    let default_options = { // this contains options that we won't need to specify for every request anymore
        api_key: "ba94bd1616bc602ae68a60a2d0e27f05",
        language: "en-US", // optional
        //page: "1", // optional
        //include_adult: "false" // optional
    }

    let all_options = {} // it will store options that we send to the API

    // object.assign: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

    Object.assign(all_options, default_options) // copy default options
    Object.assign(all_options, new_options) // copy new options. If some options are the same with default ones, we overwrite them.

    let response = await $.getJSON(api_url, all_options) // make the request
    return response
}

async function showMoviesWhenFiltersChange() {
    let filter_vals = []

    let filters = $(".all-filters select")

    // https://api.jquery.com/each/

    filters.each( function() {
        let filter_id = $(this).val()
        if (filter_id !== "") {
            filter_vals.push(filter_id)
        }
    })
    console.log(filter_vals)

    let discoverResponse = await getMoviedbJSON("discover/movie", {
        sort_by: "popularity.desc"
    })


}

async function loadDiscoverFilters(){
    let genres_response = await getMoviedbJSON("genre/movie/list")
    let genres = genres_response.genres
    
    let genre_filter_template = $(".genre-filter").detach() // takes out a dropdown div from ejs and saves for later

    let template_options_list = genre_filter_template.find("select") // find select tag

    template_options_list.empty() // and delete all options inside

    let empty_option = $("<option selected></option>") // create empty option

    template_options_list.append(empty_option) // to show empty option in dropdown first

    // to fill dropdowns with info from API

    for (let i = 0; i < genres.length; i++) {
        let genre = genres[i];
        let genre_option = $("<option></option>")
        genre_option.attr("value", genre.id)
        genre_option.html(genre.name)
        template_options_list.append(genre_option)
    }

    let all_filters_div = $(".all-filters")
    for (let i = 0; i < 3; i++){
        let genre_filter = genre_filter_template.clone()
        all_filters_div.append(genre_filter)
        genre_filter.on("change", showMoviesWhenFiltersChange)
    }
}

async function displayMoviesOnPageLoad() {
    // example of the request link to MovieDB:
    // https://api.themoviedb.org/3/discover/movie?api_key=ba94bd1616bc602ae68a60a2d0e27f05&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

    let discoverResponse = await getMoviedbJSON("discover/movie", {
        sort_by: "popularity.desc"
    })

    // let discoverResponse = await $.getJSON( // discoverResponse is what we get from discover/movie API
    //     "https://api.themoviedb.org/3/discover/movie", { // this is a beginning of a request to MovieDB
    //     api_key: "ba94bd1616bc602ae68a60a2d0e27f05", // this is the rest of the request
    //     language: "en-US", // optional
    //     sort_by: "popularity.desc",
    //     page: "1", // optionalv
    //     include_adult: "false" // optional
    // })

    displayMoviesResponse(discoverResponse)
}

async function clickSearchGetResults() {
    let searchField = $("#search-field") // find search field
    let searchText = searchField.val() // extract what's typed into it
    // console.log(searchText)

    let searchResponse = await getMoviedbJSON("search/movie", {query: searchText})

    // let searchResponse = await $.getJSON( // searchResponse is what we get from API, the whole thing

    //     // example of the request link to MovieDB:
    //     // https://api.themoviedb.org/3/search/movie?api_key=ba94bd1616bc602ae68a60a2d0e27f05&language=en-US&query=pride&page=1&include_adult=false

    //     "https://api.themoviedb.org/3/search/movie", { // this is a beginning of a request to MovieDB
    //     api_key: "ba94bd1616bc602ae68a60a2d0e27f05", // this is the rest of the request
    //     language: "en-US", // optional
    //     query: searchText,
    //     page: "1", // optional
    //     include_adult: "false" // optional
    // })

    displayMoviesResponse(searchResponse)
}

// when you click Search,
// this calls for clickSearchGetResults()
// which does the rest

let searchButton = $("#search-button")
searchButton.on("click",
    (event) => {
        event.preventDefault()
        clickSearchGetResults()
        console.log("working");

    })

// same thing NOT with jQuery:

// let searchButton = document.getElementById("search-button")
// searchButton.addEventListener("click", (event) => {
//     event.preventDefault()
//     clickSearchGetResults()
// })
loadDiscoverFilters()
displayMoviesOnPageLoad()
