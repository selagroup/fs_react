import React from 'react';
import { MovieModel } from '../../Models/movie.model';
import Movie from './Movie';
import './MovieList.css';

export interface MovieListProps {
    movies: Array<MovieModel>,
    movieSelected?: (inx: number) => void;
}
const MovieList = (props: MovieListProps = { movies: []  }) => {
    const { movies } = props;

    const list =  movies.map( (movie,inx) => (
        <div key={movie.id} onClick={ () => props.movieSelected && props.movieSelected(inx)  }>
           <Movie movie={ movie }></Movie>
        </div>
    ) );

    return (
        <div className="movie-list">
            { list }
        </div>
    )
}

export default MovieList;