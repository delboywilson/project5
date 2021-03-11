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
    let movie_description = new_card.find(".movie-description")
    movie_description.html(movie.overview)

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

async function clickSearchGetResults() {
    let searchField = $("#search-field") // find search field
    let searchText = searchField.val() // extract what's typed into it
    // console.log(searchText)
    
    let searchResponse = await $.getJSON( // searchResponse is what we get from API, the whole thing

    // example of the request link to MovieDB:
    // https://api.themoviedb.org/3/search/movie?api_key=ba94bd1616bc602ae68a60a2d0e27f05&language=en-US&query=pride&page=1&include_adult=false

        "https://api.themoviedb.org/3/search/movie", { // this is a beginning of a request to MovieDB
            api_key: "ba94bd1616bc602ae68a60a2d0e27f05", // this is the rest of the request
            language: "en-US", // optional
            query: searchText,
            page: "1", // optional
            include_adult: "false" // optional
    })
    let searchResults = searchResponse.results // searchResults is an array of objects where info on each movie is an object

    results_container.empty() // empty the container (div) with the search results

    for (let i = 0; i < 12 && i < searchResults.length; i++) { // seed it again with new search results, not more than 1-12, to get all results searchResults.length
        addCard(searchResults[i])
    }

    console.log(searchResults)
}

// when you click Search,
// this calls for clickSearchGetResults()
// which does the rest

let searchButton = $("#search-button")
searchButton.on("click",
    (event) => {
        event.preventDefault()
        clickSearchGetResults()
    })

// same thing NOT with jQuery:

// let searchButton = document.getElementById("search-button")
// searchButton.addEventListener("click", (event) => {
//     event.preventDefault()
//     clickSearchGetResults()
// })
