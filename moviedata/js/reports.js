// @ts-check

//TODO: set the JavaScript interpreter into script mode
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict"
//The following is only used by Visual Studio Code and other JSDoc-aware
//editors. It doesn't affect the way your code is executed at runtime,
//but it does help VSCode provide intelligent suggestions as you write
//your code. For more details on JSDoc, see http://usejsdoc.org/.
//For more details on how VSCode pays attention to JSDoc annotations, see
//https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript
//and https://code.visualstudio.com/docs/languages/javascript
/**
 * @typedef Movie
 * @type {Object}
 * @property {string} title - the title of the movie
 * @property {string} released - the date the movie was released in the format YYYY-MM-DD
 * @property {string} distributor - the movie's distributor
 * @property {string} genre - the genre of the movie
 * @property {string} rating - the movie's MPAA rating (e.g., G, PG, PG-13, etc.)
 * @property {number} gross - the gross sales earned by the movie in 2016
 * @property {number} tickets - the number of tickets sold for the movie in 2016
 */

/**
 * Returns the movie's title, or "(no title)" if the `movie` parameter
 * is null/undefined or has no `title` property. Note that the `movie`
 * parameter is a JavaScript object with the properties listed above.
 * @param {Movie} movie 
 * @returns {string} the title of the movie or "(no title)"
 */
function getTitle(movie) {
    //TODO: return the `title` property of the `movie` parameter
    //(which is an object), or the literal string "(no title)" 
    //if the `movie` parameter is null/undefined or has no `title`
    //property
    if (movie === null || movie === undefined || !movie.hasOwnProperty("title")) {
        return "(no title)";
    }
    return movie.title;
}

/**
 * Returns the year the movie was released as a number, or undefined
 * if the `movie` parameter is null/undefined or has no `released` property.
 * Note that the `movie` parameter is a JavaScript object with the
 * properties listed above.
 * @param {Movie} movie 
 * @returns {number|undefined} the year the movie was released
 */
function getYearReleased(movie) {
    //TODO: implement this according to the comments above
    //note that the `released` property is a string in the
    //format YYYY-MM-DD (e.g., 2017-12-31)
    if (movie !== null && movie !== undefined && movie.hasOwnProperty("released")) {
        return Number(movie.released.substr(0, 4));
    }
    return undefined;
}

/**
 * Returns a citation for the movie, in the following form:
 * 
 * title (year)
 * 
 * where `title` is the value returned from your getTitle()
 * function, and `year` is the value returned from your 
 * getYearReleased() function. If your getYearReleased()
 * function returns undefined, do not include the year portion
 * (i.e., just return the title only).
 * @param {Movie} movie - a single JavaScript object with the 
 * Movie properties listed above
 * @returns {string} a citation for the movie
 */
function getCitation(movie) {
    //TODO: implement this according to the comments above
    let result = getTitle(movie);
    if (getYearReleased(movie) !== undefined) {
        result += " (" + getYearReleased(movie) + ")";
    }
    return result;
}

/**
 * Returns the average ticket price for the movie, which
 * should be the gross sales divided by the tickets sold.
 * If the `movie` parameter is null or undefined, it returns undefined.
 * If either the `gross` or `tickets` properties are missing,
 * it returns `NaN` (not a number).
 * @param {Movie} movie - a single JavaScript object with the 
 * Movie properties listed above
 * @returns {number|undefined} the average ticket price for the movie
 */
function getAvgTicketPrice(movie) {
    //TODO: implement this according to the comments above
    if (movie === null || movie === undefined) {
        return undefined;
    } else if (!(movie.hasOwnProperty("gross") || movie.hasOwnProperty("tickets"))) {
        return NaN;
    } else {
        return movie.gross / movie.tickets;
    }
}

/**
 * Returns the sum of all tickets sold for all movies in the
 * `moviesArray` parameter, which is an array of Movie objects.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {number} the sum of all tickets sold for all movies
 */
