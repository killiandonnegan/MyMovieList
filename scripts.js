


//TMDB API
require('dotenv').config(); // Load environment variables from .env file
const apiKey = process.env.API_KEY;
console.log(apiKey); 

function getWhatsNew() 
{
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)  //query retrieves trending movies
    .then(response => response.json())
    .then(data => {

        console.log(data.results);
        console.log(typeof(data.results));
        const movies = document.getElementById("trendingmovie"); //div which will contain movies

        movies.innerHTML=""; 
        
        data.results.forEach(movie => {
            const titleid = movie.id;
            const title = movie.title;
            //const poster_path = movie.poster_path;
            const poster_path = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "/assets/poster.jpg";
            const overview = escape(movie.overview);
            const release_date = movie.release_date;
            const vote_average = Math.round(movie.vote_average * 10)/10;
            const type = movie.media_type;
            const star_rating = movie.star_rating;

            const movieobject = document.createElement("div");
            movieobject.classList.add("movie");

   
            movieobject.innerHTML=`

            <div class="movie">
                <div class="poster">
                    <img src="${poster_path}" onclick="clicked('${titleid}', '${escape(title)}', '${poster_path}', '${overview}', '${release_date}', '${vote_average}', '${type}', '${star_rating}')"> 
                </div>
                <div class="title">
                    ${title}
                </div
            </div>
        `;
            movies.appendChild(movieobject);
        });
    })


    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`)  //query retrieves trending series
    .then(response => response.json())
    .then(data => {

        console.log(data.results);
        console.log(typeof(data.results));
        const tvs = document.getElementById("trendingtv");
        
        tvs.innerHTML="";
        
        data.results.forEach(tv => {

            const titleid = tv.id;
            const title = tv.name;
            const poster_path = tv.poster_path ? "https://image.tmdb.org/t/p/w500" + tv.poster_path : "/assets/poster.jpg";
            const overview = escape(tv.overview);
            const air_date = tv.first_air_date;
            const vote_average = Math.round(tv.vote_average * 10) / 10;
            const type = tv.media_type;

            const star_rating = tv.star_rating;

            const tvobject = document.createElement("div");
            tvobject.classList.add("tv");
            tvobject.innerHTML=`
            <div class="tv">
                <div class="poster">
                <img src="${poster_path}" onclick="clicked('${titleid}', '${escape(title)}', '${poster_path}', '${overview}', '${air_date}', '${vote_average}', '${type}', '${star_rating}')"> 
                </div>
                <div class="title">
                   ${title}
                </div
            </div>
        `;
            tvs.appendChild(tvobject);
        })
    })
}


//Search page
function searchTitle(input, type)
{
    document.getElementById("trendingmovie").innerHTML=""; //clear screen to display results
    document.getElementById("trendingtv").innerHTML="";
    document.getElementById("trendingmovielabel").innerHTML="";
    document.getElementById("trendingtvlabel").innerHTML="";

    //don't need the second set of scroll arrows
    if(document.getElementById("scrollprev2"))
    {
        document.getElementById("scrollprev2").remove();
    }

    if(document.getElementById("scrollnext2"))
    {
        document.getElementById("scrollnext2").remove();
    }




    //will use 'trendingmovie' container to display results for movies & tv, no point creating an extra container for search results

    if(type == "Movie") //user wants to search for movies
    {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`+input) //retrieves movie results of users query
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const results = document.getElementById("trendingmovie");
            results.style.paddingTop="95px";
            data.results.forEach(movie => {

                const titleid = movie.id;
                //const title = movie.title.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                //const title = movie.title.replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                const title = movie.title;
                //const poster_path = movie.poster_path==null ? '/assets/poster.jpg' : "https://image.tmdb.org/t/p/w500"+movie.poster_path;
                //const poster_path = "https://image.tmdb.org/t/p/w500"+movie.poster_path;
                const poster_path = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "/assets/poster.jpg";
                //const poster_path = movie.poster_path==null ? "assets/poster.jpg" : "https://image.tmdb.org/t/p/w500"+movie.poster_path;
                console.log("POSTER "+poster_path);

                

                const overview = escape(movie.overview);
               //const overview = movie.overview.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\\/g, "\\\\");

                //const overview = movie.overview.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
                const release_date = movie.release_date;
                const vote_average = Math.round(movie.vote_average * 10) / 10;

                const star_rating = movie.star_rating;
                
                const movieobject = document.createElement("div");
                movieobject.classList.add("movie");
                movieobject.innerHTML=`
                <div class="movie">
                    <div class="poster">
                        <img style="margin-top=200px" src="${poster_path}" onclick="clicked('${titleid}', '${escape(title)}', '${poster_path}', '${overview}', '${release_date}', '${vote_average}', '${type}', '${star_rating}')"> 
                    </div>
                    <div class="title">
                        ${title}
                    </div>
                </div>    
                `;
                results.appendChild(movieobject);
            })
        })
    }

    else //user wants to search for series
    {
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=`+input) //retrieves tv/series results of users query
        .then(response => response.json())
        .then(data => {

            const results = document.getElementById("trendingmovie");
            data.results.forEach(tv => {

                const titleid = tv.id;
                const title = tv.name;
                const poster_path = tv.poster_path ? "https://image.tmdb.org/t/p/w500" + tv.poster_path : "/assets/poster.jpg";
                const overview = escape(tv.overview);
                const release_date = tv.first_air_date;
                const vote_average = Math.round(tv.vote_average * 10) / 10;
                
                const star_rating = 5;
                
                const tvobject = document.createElement("div");
                tvobject.classList.add("tv");
                tvobject.innerHTML=`

                <div class="movie">
                    <div class="poster">
                        <img src="${poster_path}" onclick="clicked('${titleid}', '${escape(title)}', '${poster_path}', '${overview}', '${release_date}', '${vote_average}', '${type}', '${star_rating}')"> 
                    </div>

                    <div class="title">
                        ${title}
                    </div>
                </div>
                `;
                results.appendChild(tvobject);
            })
        })
    }

    document.querySelector('#scrollprev').style.visibility='visible';
    document.querySelector('#scrollnext').style.visibility='visible';
}

function altImage()
{
    document.getElementById('yunno').src='/assets/poster.jpg';
}

//when a movie/series is clicked on
function clicked(titleid, title, poster_path, overview, release_date, vote_average, type, star_rating)
{
    console.log("clicked!");
    console.log(star_rating);
    var modal = document.getElementById("modal-open");
    modal.style.display = "flex";

    var close = document.getElementById("modal-close");

    if(location.href.split("/").slice(-1) !="watchlist.html") //if user is not on watchlist page, check if the title is in list
    {
        checkList(titleid, title, poster_path, overview, release_date, vote_average, type, star_rating);
    }

    else //if user is on watchlist page, they can only remove titles not add any
    {
        console.log(star_rating);
        var modal = document.getElementById("modal-open");

                if(type.toUpperCase() == "MOVIE") //if title is a movie
                {
                    modal.innerHTML=`
                    <div class="modal-content">
                        <img src="${poster_path}">
                        <div id="modal-close" onclick="closemodal()">X</div>
                        <h2>${title}</h2>
                        <h4>Release date: ${release_date}</h4>
                        <p>${overview}</p>
                        <h4>Average rating: ${vote_average} / 10</h4>


                        <div class="rating">
                            <span class="star" rating="1"></span>
                            <span class="star" rating="2"></span>
                            <span class="star" rating="3"></span>
                            <span class="star" rating="4"></span>
                            <span class="star" rating="5"></span>
                        </div>

                        <br>

                        <button class="remove-button" onclick="removeFromList(${titleid})">Remove from MyMovieList</button>
                    </div>
                `;
                }
            
                else if(type.toUpperCase() == "SERIES" ||type.toUpperCase() == "TV") // if title is a series
                {
                    modal.innerHTML=`
                    <div class="modal-content">
                        <img src="${poster_path}"> 
                        <div id="modal-close" onclick="closemodal()">X</div>
                        <h2>${title}</h2>
                        <h4>First aired: ${release_date}</h4>
                        <p>${overview}</p>
                        <h4>Average rating: ${vote_average} / 10</h4>
                        

                        <div class="rating">
                            <span class="star" rating="1"></span>
                            <span class="star" rating="2"></span>
                            <span class="star" rating="3"></span>
                            <span class="star" rating="4"></span>
                            <span class="star" rating="5"></span>
                        </div>

                        <br>

                        <button class="remove-button" onclick="removeFromList(${titleid})">Remove from MyMovieList</button>
                    </div>
                `;
                }
                const stars = document.querySelectorAll(".star");


                stars.forEach((star, index) => {
                    if (index < star_rating) {
                      star.style.color = "yellow";
                    } else {
                      star.style.color = "gray";
                    }
                  
                    star.addEventListener("click", () => {
                      // Set the color of the clicked star and all previous stars to yellow
                      for (let i = 0; i <= index; i++) {
                        stars[i].style.color = "yellow";
                      }
                      
                      // Set the color of all stars after the clicked star back to gray
                      for (let i = index + 1; i < stars.length; i++) {
                        stars[i].style.color = "gray";
                      }
                      
                      // Store the user's rating in a variable or send it to the server
                      const rating = index + 1;
                      console.log(`User rated ${rating} out of 5 stars`);
                  
                      updateStarRating(titleid, rating);
                    });
                  });
                  

    }


    window.onclick = function(event) { 
        if (event.target == modal) {
          modal.style.display = "none";
          modal.innerHTML="";

          if(location.href.split("/").slice(-1) == "watchlist.html")
          {
            location.reload();
          }
        }
      }
}

function escape(str) //escapes special characters tp prevent any syntax errors
{
    return str.trim()
    .replace(/\s+/g, ' ')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function checkList(titleid, title, poster_path, overview, release_date, vote_average, type, star_rating) //checks if a movie/series is in the list
{
        fetch('/lists/' + titleid)
        .then(response => response.json()) //if the title is in the list...
        .then(data => {       
                star_rating = data.star_rating; //update star_rating from null to actual value from collection

                var modal = document.getElementById("modal-open");

                if(type.toUpperCase() == "MOVIE") //if title is a movie
                {
                    modal.innerHTML=`
                    <div class="modal-content">
                    <img src="${poster_path}">
                    <div id="modal-close" onclick="closemodal()">X</div>
                    <h2>${title}</h2>
                    <h4>Release date: ${release_date}</h4>
                    <p>${overview}</p>
                    <h4>Average rating: ${vote_average} / 10</h4>

                    <div class="rating">
                        <span class="star" rating="1"></span>
                        <span class="star" rating="2"></span>
                        <span class="star" rating="3"></span>
                        <span class="star" rating="4"></span>
                        <span class="star" rating="5"></span>
                    </div>

                    <br>
            
                    <button class="remove-button" onclick="removeFromList(${titleid})">Remove from MyMovieList</button>
                    </div>
                `;
                }
            
                else if(type.toUpperCase() == "SERIES" ||type.toUpperCase() == "TV") // if title is a series
                {
                    modal.innerHTML=`
                    <div class="modal-content">
                    <img src="${poster_path}"> 
                    <div id="modal-close" onclick="closemodal()">X</div>
                    <h2>${title}</h2>
                    <h4>First aired: ${release_date}</h4>
                    <p>${overview}</p>
                    <h4>Average rating: ${vote_average} / 10</h4>

                    <div class="rating">
                    <span class="star" rating="1"></span>
                    <span class="star" rating="2"></span>
                    <span class="star" rating="3"></span>
                    <span class="star" rating="4"></span>
                    <span class="star" rating="5"></span>
                    </div>

                    <br>
            
                    <button class="remove-button" onclick="removeFromList(${titleid})">Remove from MyMovieList</button>
                    </div>
                `;
                }
                const stars = document.querySelectorAll(".star");


                stars.forEach((star, index) => {
                    if (index < star_rating) {
                      star.style.color = "yellow";
                    } else {
                      star.style.color = "gray";
                    }
                  
                    star.addEventListener("click", () => {
                      // Set the color of the clicked star and all previous stars to yellow
                      for (let i = 0; i <= index; i++) {
                        stars[i].style.color = "yellow";
                      }
                      
                      // Set the color of all stars after the clicked star back to gray
                      for (let i = index + 1; i < stars.length; i++) {
                        stars[i].style.color = "gray";
                      }
                      
                      // Store the user's rating in a variable or send it to the server
                      const rating = index + 1;
                      console.log(`User rated ${rating} out of 5 stars`);
                  
                      updateStarRating(titleid, rating);
                    });
                  });

                

        }).catch(error => { //if the title is not in the list...

            var modal = document.getElementById("modal-open");
            console.log("made it");
            console.log(star_rating);

            if(type.toUpperCase() == "MOVIE") //if title is a movie
            {
                modal.innerHTML=`
                <div class="modal-content">
                <img src="${poster_path}">
                <div id="modal-close" onclick="closemodal()">X</div>
                <h2>${title}</h2>
                <h4>Release date: ${release_date}</h4>
                <p>${overview}</p>
                <h4>Average rating: ${vote_average} / 10</h4>
        
                <button class="add-button" onclick="addToList(${titleid}, '${escape(title)}', '${poster_path}', '${escape(overview)}', '${release_date}', '${vote_average}', '${type}', '${star_rating}')">Add to MyMovieList</button>
                </div>
            `;
            }
        
            else if(type.toUpperCase() == "SERIES" ||type.toUpperCase() == "TV") // if title is a series
            {
                modal.innerHTML=`
                <div class="modal-content">
                <img src="${poster_path}"> 
                <div id="modal-close" onclick="closemodal()">X</div>
                <h2>${title}</h2>
                <h4>First aired: ${release_date}</h4>
                <p>${overview}</p>
                <h4>Average rating: ${vote_average} / 10</h4>
        
                <button class="add-button" onclick="addToList(${titleid}, '${escape(title)}', '${poster_path}', '${escape(overview)}', '${release_date}', '${vote_average}', '${type}', '${star_rating}')">Add to MyMovieList</button>
                </div>
            `;
            }
    
        })
}

function closemodal() //closes modal
{
    document.getElementById("modal-open").style.display="none";
}

async function addToList(titleid, title, poster_path, overview, release_date, vote_average, type, star_rating) {
    try {
      console.log("Got to addToList! " + overview);
      const response = await fetch("/lists", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_id": titleid,
          "title": escape(title),
          "release_date": release_date,
          "poster_path": poster_path,
          "overview": escape(overview),
          "vote_average": vote_average,
          "type": type,
          "star_rating": star_rating
        })
      });
  
      const data = await response.json();
      console.log("Movie/Series data added:");
      console.log(data);
      console.log(star_rating);
  
      document.getElementById("modal-open").innerHTML = "This title has been added to MyMovieList.<br><br>Click anywhere to close.";
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStarRating(titleid, newRating) {
    try {
      const response = await fetch(`/lists/${titleid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ star_rating: newRating })
      });
      const data = await response.json();
      console.log("Star rating updated:");
      console.log(data);
      
      console.log(newRating);
    } catch (error) {
      console.error(error);
    }
  }
  
  
  

