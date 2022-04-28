import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { SimpleSectionLoader } from '../../Components/loader'
import { MoviePreviewCard } from './movieUI'

const getAllMoviesQuery = gql`query {
  movies{
    _id,name,description,
    likeCount,dislikeCount
  }
}`

function MoviesList() {
  const { loading, error, data } = useQuery(getAllMoviesQuery)
  return (
    <div className='movie-list'>
      <h1>Liste des films</h1>
      <section className='mL-movies'>
        {
          loading ? <SimpleSectionLoader /> : <>
            {
              data.movies.length > 0 ?
                data.movies.map((dt, index) => <MoviePreviewCard
                  key={"home mvp nb" + index}
                  props={{ movie: dt }} />)
                : <p>Aucun films ajoutés</p>
            }

          </>
        }
      </section>


      <section className='floatedBtn'>
        <Link to="/Movie/add">+</Link>
      </section>
    </div>

  )
}

export default MoviesList
