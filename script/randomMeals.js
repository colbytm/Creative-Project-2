//let displayDivs = document.getElementsByClassName("picture");
const recipeArray = [52795, 52777, 52973, 52960];
let boxesDiv = document.getElementById("boxesInfo");

// load listener for 4 bottom squares
window.addEventListener("load", function(event){
    // call populate function
    populateResults();
});

const sendBoxRequest = (searchVal, i) => {
    // create url
    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + searchVal;
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
        displayBoxResults(json, i);
    });
}

const displayBoxResults = (results, i) => {
    let resultsDiv = "";
    resultsDiv += "<div class = picture>"
    resultsDiv += "<img src = " + results.meals[0].strMealThumb + ">";

    resultsDiv += "<div class = place-info>"
    resultsDiv += "<p>" + results.meals[0].strMeal + "</p>";
    resultsDiv += "</div>"

    resultsDiv += "</div>";
    boxesDiv.innerHTML += resultsDiv;

    /*
    // create image and image url- append to child of results div
    let foodImg = document.createElement("img");
    let imgSrc = results.meals[0].strMealThumb;
    foodImg.src = imgSrc;
    document.getElementsByClassName("picture")[i].appendChild(foodImg);
    */

}

const populateResults = () => {
    // fill 4 windows with meal info
    let results = "";
    // array index = chicken, pasta, soup, salad
    for (let i=0; i < recipeArray.length; i++) {
        sendBoxRequest(recipeArray[i]); 
    }
}
