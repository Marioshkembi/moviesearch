import { useEffect, useState } from "react";
import axios from 'axios';
import MovieGrid from "./MovieGrid";
import Loading from './UI/Loading';
import { Helmet, HelmetProvider } from 'react-helmet-async'
const Categories = ({ categorie }) =>  {
   
    const [isloading,setIsLoading] = useState(true);
    const [movies,setMovies] = useState([]);
    const { search } = new URL( window.location);
    const id = new URLSearchParams(search).get('id');
    const q = new URLSearchParams(search).get('q');
    const [genresList,setGenres] = useState('');
    
    useEffect(() => {
		axios.get(process.env.REACT_APP_MAIN_API+`/discover/${q}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}&include_adult=false`)
		.then (res => {
			return res;
		}).then(data => {
			setMovies(data.data.results)
            setIsLoading(false);
		}).catch(err => {
			console.log(err);
		})
	},[categorie])

    useEffect(() => {
		
		axios.get(process.env.REACT_APP_GENRE_API+`/${q}/list?api_key=${process.env.REACT_APP_API_KEY}`)
           .then(responses => {
                setGenres(responses.data.genres.filter(genre => genre.id == id).map(genree => {return genree.name}));
			 }).catch(err => {
				console.log(err);   
           	})
	},[categorie])

 
        return ( 
            isloading ? (
                <Loading></Loading>
             ): (
                 
                <HelmetProvider>
                    
                    <Helmet>
                   
                         <title>{`MSDB - `  + genresList}</title>
                        
                    </Helmet>
                    
                    <MovieGrid movies={movies}></MovieGrid>

                </HelmetProvider>
                
             )
         );
    }

 
export default Categories;