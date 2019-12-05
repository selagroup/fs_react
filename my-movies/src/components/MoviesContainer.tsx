import React, { useState, useEffect } from 'react'
import { MovieModel } from '../Models/movie.model'
import Movie from './movie/Movie';
import MovieForm from './movie/movie-form';
import MovieList from  './movie/MovieList';
import { MOVIES } from '../Data/movies.mock';
import MovieService from '../services/movies.services';
import './MoviesContainer.css';
import moviesServices from '../services/movies.services';



const MoviesContainer: React.FC = () => {

    /** Phase 1 no lists **/
    // const [movieItem, setMovieItem] = useState(MOVIES[0] as MovieModel)

    // useEffect(() => {
    //     setTimeout(()=>{
    //         setMovieItem(MOVIES[1]);         
    //     },2000)
    // }, [])    
    // const handleSave= (movie: MovieModel) =>  {
    //     setMovieItem(movie);
    // }
    /**  */

    const [selectedMovieInx,setSelectedMovieInx] = useState(-1);
    const [selectedMovie,setSelectedMovie] = useState();
    const [movieList, setMovielist] =  useState<MovieModel[]>([]);


    useEffect(() => {
        setSelectedMovie(movieList[selectedMovieInx]);
    }, [selectedMovieInx])

    useEffect(() => {
        MovieService.getMovies()
            .then( list => setMovielist(list) );
        
    }, [])


    const handleSelected = (inx:number) =>{
        setSelectedMovieInx(inx);
        
    } 
    
    const handleSave= async (movie: MovieModel) =>  {
        const updatedMovie = await moviesServices.updateMovie(movie);
        const lst = [ ...movieList ];
        lst[selectedMovieInx] = updatedMovie;
        setMovielist(lst);
    }

    return (
        <div className="movies-container" >
            <div className="movies-list-container">
                {/* <Movie movie={ movieItem } ></Movie> */}
                <MovieList movies ={movieList} movieSelected={handleSelected} ></MovieList>
            </div>
            {
                selectedMovie ?
                (<div className="movies-form">
                  <MovieForm movie={selectedMovie} movieSaved = { handleSave } key={selectedMovie.id} ></MovieForm>
                </div>) : null
            }
        </div>
    )
}

export default MoviesContainer;