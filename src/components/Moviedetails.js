import nullmovie from '../assets/images/nullmovie.jpg';
import React from 'react'
import axios from 'axios';
import UseFetchMovies from './hooks/FetchMovies';
import { useState, useEffect } from 'react';
import Loading from './UI/Loading'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/styles/movieDetails.css';
import  { Breakpoint } from 'react-socks';
import Cast from './moviedetails/castComponent';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Thumbs]);

const Moviedetails = () => {
	
	const { search } = new URL( window.location);
    const query = new URLSearchParams(search).get('type');
	
	const [crew,setCrew] = useState([]);
    const [posters, setPosters] = useState([]);
	const [vidId, setVidId] = useState([]);
	const [trailers, setTrailers] = useState([]);
	const {movies,isloading} = UseFetchMovies(process.env.REACT_APP_MAIN_API+`/${query}?api_key=${process.env.REACT_APP_API_KEY}`);
	const crews_api = process.env.REACT_APP_MAIN_API+`/${query}/credits?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`;
	const posters_api= process.env.REACT_APP_MAIN_API+`/${query}/images?api_key=${process.env.REACT_APP_API_KEY}&language=en`;
	
	useEffect(() => {
		axios.get(process.env.REACT_APP_MAIN_API+`/${query}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
		.then (res => {
			return res;
		}).then(data => {
			setVidId(data.data.results[0].key)
		}).catch(err => {
			console.log(err);
		})
	},[movies])

	
	useEffect(() => {
		axios.get(process.env.REACT_APP_YT_API_FIRST_HALF + `${vidId}` + process.env.REACT_APP_YT_API_SECOND_HALF)
		.then (res => {
			return res;
		}).then(data => {
			setTrailers(data.data.items)
		})
	},[vidId])
	

	useEffect (() =>{
		axios.all([axios.get(crews_api),axios.get(posters_api)])
		.then (
			axios.spread((...responses) => {
			const resone = responses[0];
			const restwo = responses[1];
			
			setCrew(resone.data.crew.filter(director => director.job == 'Director'))
			setPosters(restwo.data.posters)
		})).catch(errors => {
			console.error(errors);
		})
	},[])

	
	const bg = {
        backgroundColor: 'white'
    }


    return ( 
		
        isloading ? (
            <Loading></Loading>
        ):   ( 
			<HelmetProvider>
				<Helmet>
					{movies.data.hasOwnProperty('name') != true ?<title>{'MSDB - '+movies.data.title +' ('+ movies.data.release_date.slice(0,4)+')'}</title>
					:<title>{'MSDB - '+movies.data.name }</title>}
					<meta name="description" content={movies.data.title+', '+movies.data.release_date+', '+movies.data.overview}></meta>
				</Helmet>
				<section className="header-section">
				<div className="container">
					<div className="title-block col-xl-12 col-md-12">
					
							<div className="left-side-wrapper ">
							{movies.data.hasOwnProperty('name') != true ?
							<h1>{movies.data.title }</h1>:<h1>{movies.data.name }</h1>}
								{movies.data.hasOwnProperty('release_date') == true ?
								<span><span className="release">Release Date:</span> {movies.data.release_date.slice(0,4)}</span>
								:<span>
									{movies.data.first_air_date.slice(0,4) - movies.data.last_air_date.slice(0,4) !=0 && 
										<span className="release">Aired: {movies.data.first_air_date.slice(0,4)} - {movies.data.last_air_date.slice(0,4)}</span>
									}

									{movies.data.first_air_date.slice(0,4) - (movies.data.last_air_date.slice(0,4)) == 0 && 
										<span className="release">First episode: {movies.data.first_air_date.slice(0,4)} -</span>
									}
								</span>}
							</div>

							<div className="right-side-wrapper">
								<span className="vote">{movies.data.vote_average}</span>
							</div>
						</div>
					</div>
				</section>
				
				<section className="hero" style={{backgroundImage: `url(${process.env.REACT_APP_POSTER_API+movies.data.poster_path})` }}>
					<div className="hero-wrapper">
						<div className="container-md">
							<div className="hero-poster-trailer-wrapper col-xl-12 col-md-12">
								<div className="hero-poster-img">
								{ movies.data.poster_path === null &&
									<img src={nullmovie}></img>
								}
								{ movies.data.poster_path !== null &&
									<img src={process.env.REACT_APP_POSTER_API + movies.data.poster_path} ></img>
								}
								</div>
								
								{trailers.map(trailer => (

									<div className="youtube-embed" key={trailer.id}>
										<iframe
											width="873"
											height="500"
											src={`https://www.youtube.com/embed/${trailer.id}`}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											title="Embedded youtube"
											
										/>
										
									</div>
									
								))}

							</div>

							<div className="overview-genre-wrapper col-xl-12 col-md-13">
								<div className="overview-director-wrapper ">
									<div className="director-wrapper">
										<div className="director">
											{crew.length>1 && 
												<span className="job">Directors</span>
											}
											{crew.length <=1 && <span className="job">Director</span>}
											{crew.map((filtered) => (	
												<span className="name" key={filtered.id}> {filtered.name}</span>
												))}
											</div>
									</div>
										<div className="overview-wrapper">
											
											<p className="overview">{movies.data.overview}</p>
										</div>
									
								</div>
								
								<div className="movie-genres">
									{movies.data.genres.map(genre => (		
										<div className="genre" key={genre.id} id={genre.id}>
											<p>{genre.name}</p>
										</div>
									))}

								</div>
							</div>
	
						</div>					
					</div>
				</section>

				{posters.length >0 &&
					<section className="media-posters-wrapper-section">
						<div className="container-md" >
						<div className="media-wrapper col-xl-12 col-md-12" >
						
							<h3>Gallery :</h3>
							<Breakpoint small down>
								<div className="mobile-media-slider">
									<Swiper slidesPerView={3} spaceBetween={3} className="posters-slider-wrapper">
											
										{posters.map((img) => (
													
											<SwiperSlide id={img.file_path} key={img.file_path}>
													
												<img src={process.env.REACT_APP_POSTER_API_S + img.file_path} ></img>
													
											</SwiperSlide>
																
										))}
									
									</Swiper>
								</div>
							</Breakpoint>

							<Breakpoint medium up>
								<div className="desktop-media-slider">
									<Swiper slidesPerView={4} spaceBetween={10} className="posters-slider-wrapper ">
											
										{posters.map((img,index=0) => (
													
											<SwiperSlide id={index++} key={index++}>
												
												<img src={process.env.REACT_APP_POSTER_API_S + img.file_path} ></img>
												
											</SwiperSlide>
																
										))}
									
									</Swiper>
								</div>
							</Breakpoint>
							</div>
						</div>
					</section>
				}
				<section className="movie-cast-section" style={bg}>
					<div className="container-md">
						<div className="col-xl-12 col-md-12 col-12">
							<div className="heading">
								<h2 className="section-heading">Cast:</h2>
							</div>
							<Cast  movieid={query}></Cast>
						</div>
					</div>
				</section>

		</HelmetProvider>
        )
    
    );
}
 
export default Moviedetails;