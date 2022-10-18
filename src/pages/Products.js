import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import noimage from '../noimage.png'

function Products() {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const API_KEY = 'api_key=3e52e2f5350ae60de5e2fc58e818d2a0'
  const BASE_URL = 'https://api.themoviedb.org/3'

  useEffect(() => {
    const API_URL =  `${BASE_URL}/discover/movie/?page=${page}&certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`
  
    axios.get(API_URL)
    .then(resp => {
      setMovies(resp.data.results)
      setLoading(false)
    })
    .catch(e => console.log(e))
  }, [page])

  const prevPage = (e) => {
    e.preventDefault()

    const prev_page = page - 1

    if(prev_page < 1) return

    setPage(prev_page)
  }

  const nextPage = (e) => {
    e.preventDefault()

    const next_page = page + 1

    if(next_page > 707) return

    setPage(next_page)
  }

  return (
    <>
      <Header />

      <div className="bg-primary p-60">
        <div className="container-column">
          <div className="products">
            { loading ? 'Loading movies...' : movies && movies.map(movie => (
              <div className="product">
                <Link to={`/product/${movie.id}`}>
                  {
                    movie.poster_path === null ? <img src={noimage} alt={movie.original_title} /> : <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                  }
                </Link>
                <div className="details">
                  <h3><Link to={`/product/${movie.id}`}>{movie.original_title}</Link></h3>
                  <p>Popularity: {movie.popularity}</p>
                  <Link to={`/product/${movie.id}`} className="details-btn">Details</Link>
                </div>
            </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-column p-60">
        <ul className="pagination">
          <li><a href="#" onClick={prevPage}>&lt;</a></li>
          <li>{page}</li>
          <li><a href="#" onClick={nextPage}>&gt;</a></li>
        </ul>
      </div>

      <Footer />
    </>
  )
}

export default Products