import { useState, useEffect } from 'react';
import axios from 'axios';

const UseFetchMovies = (url) => {
	const [isloading,setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
	const [error,setError] = useState(null);
    useEffect(() => {
		
		axios.get(url)
			
           .then(data => {
				// if(data.data.total_results !==0 ) {
				    setMovies(data.data)
				    setIsLoading(false);
				    setError(null);
				// }else {
				//     throw Error('could not fetch the data for that resource');
				// }
				
				
			 }).catch (err => {
				    setIsLoading(false)
				    setError(err.message)
				    setMovies([])
							
				})

			
	},[])

    return  {isloading,movies};
	
}
 
export default UseFetchMovies;