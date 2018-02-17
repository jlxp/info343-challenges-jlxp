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
    let div = document.createElement("div");
    div.classList.add("card");
    
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    if (movie.backdrop_path !== null) {
        img.src = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
    } else {
        img.src = "../img/img_not_available.png";
    }
    img.alt = movie.title;
    
    let divBody = document.createElement("div");
    divBody.classList.add("card-body");
    
    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = movie.title;
    
    let p = document.createElement("p");
    p.classList.add("card-text", "line-clamp");
    p.textContent = movie.overview;
    
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal");
    button.textContent = "More";
    button.addEventListener("click", function() {
        let movieApi = SEARCH_API + "movie/" + movie.id + API_Key;
        fetch(movieApi)
            .then(handleResponse)
            .then(renderModal)
            .catch(handleError);
        
        $("#movieModal").modal("show");
    });

    div.appendChild(img);
    div.appendChild(divBody);
    divBody.appendChild(h5);
    divBody.appendChild(p);
    divBody.appendChild(button);
    
    return div;
}

function renderModal(data) {
    console.log(data);
    let tag = document.querySelector("p.tagline");
    tag.textContent = data.tagline;
    
    let img = document.querySelector("img.poster");
    if (data.poster_path !== null) {
        img.setAttribute("src", "https://image.tmdb.org/t/p/w500" + data.poster_path);
    } else {
        img.setAttribute("src", "../img/img_not_available.png");
    }
    document.querySelector(".modal-title").textContent = data.title;
    
    let overview = document.querySelector("p.overview");
    overview.textContent = data.overview;
    document.querySelector("ul.genre").textContent = "";
    for (let i = 0; i < data.genres.length; i++) {
        let genres = document.createElement("li");
        genres.textContent = data.genres[i].name;
        document.querySelector("ul.genre").appendChild(genres);
    }

    let homepage = document.querySelector("a.homepage");
    homepage.setAttribute("href", data.homepage);
    homepage.textContent = data.homepage;

    document.querySelector("ul.companies").textContent = "";
    for (let i = 0; i < data.production_companies.length; i++) {
        let companies = document.createElement("li");
        companies.textContent = data.production_companies[i].name;
        document.querySelector("ul.companies").appendChild(companies);
    }
}

function render(data) {
    // renders the initial page of the movies
    ERROR_ALERT_DIV.classList.add("d-none");
    RESULTS_DIV.textContent = "";
    
    for (let i = 0; i < data.results.length; i++) {
        RESULTS_DIV.appendChild(renderMovie(data.results[i]));
    }

    let number = document.querySelector(".page-numbers");
    state.currentPage = data.page;
    let totalPages;
    if (data.total_pages > 1000) {
        totalPages = 1000;
    } else {
        totalPages = data.total_pages;
    }
    number.textContent = state.currentPage + " of " + totalPages;
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
    let sideBar = document.querySelector("#myList");
    let dropdown = document.querySelector(".dropdown-menu");
    for (let i = 0; i < data.genres.length; i++) {
        sideBar.appendChild(renderGenre(data.genres[i]));
        dropdown.appendChild(renderGenreMenu(data.genres[i]));
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
            myFetch();
        });
    return a;
}

function renderGenreMenu(genre) {
    let a = document.createElement("a");
    a.classList.add("dropdown-item");
    a.textContent = genre.name;
        a.addEventListener("click", function() {
            state.currentPage = 1;
            state.currentApi = DISCOVER_API;
            state.end = "&with_genres=" + genre.id;
            myFetch();
        });
    return a;
}

document.querySelector("#list-all-list")
    .addEventListener("click", function() {
        discover();
    });

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
        document.querySelector(".show").classList.remove("active", "show");
        document.querySelector("#list-all-list").classList.add("active", "show");
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