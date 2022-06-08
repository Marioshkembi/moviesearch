import { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';
import Loading from './UI/Loading';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UseFetchMovies from './hooks/FetchMovies';

const SearchResult = ({moviesSearch}) => {

    const [isloading,setIsLoading] = useState(true);
    const [movies,setMovies] = useState([]);
    const [error,setError] = useState(null);
    
    const search_api = moviesSearch && process.env.REACT_APP_SEARCH_API+`api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${moviesSearch}`;
    // const {movies,isloading} = UseFetchMovies(search_api);
    
    useEffect(() => {
		
		axios.get(search_api)
            .then(data => {
                
                if(data.data.total_results !=0) {
                    setMovies(data.data.results)
                    setIsLoading(false);
                    setError(null);
                   
                }else {
                    throw Error('could not fetch the data for that resource');
                }
            }).catch (err => {
                setIsLoading(false)
                setError(err.message)
                setMovies([])
                
            })

	},[moviesSearch])

   
    return (    
    <>
        {isloading && <Loading></Loading>}

        {error && <div className="container">{error}</div>}

        {movies &&
            <HelmetProvider>
                <Helmet>
                    <title>MSDB - Search</title>
                </Helmet>

                
                <MovieGrid movies={movies}></MovieGrid>
                
            </HelmetProvider>
        }
    </>
    
       
    );
}
 
export default SearchResult;