import Movie from "./Movies";
import { Link } from 'react-router-dom';

const MovieGrid = ({ movies }) => {
    
    return ( 
        
        <div className="container">
            <section>
                <div className="movies-wrapper">
               
                    {movies.filter(type => type.media_type !== 'person').map(movie => (
                          
                           movie.hasOwnProperty('media_type') == true? <Link to={`/moviedetails?type=${movie.media_type}/${movie.id}`} key={movie.id}>
                            <div className="movie" id={movie.id} >
                                
                                {movie.hasOwnProperty('name') == true? <Movie  overview={movie.overview} title={movie.name} vote_average={movie.vote_average} poster_path={movie.poster_path}></Movie>
                                :<Movie key={movie.id} overview={movie.overview} title={movie.title} vote_average={movie.vote_average} poster_path={movie.poster_path} ></Movie>}
                            
                            </div>
                        </Link>
                            :movie.hasOwnProperty('first_air_date') !=true ? <Link key={movie.id} to={`/moviedetails?type=movie/${movie.id}`}>
                                <div className="movie" id={movie.id} >
                             
                                    {movie.hasOwnProperty('name') == true? <Movie  overview={movie.overview} title={movie.name} vote_average={movie.vote_average} poster_path={movie.poster_path}></Movie>
                                    :<Movie overview={movie.overview} title={movie.title} vote_average={movie.vote_average} poster_path={movie.poster_path} ></Movie>}
                         
                                </div>
                         </Link>
                            :<Link key={movie.id} to={`/moviedetails?type=tv/${movie.id}`}>
                                <div className="movie" id={movie.id} >
                             
                                    {movie.hasOwnProperty('name') == true? <Movie  overview={movie.overview} title={movie.name} vote_average={movie.vote_average} poster_path={movie.poster_path}></Movie>
                                    :<Movie overview={movie.overview} title={movie.title} vote_average={movie.vote_average} poster_path={movie.poster_path} ></Movie>}
                                
                                </div>
                            </Link>
                    ))}
                    
                </div>
            </section>
        </div>
        
     );
}
 
export default MovieGrid;