$(function(){
    $("#search").on("click", function(){
        var keyword = $("#target").val()
        if(keyword == "" || keyword == null){
            alert("Please enter a word");
        }
        findMovie(keyword,2);
    });
});

const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "21c2f2edc4b87ed7ca1bab78ecee5012";

function findMovie(keyword,page){
    $.ajax({
        url: MOVIE_SEARCH_URL,
        type: "GET", 
        data: { "api_key":  API_KEY, "language": "en-US", "query": keyword},
        dataType: "json",
        timeout: 1000,
        success: successCallback,
        error: errorCallback
       });
}

function successCallback(result, status, xhr){
    $(".container").empty();
    //var blocks = getResultBlocks(result["results"]);
    results = getResultBlocks(result["results"])   
    $.each(results, function(){
        $(".container").append(this);
    })
}

function errorCallback(error, status, xhr){
    console.log("error");
}

function getResultBlocks(result){
    results = []
    // result is an array of JSON. Each element in result array is an JSON.
    $.each(result, function() {
        var movieImage = this["poster_path"] === null ? "failed-Image.png" : MOVIE_IMAGE_URL + this["poster_path"];
        console.log(movieImage);
        var movieTitle = this["title"];
        var movieDescription = this["overview"];
        var block = 
        `
            <div class="row">
                <div class="col-4">
                  <img src=${movieImage}/>
                </div>
                <div class="col-8">
                  <h1>${movieTitle}</h1>
                  <p>${movieDescription}</p>
                </div>
              </div>
        `
        results.push(block);
    })
    return results;
}