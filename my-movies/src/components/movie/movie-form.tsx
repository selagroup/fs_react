import React, { useState} from 'react'
import {MovieModel} from '../../Models/movie.model';

export type MovieFormProps = {
    movie?: MovieModel;
    movieSaved?: (movie:MovieModel) =>  void
}
const MovieForm = (props: MovieFormProps   ) => {

    const [movieVM, setMovieVM] = useState(props.movie); 

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name;
        const value = e.target.value;
        setMovieVM( { ...movieVM, [field]: value} as MovieModel)
    }    
    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {  
        if(movieVM){
            props.movieSaved && props.movieSaved(movieVM);
        }

    }
    return <div>
        <div>
            <input name="title" placeholder="Enter Title" onChange={handleChange} value={movieVM && movieVM.title } />
        </div>
        <div>
            <input type="date" name="release_date" placeholder="Enter year" onChange={handleChange} value={movieVM && movieVM.release_date  } />
        </div>
        <div>
            <button onClick={handleSave}  >Save</button>
        </div>
    </div>
}

export default MovieForm;




