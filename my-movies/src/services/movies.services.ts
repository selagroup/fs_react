import { MovieModel } from "../Models/movie.model";

const MOVIES_URL = `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_API_MOVIES_PREFIX}`;

const handleResponse=(res: Response) => {
    if(res.ok){
        return res.json().then( r =>{
             return r.data
            });
    }

    throw new Error(res.statusText);
}

const callAPI = (url: string, options: RequestInit | undefined = undefined ) => {

    return fetch(url, options)
        .then(handleResponse);
}

const getMovies = () =>{
    return callAPI(MOVIES_URL);
}

const updateMovie = (movie: MovieModel) =>{
    const url = `${MOVIES_URL}/${movie.id}`
    return callAPI(url, {
             method:'PUT',
             headers:{
                 "Content-Type":'application/json',
             },
             body:JSON.stringify(movie)
        });
}

const createMovie = (movie: MovieModel) => {
    return callAPI(MOVIES_URL, {
             method:'POST',
             headers:{
                 "Content-Type":'application/json',
             },
             body:JSON.stringify(movie)
        });
}
export default {
    getMovies, updateMovie, createMovie
}