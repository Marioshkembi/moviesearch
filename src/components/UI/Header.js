import { useEffect, useState } from "react";
import { useHistory ,withRouter,NavLink} from 'react-router-dom';
import { Breakpoint } from "react-socks";
import StyledBurger from "./burger/Burger";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
const Navbar = ({ searchQuery, setSearchQuery ,setCategorie }) => {
    const history = useHistory();
    const [open,setOpen] = useState(false)

    const [genresList,setGenres] = useState([]);
    const [tvGenresList,setTvGenres] = useState([]);
  
    useEffect(() => {
		
		axios.all([axios.get(process.env.REACT_APP_GENRE_API+`/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),axios.get(process.env.REACT_APP_GENRE_API+`/tv/list?api_key=${process.env.REACT_APP_API_KEY}`)])
		
           .then(axios.spread((...responses) => {
			const resone = responses[0];
			const restwo = responses[1];
           
            setGenres(resone.data.genres.splice(0,10))
			setTvGenres(restwo.data.genres.splice(0,10))
			 })).catch(err => {
				console.log(err);
                 
           	})

	},[])

   
    const onSubmit = (e) => {
        history.replace(`/searchresults?search=${searchQuery}`);
        e.preventDefault() 
    };

    const onclick = (e) => {
        setCategorie(e.target.id)
        closeNav()
    }

    const openNav = () => {
        setOpen(!open)
        const navigation = document.querySelector('.navigation-items-overlay')
        
        if(navigation.classList.contains('overlay-mobile')) {
            const navigationmb = document.querySelector('.overlay-mobile')
            navigationmb.style.width = "60%"
        }else {
            
            navigation.style.height = "100%"
        }
        
        navigation.parentElement.classList.add('blur')
    }


    const closeNav = () => {
        setOpen(!open)
        const navigation = document.querySelector('.navigation-items-overlay')
        
        if(navigation.classList.contains('overlay-mobile')) {
            const navigationmb = document.querySelector('.overlay-mobile')
            navigationmb.style.width = "0%"
        }else {
            
            navigation.style.height = "0%"
        }
        navigation.parentElement.classList.remove('blur');
    }

   
    return ( 
        <header className="page-header">
            
            <nav className="navbar navbar-expand-lg">
           
                <div className="container">
                
                <div className="nav-bar-default">
                    <div className="branding" >
                        <a href="/" ><h4>MSDB</h4></a>
                    </div>
                    <div className="burger " onClick={openNav}>
                        <div className="burger-inner" style={{display:'flex',alignItems:'center'}}>
                            <StyledBurger className="burger-lines" open={open} setOpen={setOpen} >

                                <div></div>
                                <div></div>
                                <div></div>
                                
                            </StyledBurger><span style={{marginLeft: '5px'}}><Breakpoint medium up>Menu</Breakpoint></span>
                        </div>
                    </div>

                    <div className="form-container col-lg-10">
                            <form className="form-inline" onSubmit={onSubmit}>
                                
                                <input 
                                
                                    className="form-control input" 
                                    type="search" 
                                    placeholder="Search" 
                                    aria-label="Search" 
                                    value={searchQuery} 
                                    onInput={(e) => setSearchQuery(e.target.value) }/>    
                                
                            </form>
                    </div>
                </div>
                <Breakpoint medium down>
                    <div className="mobile-full-width">

                    
                    <div className="navigation-items-overlay overlay-mobile">
                    
                        <a className="closebtn" onClick={closeNav} >&times;</a>
                        <div className="navigation-overlay-content" style={{flexDirection:'column'}}>
                        <ul className="navbar-nav mr-auto" >
                            <li className="nav-item dropdown" style={{listStyleType:"none"}}>
                                <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                    <FontAwesomeIcon icon={['fas', 'film']} size='1x'/> Movies
                                </span>
                                </a>
                                    <div className="dropdown-menu" id="movie" aria-labelledby="navbarDropdown" style={{flexDirection:"column",backgroundColor:'inherit'}}>
                                
                                        {genresList.map(genres => (
                                            <NavLink  className='dropdown-item' to={`/moviesCategories?q=movie&id=${genres.id}`} key={genres.id}  onClick={onclick} id={genres.id}>{genres.name}</NavLink>
                                        ))}
                                   
                                    </div>
                                </li>
                            
                                <li className="nav-item dropdown" style={{listStyleType:"none"}}>
                                <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                    <FontAwesomeIcon icon={['fas', 'tv']} size='1x'/> Tv Shows
                                </span>
                                </a>
                                    <div className="dropdown-menu"  id="tv" aria-labelledby="navbarDropdown" style={{flexDirection:"column",backgroundColor:'inherit'}}>
                                
                                    {tvGenresList.map(genres => (
                                        <NavLink  className='dropdown-item' to={`/moviesCategories?q=tv&id=${genres.id}`} key={genres.id}  onClick={onclick} id={genres.id}>{genres.name}</NavLink>
                                    ))}

                                    
                                   
                                    </div>
                                </li>
                                                      
                            </ul>
                        </div>
                    </div>
                    </div>
                </Breakpoint>

                <Breakpoint large up>
                    <div className="navigation-items-overlay">
                    
                        <a className="closebtn" onClick={closeNav} >&times;</a>
                        <div className="navigation-overlay-content">
                        
                            <div className="nav-item">
                                <span className="menu-heading"><FontAwesomeIcon icon={['fas', 'film']} size='2x'/><span> Movies</span></span>

                                <ul>
                                
                                   {genresList.map(genres => (
                                       <li key={genres.id}  id="movie" style={{fontSize:'20px'}}><NavLink to={`/moviesCategories?q=movie&id=${genres.id}`} onClick={onclick} id={genres.id}>{genres.name}</NavLink></li>
                                   ))}
                                    
                                   
                                </ul>
                            </div>

                            <div className="nav-item">
                                <span className="menu-heading"><FontAwesomeIcon icon={['fas', 'tv']} size='2x'/><span>Tv</span></span>

                                <ul>
                                
                                   {tvGenresList.map(genres => (
                                       <li id="tv" key={genres.id} style={{fontSize:'20px'}}><NavLink to={`/moviesCategories?q=tv&id=${genres.id}`} onClick={onclick} id={genres.id}>{genres.name}</NavLink></li>
                                   ))}
                                    
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </Breakpoint>
                   
                </div>
                
            </nav>
        </header>
     );
}
 
export default withRouter(Navbar);