function getList() //retrieves the users list
{
    fetch('/lists')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if(data.length==0)
        {
            console.log("xhaka");
            const results = document.getElementById("scrolllist");
            results.innerHTML=`<div id="EmptyList"> Movies and TV series that you add to your list will appear here </div><br><button id="BrowseButton" onclick="location.href = '/index.html';">Browse Movies and TV</button>`;
        }

        const results = document.getElementById("list");
        
        data.forEach(list => {

            const titleid = list._id;
            const title = escape(list.title);
            const release_date = list.release_date;
            const poster_path = list.poster_path;
            const overview = escape(list.overview);     
            //const air_date = list.release_date;
            const vote_average = list.vote_average;
            const type = list.type;

            const star_rating = list.star_rating ? list.star_rating : "0000";

            const listobject = document.createElement("div");
            listobject.classList.add("list");
            listobject.innerHTML=`

            <div class="movie">
                <div class="poster">
                    <img src="${poster_path}" onclick="clicked(${titleid}, '${title}', '${poster_path}', '${overview}', '${release_date}', '${vote_average}', '${type}', '${star_rating}')"> 
                </div>

                <div class="title">
                    ${title}
                </div
            </div>
            `;
            results.appendChild(listobject);
        })
    })
}

function removeFromList(titleid) //allows user to remove a title from list
{
    console.log(titleid);

    fetch("/lists/" + titleid, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))

    document.getElementById("modal-open").innerHTML=("This title has been removed from MyMovieList.<br><br>Click anywhere to close."); 

}


function enterSearch() //allows user to search using 'Enter' key on search page
{
    document.onkeydown = function(e)
    {
        e = e || window.event;
        var key = e.which || e.keyCode;

        if(key===13 && document.getElementById('searchtitle').value != "") //keycode for 'Enter' is 13
        { 
            searchTitle(document.getElementById('searchtitle').value, document.getElementById('searchtype').value)
        }
    }
}

function scroll(scrollContainer, movieContainer, movieWidth, prevBtn, nextBtn) //allows scroll functionality of container of titles
{
    let scrollPos = 0;


    nextBtn.addEventListener('click', () => {
        const maxScrollPos = movieContainer.scrollWidth - movieContainer.clientWidth;
        const remainingScroll = maxScrollPos - movieContainer.scrollLeft;
        const nextScroll = Math.min(movieWidth * 3, remainingScroll);
        scrollPos += nextScroll;

        if(scrollPos > maxScrollPos)
        {
            scrollPos = maxScrollPos;
        }

        scrollContainer.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        const prevScroll = Math.min(movieWidth * 3,scrollContainer.scrollLeft);
        scrollPos -= prevScroll;

        if(scrollPos <= 0)
        {
            scrollPos = 0
        }

        scrollContainer.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
    });
}





