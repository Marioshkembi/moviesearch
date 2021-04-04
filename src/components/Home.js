import UseFetchMovies from './hooks/FetchMovies';
import MovieGrid from './MovieGrid';
import Loading from './UI/Loading';

const Home = ( ) => {
      const  {movies,isloading} = UseFetchMovies(process.env.REACT_APP_MAIN_API+`/discover/movie?top_rated&page=1&api_key=${process.env.REACT_APP_API_KEY}`);
      
      return (
            isloading ? (
                  <Loading></Loading>
            ): (
                  <>
                  <div className="container">
                        <div className="home-heading-wrapper col-lg-5 ">
                              <h2 className="home-heading  col-7">top movies</h2>
                        </div>
                        
                  </div>
                        <MovieGrid movies={movies.data.results}></MovieGrid>
                  </>
            )
)}
 
export default Home;