function totalTicketsSold(moviesArray) {
    //TODO: implement this according to the comments above
    //NOTE:  If `moviesArray` is null/undefined, that is a programming
    // error so let this function generate an exception when you
    // try to use that parameter (i.e., no need to explicitly check
    // the parameter value and throw an error yourself). This is true
    // for all the rest of the functions as well.

    //try using the .reduce() methods on the moviesArray
    //to calculate this value using functional programming techniques
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return moviesArray.reduce(
        function(prev, current) {
            if (!current.hasOwnProperty("tickets")) {
                return 0;
            }
            return prev + current.tickets;
        }, 0
    );
}

/**
 * Returns an array of strings containing one string for each movie 
 * in the `moviesArray` parameter. Each string in the returned array
 * is a citation for the movie, as returned from the getCitation()
 * function.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {string[]} array of citation strings
 */
function allCitations(moviesArray) {
    //TODO: implement this according to the comments above
    //try using the .map() method on the moviesArray
    //to accomplish this in one short line of code!
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    return moviesArray.map(
        function(movie) {
            return getCitation(movie);
        }
    );
}

/**
 * Returns a single JavaScript object from the `moviesArray`,
 * which is the movie that has the largest value for its
 * `gross` property (i.e. the movie with the largest gross sales).
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {Movie} the movie object with the largest gross sales
 */
function topGrossingMovie(moviesArray) {
    //TODO: implement this according to the comments above
    //you can use a standard for loop to accomplish this, but
    //try using .reduce() instead for a more elegant solution
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    if (moviesArray.length === 0) {
        return undefined;
    }
    return moviesArray.reduce(
        function(prev, current) {
            if (prev.gross < current.gross) {
                return current;
            } else {
                return prev;
            }
        }
    );
}

/**
 * Returns a new array containing only the movies where the
 * `distributor` property equals "Walt Disney" in any casing.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {Movie[]} an array containing only the movies 
 * distributed by Walt Disney
 */
function onlyDisneyMovies(moviesArray) {
    //TODO: implement this according to the comments above
    //match any casing of "Walt Disney": for example,
    //you should include records where `distributor` equals
    //"Walt Disney" or "walt disney" or "WALT DISNEY", etc.
    //try using .filter() to accomplish this
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    return moviesArray.filter(
        function(movie) {
            return movie.distributor.toLocaleLowerCase() === "walt disney";
        }
    )
}

/**
 * Returns an array containing only the top 10 grossing movies 
 * distributed by Walt Disney.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {Movie[]} the top 10 grossing Disney movies
 */
function top10DisneyMovies(moviesArray) {
    //TODO: implement this according to the comments above
    //HINT: you can use the .sort() method to sort an array
    //and the .slice() method to slice off the first 10 elements
    let disney = onlyDisneyMovies(moviesArray);
    return disney.sort(
        function(first, second) {
            return second.gross - first.gross;
        }
    ).slice(0, 10);
}

/**
 * Returns the top 10 grossing movies that have the value "Comedy"
 * in their `genre` property, regardless of casing.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {Movie[]} an array containing the top 10 grossing comedy movie objects
 */
function top10Comedies(moviesArray) {
    //TODO: implement this according to the comments above
    //your code should do a case-insensitive comparison 
    //of the `genre` property so that you include
    //"Comedy", "comedy", "COMEDY", etc.
    return moviesArray
    .filter(function(movie){return movie.genre.toLowerCase() === "comedy";})
    .sort(function(first, second) {return second.gross - first.gross;})
    .slice(0, 10);
}

/**
 * Returns an array containing strings, one for each distinct
 * `distributor` property value in the input array of objects.
 * If a movie doesn't have a `distributor` property value, the 
 * literal string "(none)" will be used instead.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {string[]} an array of strings containing one element
 * for each distinct `distributor` value in the input array.
 */
function distinctDistributors(moviesArray) {
    //TODO: implement this according to the comments above
    //if the `distributor` property for a movie is missing or
    //zero-length, use the literal string "(none)" instead.

    //HINT: many movies are released by the same distributor, 
    // so you need to select only the distinct distributor
    // values and return those as an array. Remember that the
    // properties of a JavaScript object are a unique set.
    return moviesArray
    .map(
        function(movie) {
            if (movie.hasOwnProperty("distributor")) {
                return movie.distributor;
            } else {
                return "(none)";
            }
        }
    )
    .sort()
    .reduce((init, current)=>{
        if(init.length===0 || init[init.length-1]!==current){
            init.push(current);
        }
        return init;
    }, []);
}

