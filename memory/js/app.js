"use strict";
//@ts-check

let state = {
    matches: 0, 
    missed: 0,
    remaining: 8,
    startTime: undefined,
    timer: undefined,
    pushedButtons: 0
}

/**
 * Shuffles an array in-place.
 * Source: https://bost.ocks.org/mike/shuffle/
 * @param {[]} array 
 * @returns {[]} the shuffled input array
 */
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

/**
 * Returns a shallow copy of the object by
 * copying all of its properties to a new object.
 * @param {Object} obj - an object to copy
 * @returns {Object} a shallow clone of the object
 */
function cloneObject(obj) {
    return Object.assign({}, obj);
}


function newGame() {
    //TODO: add code to implement the game
    document.querySelector("#matches").textContent = state.matches;
    document.querySelector("#missedMatches").textContent = state.missed;
    document.querySelector("#remaining").textContent = state.remaining;

    let eightTiles = shuffle(TILES).slice(0, 8);
    let match = eightTiles;
    let gameTiles = eightTiles.concat(match);
    gameTiles = shuffle(gameTiles);

    for (let i = 0; i < gameTiles.length; i++) {
        document.querySelector("#tiles").appendChild(renderTile(gameTiles[i]));
    }

    state.startTime = Date.now();
    state.timer = setInterval(function() {
        renderTimer(state);
    }, 1000);
}

//start a new game when the page loads
newGame();

function renderTile(tile) {
    let button = document.createElement("button");
    let img = document.createElement("img");
    button.setAttribute("aria-label", "back of the tile");
    button.appendChild(img);
    img.src = TILEBACK;
    img.alt = TILEBACKALT;
    button.addEventListener("click", function() {
        button.setAttribute("aria-label", "front of tile is " + tile.alt);
        img.src = tile.url;
        img.alt = tile.alt;
        img.classList.add("clicked");
        state.pushedButtons++;
        if (state.pushedButtons === 2) {
            state.pushedButtons = 0;
            let matches = document.querySelectorAll("img.clicked");
            if (matches[0].src === matches[1].src) {
                state.matches++;
                state.remaining--;
                document.querySelector("#matches").textContent = state.matches;
                if (state.matches === 8) {
                    state.timer = clearInterval(state.timer);                    ;
                }
                document.querySelector("#remaining").textContent = state.remaining;
            } else {
                setTimeout(function() {
                    matches[0].src = TILEBACK;
                    matches[0].alt = TILEBACKALT; 
                    matches[1].src = TILEBACK;
                    matches[1].alt = TILEBACKALT; 
                ;}, 500);
                state.missed++;
                document.querySelector("#missedMatches").textContent = state.missed;
            }
            matches[0].classList.remove("clicked");
            matches[1].classList.remove("clicked");
        }
    });
    return button;
}

function renderTimer(state) {
    let milliseconds = Date.now() - state.startTime;
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);   
    
    let time = document.querySelector("#time");
    time.textContent = "" + minutes + " min " + seconds + " sec";
}