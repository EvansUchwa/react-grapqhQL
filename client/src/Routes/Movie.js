import React from 'react'
import AddMovie from '../RoutesComponents/movies/addMovie';
import MovieDetail from '../RoutesComponents/movies/movieDetail';
import MoviesList from '../RoutesComponents/movies/moviesList';

function Movie({ props }) {
    const { action } = props;
    function dispatchMovieComponent() {
        if (action === "add") {
            return <AddMovie />
        } else if (action === "list") {
            return <MoviesList />
        }
        else if (action === "detail") {
            return <MovieDetail />
        }
    }
    return (
        <div className='movie'>
            {
                dispatchMovieComponent()
            }
        </div>
    )
}

export default Movie
