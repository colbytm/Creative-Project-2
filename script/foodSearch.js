// declare variables
let submitButton = document.getElementById("submitSearch");
let searchResultsDiv = document.getElementById("search-results");

// click listener for submit button
submitButton.addEventListener("click", function(event){
    // prevent default action for the form
    event.preventDefault();

    // get search value
    const searchValue = document.getElementById("foodSearch").value;

    // if value is not empty call send request function
    if(searchValue !== ""){
        sendRequest(searchValue);
    }


});


const sendRequest = searchVal => {
    // create url
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchVal;
    fetch(url)
    .then(function(response){
        // if response wasn't successful return error
        if(response.status != 200){
            return {
                text: "Error calling the Numbers API service: " + response.statusText
            }
        }
        return response.json();
    }).then(function(json){
        console.log(json);
        // display results
        displayResults(json);
    });
}

const displayResults = results => {
    // create image and image url- append to child of results div
    let foodImg = document.createElement("img");
    let imgSrc = results.meals[0].strMealThumb;
    foodImg.src = imgSrc;
    searchResultsDiv.appendChild(foodImg);
}

