let movieItems = [];
let favouriteItem = [];

const getMovie = () => {
    return fetch("http://localhost:3000/movies").then((result) => {
        if (result.status == 200) {
            return Promise.resolve(result.json());
        } else {
            return Promise.reject("error");
        }
    }).then((response) => {
        console.log(response);
        movieItems = response;
        createMovieList();
    }).catch(error => {
        alert("error");
    });
};

const createMovieList = () => {
    let movieList = "";
    movieItems.forEach(movie => {
        movieList += `
            <div class="card" style="width: 400px; margin-bottom: 20px;">
                <img class="card-img-top" src="${movie.posterPath}" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">${movie.title}</h4>
                    <button type="button" onClick="addFavourite(${movie.id})" class="btn btn-success">Add To Favourite</button>
                </div>
            </div>
        `;
    });
    document.getElementById("movielist").innerHTML = movieList;
};

const getFavourite = () => {
    fetch("http://localhost:3000/favourites").then((result) => {
        if (result.status == 200) {
            return Promise.resolve(result.json());
        } else {
            return Promise.reject("error");
        }
    }).then((res) => {
        console.log(res);
        favouriteItem = res;
        createFavouritesList();
    }).catch(error => {
        alert("error");
    });
};

const createFavouritesList = () => {
    let favlist = "";
    favouriteItem.forEach(favmovie => {
        favlist += `
            <div class="card" style="width: 400px; margin-bottom: 20px;">
                <img class="card-img-top" src="${favmovie.posterPath}" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">${favmovie.title}</h4>
                    <button type="button" onClick="deleteFromFav(${favmovie.id})" class="btn btn-primary">Delete from Favorites</button>
                </div>
            </div>
        `;
    });
    document.getElementById("favouritesList").innerHTML = favlist;
};

// Assuming these functions exist:
const addFavourite = (id) => {
// Implement the function to add a movie to favorites
    alert(id);
    if(!isMovieAlreadyInFavSection(id))
    {
          console.log("is true")
          let movieObject = getMovieById(id)
          {
            console.log(movieObject)
            favouriteItem.push(movieObject);
            return fetch("http://localhost:3000/favourites",
            {
                method:'POST',

                body:JSON.stringify(movieObject),
                headers:{
                              'Content-Type':'application/json',
                     'Accept' :'application/json'
                }

            }).then((result)=>
                {
                    if(result.status == 200 || result.status==201)
                    {
                         return Promise.resolve(favouriteItem);
        
                    }
                    else
                     { 
                        return Promise.reject("movie is already there in fav section")
                     }
                    
                    }).then((favMovieResult)=> 
                    {
                        createFavouritesList();
                        return favMovieResult;
                    }). catch(error=>
                    {
                        throw new Error(error);
                    })
                }
            }
                else 
                {
            alert("movie is already there in fav section");
                }
        
                
            } 


            const isMovieAlreadyInFavSection= (id) =>
                {
                    alert("isMovieAlreadyInFavSection "+ id);
                // console.log("isMovieAlreadyInFavSection " + id);
                    for(let fav in favouriteItem)
                    {
                        if(id==favouriteItem[fav].id)
                        {
                            alert("true");
                            return true;
                        }
                    alert("false");
                }
                    return false;
            }
            
            const getMovieById = (id)=>
                {
                    console.log("getMovieById" + id)
                  for(let movie in movieItems)
                  { 
                    if(id==movieItems[movie].id)
                    {
                       alert(movieItems[movie].title)
                        return movieItems[movie];
                  }}
                }
            
                const deleteFromFav = (id)=>
                {
                    return fetch("http://localhost:3000/favourites/"+id,
                    
                        {
                            method:'delete'
                        })
                    .then((result)=>
                   {
                       if(result.status==200)
                       {
                           return Promise.resolve(result.json());
                       }
                       else 
                       {
                           return Promise.reject("error");
                       }
                   }).then(response=>
                   {
                      alert("rec deleted from fav")
                       favourites=response;
                       createFavouritesList();
                   }
                   ).catch(error=>
                   {
                 alert(error);
                   })
                   
                }
