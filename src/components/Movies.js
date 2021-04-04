import React from 'react';
import nullmovie from '../assets/images/nullmovie.jpg';


const Movie = ({ overview,title,vote_average,poster_path }) => {
   
   

    return (
            <>
                { poster_path === null &&
                    <img className="movie-poster" src={nullmovie} alt={title}></img>
                }

                {poster_path !== null &&
                    <img className="movie-poster" src={process.env.REACT_APP_POSTER_API_S + poster_path} alt={title}></img>
                }
                                                
                <div className="movie-info">

                    <h3 className="movie-title">{title}</h3>
                    <p className="vote-avg">{vote_average}</p>

                </div>

                <div className="overview">

                    <h4>Overview:</h4>

                    <p>{overview}</p>

                </div>
               
            </>
    )
};

export default Movie;



