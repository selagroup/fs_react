import React from 'react'
import { MovieModel } from '../../Models/movie.model';
import './movie.css';

type MovieProps = {
    movie: MovieModel
}
const Movie: React.FC<MovieProps> = ({movie}) => {
    const date = new Date(movie.release_date).toDateString();
    return ( 
        <div className='movie' >
            <div className="poster">
                <img src={movie.poster_path} />
            </div>
            <div className="info">
                <div>{movie.title}</div>
                <div>{ date }</div>  
            </div>
        
        </div>
    )
}

export default Movie;