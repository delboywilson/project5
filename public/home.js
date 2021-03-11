// find a div with id #search-result-cards that contains the "cards"(html for displaying movies)
let results_container = $("#search-result-cards")

// function puts a new "card"(html div for displaying a movie) into the results_container div
function addCard(movie) {
    let new_card = $(`<div>Name: ${movie.title} (${movie.release_date})</div>`)
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

    // https://api.themoviedb.org/3/search/movie?api_key=ba94bd1616bc602ae68a60a2d0e27f05&language=en-US&query=pride&page=1&include_adult=false
    // example of the request link to MovieDB

        "https://api.themoviedb.org/3/search/movie", { // this is a beginning of a request to MovieDB
            api_key: "ba94bd1616bc602ae68a60a2d0e27f05", // this is the rest of the request
            language: "en-US", // optional
            query: searchText,
            page: "1", // optional
            include_adult: "false" // optional
    })
    let searchResults = searchResponse.results // searchResults is an array of objects where info on each movie is an object

    results_container.empty() // empty the container (div) with the search results

    for (let i = 0; i < searchResults.length; i++) { // seed it again with new search results
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
