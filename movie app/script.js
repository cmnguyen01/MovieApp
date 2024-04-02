//credit to tmdb for api access
const API_URL='https://api.themoviedb.org/3/movie/popular?api_key=a76ae961821c0bcc482ba790eb5ab428'
const IMG_path='https://image.tmdb.org/t/p/w1280'
const SEARCH_URL='https://api.themoviedb.org/3/search/movie?api_key=a76ae961821c0bcc482ba790eb5ab428&query="'

//get initial movies call
getMovies(API_URL)
//get form
const form=document.getElementById('form')

//get initial movies
async function getMovies(URL){
    const res=await fetch(URL)
    const data=await res.json()
    console.log(data.results)
    showMovies(data.results)
}
//set the movie divs
function showMovies(movies)
{
    main.innerHTML=''
    movies.forEach((movie) =>{
        //pull out select data from the movie array
        const {title, poster_path, vote_average, overview  } =movie
        //create div elements/objects for each movie 
        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML=`<div class="movie">
        <img src="${IMG_path+poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getVoteClass(vote_average)}">"${vote_average}"</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
          ${overview}
        </div>`

        main.appendChild(movieEl)
    })
}
//designate the color of the results by the value
function getVoteClass(vote)
{
    if(vote>=8)
    {
        return 'green'
    }
    else if(vote>=5)
    {
        return 'orange'
    }
    else
    {
        return 'red'
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const search_term=search.value
    //check if search bar is empty
    if(search_term && search_term!=='')
    {
        getMovies(SEARCH_URL+search_term)
        search.value=''

    }
    else {
        //else reload the page
        window.location.reload()
    }
})