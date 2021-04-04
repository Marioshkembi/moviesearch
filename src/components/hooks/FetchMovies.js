import { useState, useEffect } from 'react';
import axios from 'axios';

const UseFetchMovies = (url) => {
	const [isloading,setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
	
    useEffect(() => {
		
		axios.get(url)
		
           .then(data => {

				setMovies(data)
				setIsLoading(false);
				
			 }).then(res => {
				 if (res != undefined) {
					return res.json();
				 }
                 
           	})

			
	},[])

    return  {isloading,movies};
	
}
 
export default UseFetchMovies;