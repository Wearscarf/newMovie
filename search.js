$(function(){
    $("#search").on("click", function(){
        var keyword = $("form-control").val()
        console.log(keyword);
        if(keyword == "" || keyword == null){
            alert("Please enter a word");
        }
        findMovie(keyword,2);
    });
});

const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const API_KEY = "21c2f2edc4b87ed7ca1bab78ecee5012";

function findMovie(keyword,page){
    $.ajax({
        url: MOVIE_SEARCH_URL + 
         "language=" + "en-US" +
         "&query=" + keyword + 
         "&page=" + page + 
         "&include_adult=" + "false",
        type: "GET", 
        data: { "api_key":  API_KEY},
        dataType: "json",
        timeout: 1000,
        success: successCallback,
        error: errorCallback
       });
}

function successCallback(result, status, xhr){
    var resultHTML = $("#search-result");
    resultHTML.empty();
    var blocks = getResultBlocks(result("results"));
}

function errorCallback(error, status, xhr){
    $("#message").html("Result: " + status + " " + error);
}

function getResultBlocks(result){
    var res = [];
    $.each(result, function(){
        var movieImage = this["poster_path"] === null ? "failed-Image.png" : MOVIE_IMAGE_URL + this["poster_path"];
        var movieTitle = this["title"];
        var movieDescription = this["overview"];
        var block = 
        `
            <div class="movie-block clearfix">
                <img class="movie-poster float-left" src=${movieImage}/>
                <h3 class="movie-title" ${movieTitle}/>
                <p class="movie-description">${movieDescription}</p>
            </div>
        `
        res.push(block);
    })
}