/**
 * Returns an object containing one property for each distinct `rating`
 * in the input array of movies, whose value is the count of movies
 * with that rating.
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {Object} an object with one property per distinct rating,
 * whose value is the count of movies with that rating. For example:
 * {
 *  G: 123456,
 *  PG: 456123,
 *  "PG-13": 45125623,
 *   ... etc ...
 * }
 */
function countByRating(moviesArray) {
    //TODO: implement this according to the comments above
    return moviesArray
    .map(
        function(movie) {
            return movie.rating;
        }
    )
    .reduce(
        function (count, rating) { 
            if (rating in count) {
                count[rating]++;
            } else {
                count[rating] = 1;
            }
            return count;
        }, {}
    );
}

/**
 * Returns the sum of gross sales for each distinct genre. The 
 * returned array contains one object per each distinct genre.
 * Each object contains two properties: `genre` and `gross`,
 * where `genre` is the distinct genre name (e.g., "Adventure"),
 * and `gross` is the sum of gross sales for all movies in that
 * genre. If a movie has no value for the `genre` property,
 * the literal string "(none)" will be used instead.
 * The array is sorted so that the top-grossing genres are
 * at the start of the array.
 * 
 * For example, the returned array will look something like this:
 * [
 *  {
 *      genre: "Adventure",
 *      gross: 123456
 *  },
 *  {
 *      genre: "Comedy",
 *      gross: 123456
 *  },
 *  {
 *      //etc...
 *  }
 * ]
 * 
 * @param {Movie[]} moviesArray - an array of objects, where each
 * object has the Movie properties listed above
 * @returns {Object[]} an array of objects, each of which contains
 * only two properties: genre and gross. The array is sorted by the 
 * `gross` property descending, so that the top grossing genres are at
 * the start of the array.
 */
function grossByGenre(moviesArray) {
    //TODO: implement this according to the comments above
    return moviesArray
    .map(
        function(movie) {
            let temp = {};
            if (movie.genre === "") {
                movie.genre = "(none)";
            }
            temp.genre = movie.genre;
            temp.gross = movie.gross;
            return temp;
        }
    )
    .sort(
        function(a, b) {
            let nameA = a.genre.toUpperCase();
            let nameB = b.genre.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
    )
    .reduce(
        function(prev, current, index, array) {
            if(prev.length === 0 || array[index].genre !== prev[prev.length - 1].genre){
                prev.push(current);
            } else {
                prev[prev.length - 1].gross += array[index].gross;
            }
            return prev;
        }, []
    )
    .sort(
        function(genre1, genre2) {
            return genre2.gross-genre1.gross;
        }
    )
}

///////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT REPORTS
// The following reports are not required, but you can implement for extra credit.
// See the Opportunities for Extra Credit section of the challenge description
// for more details.

/**
 * Returns the sum of all tickets sold for each distinct rating.
 * The return value is an array of objects, each of which have 
 * two properties: `rating` and `tickets`, where `rating` is a
 * distinct rating (PG, G, etc.) and `tickets` is the sum of all
 * tickets sold for movies with that rating. The array is sorted
 * according to the *logical order* of the ratings: 
 *      G, PG, PG-13, R, NC-17, Not Rated
 * note that this is different than their alphabetical order!
 * @param {Movie[]} moviesArray 
 * @returns {Object[]}
 */
function ticketsByRating(moviesArray) {
    //TODO: implement according to the comments
}

/**
 * Returns the oldest 10 movies with a humanized description
 * of how old they are. It returns an array of 10 objects, each of
 * which has the following properties: `title`, `releasedFromNow`,
 * `gross`, and `tickets`. The `releasedFromNow` property should 
 * contain the value you get back from the Moment.js library's
 * .fromNow() method (https://momentjs.com/docs/#/displaying/fromnow/).
 * The other properties should come from the movie object. The array
 * is sorted by the release date such that the oldest movie is at
 * the start of the returned array.
 * @param {Movie[]} moviesArray 
 * @returns {Object[]}
 */
function oldest10(moviesArray) {
    //TODO: implement according to the comments

}
