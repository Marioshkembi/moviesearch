import { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';
import Loading from './UI/Loading';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SearchResult = ({moviesSearch}) => {
    const [isloading,setIsLoading] = useState(true);
    
    const [movies,setMovies] = useState([]);
   
    const api2 = process.env.REACT_APP_SEARCH_API+`api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${moviesSearch}&page=1&include_adult=false`
    useEffect(() => {
		
		axios.get(api2)
        .then(data => {
                setMovies(data.data.results)
                setIsLoading(false);
               
            }).catch (err => {
                
                setIsLoading(false)
                console.log(err.message);
            })

	},[moviesSearch])
   
    return (    
      isloading ?(
      <Loading></Loading>
      )
    :(
        <HelmetProvider>
            <Helmet>
                <title>MSDB - Search </title>
            </Helmet>
            <MovieGrid movies={movies}></MovieGrid>
        </HelmetProvider>
    )
       
    );
}
 
export default SearchResult;