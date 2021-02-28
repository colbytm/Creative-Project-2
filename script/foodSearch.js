// declare variables
let submitButton = document.getElementById("submitSearch");
let searchResultsDiv = document.getElementById("search-results");

// for results
let recipeImgDiv = document.getElementById("recipe-imageID");
let ingredientsDiv = document.getElementById("ingredientsID");
let instructionsDiv = document.getElementById("instructionsID");
let instructionsP = document.getElementById("instructionsParagraph");
let recipeName = document.getElementById("recipeName");

// click listener for submit button
submitButton.addEventListener("click", function(event){
    // prevent default action for the form
    event.preventDefault();

    // get search value
    const searchValue = document.getElementById("foodSearch").value;

    // if value is not empty call send request function
    if(searchValue === "random"){
        searchRandom();
    }
    else if(searchValue !== ""){
        sendRequest(searchValue);
    }
});


const searchRandom = () => {
    // create url
    const url = "https://www.themealdb.com/api/json/v1/1/random.php"
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
        if(json.meals === null){
            displayError();
        }
        console.log(json);
        // display results
        displayResults(json);
    });
}

const displayResults = results => {
    searchResultsDiv.style.display = "block";
    // create image and image url- append to child of results div
    let dispResults = "";
    dispResults += "<img src = " + results.meals[0].strMealThumb + " alt = food picture>";
    recipeImgDiv.innerHTML = dispResults;
    recipeName.innerHTML = results.meals[0].strMeal;
    searchResultsDiv.scrollIntoView();
    var ingred = getIngredients(results);
    var measure = getMeasurements(results);

    let ingredResults = "";

    ingredResults += "<h4>Ingredients</h4>";
    ingredResults += "<hr>";
    for(let i = 0; i < ingred.length; i++){
        ingredResults += "<p>" + ingred[i] + ": " + measure[i] + "</p>"
    }
    ingredientsDiv.innerHTML = ingredResults;
    let instructions = results.meals[0].strInstructions;
    instructionsP.innerHTML = instructions;
    instructionsP.style.lineHeight = "1.6";
}

const getIngredients = results =>{
    let arr = [];
    var ingredientLocation = "strIngredient";
    for(var key in results.meals[0]){
        let val = results.meals[0][key];
        if(key.includes(ingredientLocation)){
            if(val !== "" && val !== null){
                arr.push(val);
            }
        }
    }
    return arr;
}

const getMeasurements = results =>{
    let arr = [];
    var measureLocation = "strMeasure";
    for(var key in results.meals[0]){
        let val = results.meals[0][key];
        if(key.includes(measureLocation)){
            if(val !== "" && val !== null){
                arr.push(val);
            }
        }
    }
    return arr;
}

const displayError = () =>{
    searchResultsDiv.scrollIntoView();
    searchResultsDiv.style.display = "block";
    searchResultsDiv.innerHTML = "No results found. Please refresh page and try searching again";
}

// POPULAR RECIPES

//let displayDivs = document.getElementsByClassName("picture");
const recipeArray = [52795, 52777, 52973, 52960];
let boxesDiv = document.getElementById("boxesInfo");
let boxResults = [];

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
        boxResults.push(json);
    });
}

const displayBoxResults = (results, i) => {
    let resultsDiv = "";
    let div = document.createElement("div");
    resultsDiv += "<div class = picture>"
    resultsDiv += "<img src = " + results.meals[0].strMealThumb + ">";

    resultsDiv += "<div class = place-info>"
    resultsDiv += "<p>" + results.meals[0].strMeal + "</p>";
    resultsDiv += "</div>"

    resultsDiv += "</div>";
    div.innerHTML = resultsDiv;
    div.addEventListener("click", function(){
        displayResults(results);
    });
    boxesDiv.appendChild(div);
}

const populateResults = () => {
    // fill 4 windows with meal info
    let results = "";
    // array index = chicken, pasta, soup, salad
    for (let i=0; i < recipeArray.length; i++) {
        sendBoxRequest(recipeArray[i]); 
    }
}
