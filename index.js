function find_movie(movie_name) {
    openDialog(false);
    if (movie_name == "") {
        alert("Please Enter the Movie Name");
    } else {
        httpRequest = new XMLHttpRequest();
        url = "https://www.omdbapi.com/?t=" + movie_name + "&apikey=333e06b5";
        httpRequest.open("GET", url);
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                movie_data = JSON.parse(this.responseText);
                movie_poster = movie_data.Poster;
                response = movie_data.Response;
                if (response == "True" && movie_poster != "N/A") {
                    set_data(movie_data, movie_poster);
                } else if (response == "True" && movie_poster == "N/A") {
                    alert("Movie found but Poster is not available");
                    set_data(movie_data, "Images/no_poster.gif");
                } else {
                    showResult(false);
                    openDialog(true);
                }
            }
        };
    }
}

function show_image(src, width, height, alt) {
    var img = new Image();
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    document.getElementById("poster").src = img.src;
}

function set_data(movie_data, movie_poster) {
    showResult(true);
    show_image(movie_poster, 400, 400, "movie poster");
    document.getElementById("movie-title").innerHTML = "<b>Movie Title: </b>" + movie_data.Title;
    document.getElementById("title").innerHTML = movie_data.Title;
    document.getElementById("year").innerHTML = movie_data.Year;
    document.getElementById("release-date").innerHTML = movie_data.Released;
    document.getElementById("genre").innerHTML = movie_data.Genre;
    document.getElementById("productions").innerHTML = movie_data.Production;
    document.getElementById("director").innerHTML = movie_data.Director;
    document.getElementById("writer").innerHTML = movie_data.Writer;
    document.getElementById("cast").innerHTML = movie_data.Actors;
    document.getElementById("story").innerHTML = movie_data.Plot;
    document.getElementById("language").innerHTML = movie_data.Language;
    document.getElementById("country").innerHTML = movie_data.Country;
    document.getElementById("awards").innerHTML = movie_data.Awards;
    document.getElementById("imdb-id").innerHTML = movie_data.imdbID;
    document.getElementById("rating").innerHTML = movie_data.imdbRating;
    document.getElementById("box-office").innerHTML = movie_data.BoxOffice;
}

function showResult(show) {
    if (show) {
        document.getElementById("movie-table").style.display = "table";
        document.getElementById("movie_result").style.visibility = "hidden";
        document.getElementById("movie_result").style.display = "none";
    } else {
        document.getElementById("movie-table").style.display = "none";
        document.getElementById("movie_result").style.display = "block";
        document.getElementById("movie_result").style.visibility = "visible";
    }
}

function openDialog(open) {
    document.getElementById("movie_result_dialog").open = open;
}

function try_again_click() {
    document.getElementById("movie_result_dialog").open = false;
    document.getElementById("movie_name").value = "";
}