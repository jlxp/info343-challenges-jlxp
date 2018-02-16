// @ts-check
"use strict";

const SEARCH_API = "https://api.themoviedb.org/3/";
const API_Key = "?api_key=a818399a038193422be3469fc688fc10";

const PROGRESS_BAR = document.querySelector(".progress");
const ERROR_ALERT_DIV = document.querySelector(".alert-danger");  
const RESULTS_DIV = document.querySelector("#results");
const DISCOVER_API = SEARCH_API + "discover/movie" + API_Key + "&language=en-US&page=";

let state = {
    currentPage: 1,
    currentApi: undefined,
    end: ""
};

/**
 * Handles responses from the fetch() API.
 * @param {Response} response 
 */
function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return response.json()
            .then(function(err) {
                throw new Error(err.errorMessage);
            });
    }
}

/**
 * Handles errors that occur while fetching
 * @param {Error} err 
 */
function handleError(err) {
    console.error(err);
    ERROR_ALERT_DIV.textContent = err.message;
    ERROR_ALERT_DIV.classList.remove("d-none");
}

function renderMovie(movie) {
    // renders a preview of the movie
    let div = document.createElement("div");
    div.classList.add("card");
    // div.style = "";
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path; // put in alt img if it doesn't have a backdrop/poster path
    img.alt = movie.title;
    // the card body
    let divBody = document.createElement("div");
    divBody.classList.add("card-body");
    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = movie.title;
    let p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = movie.overview;
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal");
    button.textContent = "More";
    button.addEventListener("click", function() {
        let movieApi = SEARCH_API + "movie/" + movie.id + API_Key;
        console.log("button clicked");

        fetch(movieApi)
            .then(handleResponse)
            .then(renderPopUp)
            .catch(handleError);
    });
    // appending
    div.appendChild(img);
    div.appendChild(divBody);
    divBody.appendChild(h5);
    divBody.appendChild(p);
    divBody.appendChild(button);
    
    return div;
}

function renderPopUp(data) {
    console.log(data);
    ERROR_ALERT_DIV.classList.add("d-none");
    document.querySelector("#modal").textContent = "";
    document.querySelector("#modal").appendChild(renderModal(data));
}

function renderModal(movie) {
    console.log(movie);
    let divOuter = document.createElement("div");
    divOuter.id = "myModal";
    divOuter.classList.add("modal", "fade");
    divOuter.setAttribute("role", "dialog");

    let innerDiv = document.createElement("div");
    innerDiv.classList.add("modal-dialog");
    divOuter.appendChild(innerDiv);

    let divCont = document.createElement("div");
    divCont.classList.add("modal-content");
    innerDiv.appendChild(divCont);

    let divHead = document.createElement("div");
    divHead.classList.add("modal-header");
    divCont.appendChild(divHead);

    let h5 = document.createElement("h5");
    h5.classList.add("modal-title");
    h5.id = "movieid?";
    h5.textContent = "Movie Title";

    let button = document.createElement("button");
    button.classList.add("close");
    button.setAttribute("data-dismiss", "modal");
    button.setAttribute("aria-label", "Close");

    let span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.textContent = "&times;";
    divHead.appendChild(h5);
    divHead.appendChild(button);
    button.appendChild(span);

    let divBody = document.createElement("div");
    divBody.classList.add("modal-body");
    divBody.textContent = "movie text";
    divCont.appendChild(divBody);

    let divFoot = document.createElement("div");
    divFoot.classList.add("modal-footer");

    let button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.classList.add("btn", "btn-secondary");
    button2.setAttribute("data-dismiss", "modal");
    button2.textContent = "Close";

    divFoot.appendChild(button2);
    divCont.appendChild(divFoot);

    return divOuter;
}

function render(data) {
    console.log(data);
    // renders the initial page of the movies
    ERROR_ALERT_DIV.classList.add("d-none");
    RESULTS_DIV.textContent = "";
    for (let i = 0; i < data.results.length; i++) {
        RESULTS_DIV.appendChild(renderMovie(data.results[i]));
    }
    let number = document.querySelector(".page-numbers");
    state.currentPage = data.page;
    number.textContent = " " + state.currentPage + " of " + data.total_pages + " ";
    return number;
}

function discover() {
    state.currentApi = DISCOVER_API;
    state.end = "";
    myFetch();
}

genre();
discover();

function genre() {
    let genreApi  = SEARCH_API + "genre/movie/list" + API_Key + "&language=en-US";
    fetch(genreApi)
        .then(handleResponse)
        .then(renderNav)
        .catch(handleError);
}

function renderNav(data) {
    ERROR_ALERT_DIV.classList.add("d-none");
    for (let i = 0; i < data.genres.length; i++) {
        document.querySelector("#myList").appendChild(renderGenre(data.genres[i]));
    }
}

function renderGenre(genre) {
    let a = document.createElement("a");
    a.classList.add("list-group-item", "list-group-item-action");
    a.setAttribute("data-toggle", "list");
    a.href = "#";
    a.textContent = genre.name;
    a.setAttribute("roll", "tab");
        a.addEventListener("click", function() {
            state.currentPage = 1;
            state.currentApi = DISCOVER_API;
            state.end = "&with_genres=" + genre.id;
            console.log("this is the genre you clicked on " + genre.id);
            myFetch();
        });
    return a;
}

document.querySelector("#list-home-list")
    .addEventListener("click", function() {
        discover();
    })

document.querySelector("#next")
    .addEventListener("click", function() {
        state.currentPage++;
        myFetch();
    });

document.querySelector("#prev")
    .addEventListener("click", function() {
        if (state.currentPage > 1) {
            state.currentPage--;
            myFetch();
        }
    });

document.querySelector("#search-form")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        // clear previous genre
        state.currentPage = 1;
        state.currentApi = SEARCH_API + "search/movie" + API_Key + "&language=en-US&query=" + this.querySelector("input").value + "&page=";
        state.end = "";
        myFetch();
    });

function myFetch () {
    return fetch(state.currentApi + state.currentPage + state.end)
        .then(handleResponse)
        .then(render)
        .catch(handleError);
}