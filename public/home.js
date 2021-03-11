
// let searchButton = document.getElementById("search-button")
// searchButton.addEventListener("click", (event) => {
//     event.preventDefault()
//     console.log($)
// })

// below is the same, but with jQuery:

let results_container = $("#search-result-cards")

function addCard(movie) {
    let new_card = $(`<div>Name: ${movie.title} (${movie.release_date})</div>`)
    results_container.append(new_card)
}

async function clickSearchGetResults() {
    let searchField = $("#search-field")
    let searchText = searchField.val()
    console.log(searchText)
    
    let searchResponse = await $.getJSON(
        "https://api.themoviedb.org/3/search/movie", {
            api_key: "ba94bd1616bc602ae68a60a2d0e27f05",
            // language: "en-US",
            query: searchText,
            // page: "1",
            // include_adult: "false"
    })
    let searchResults = searchResponse.results

    results_container.empty()
    for (let i = 0; i < searchResults.length; i++) {
        addCard(searchResults[i])
    }

    console.log(searchResults)
}

let searchButton = $("#search-button")
searchButton.on("click",
    (event) => {
        event.preventDefault()
        clickSearchGetResults()
    })