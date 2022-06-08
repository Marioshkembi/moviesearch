import { useState, useEffect } from 'react';
import axios from 'axios';
import nullprofile from '../../assets/images/nullprofile.jpg'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Virtual,EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import  { Breakpoint } from 'react-socks';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Virtual,EffectFade]);

const Cast = ({ movieid }) => {
    
    const [credits,setCredits] = useState([]);
    
    useEffect(() => {
		axios.get(process.env.REACT_APP_MAIN_API+`/${movieid}/credits?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`)
        .then(data => {
            setCredits(data.data.cast.slice(0,18))
			       
         }).then(res => {
            return res;
        })
	},[movieid])
    
    return (
        <section className="cast">
           
           <Breakpoint customQuery='(min-width:975px)' className="desktop-cast-wrapper">
                {credits.map(actor => (
                        
                        <div className="actor" id={actor.id} key={actor.id}>
                            
                            {actor.profile_path == null &&
									<div className="actor-img-wrapper" style={{backgroundImage: `url(${nullprofile})`}}></div>
								}
                                {actor.profile_path != null &&
                                    <div className="actor-img-wrapper" style={{backgroundImage: `url(${process.env.REACT_APP_POSTER_API_S + actor.profile_path})`}}></div>
                                }
                            

                            <div className="actor-info-wrapper">
                                <span className="actor-name">{actor.name}</span>
                                <span className="character">{actor.character}</span>
                            </div>
                        </div>
                     
                ))}
            </Breakpoint>
           
            <Breakpoint customQuery='(min-width:380px) and (max-width: 740px)' className="mobile-cast-wrapper">
                <Swiper slidesPerView={3} spaceBetween={15}>
                    {credits.map(actor => (
                
                        <SwiperSlide key={actor.id}  >
                            <div className="actor" id={actor.id}>
                                <div className="actor-img-wrapper" >
                                {actor.profile_path == null &&
									<img  className="act-img" src={nullprofile}></img>
								}
                                {actor.profile_path != null &&
                                    <img className="act-img" src={process.env.REACT_APP_POSTER_API_S + actor.profile_path } alt="" />
                                }
                                </div>

                                <div className="actor-info-wrapper">
                                    <span className="actor-name">{actor.name}</span>
                                    <span className="character">{actor.character}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                      
                    ))}
                </Swiper>
            </Breakpoint>

            
            <Breakpoint customQuery='(max-width:379px)' className="mobile-cast-wrapper">
                <Swiper slidesPerView={2} spaceBetween={0}>
                    {credits.map(actor => (
                
                        <SwiperSlide key={actor.id}  >
                            <div className="actor" id={actor.id}>
                                <div className="actor-img-wrapper" >
                                {actor.profile_path == null &&
									<img  className="act-img" src={nullprofile}></img>
								}
                                {actor.profile_path != null &&
                                    <img className="act-img" src={process.env.REACT_APP_POSTER_API_S + actor.profile_path } alt="" />
                                }
                                </div>

                                <div className="actor-info-wrapper">
                                    <span className="actor-name">{actor.name}</span>
                                    <span className="character">{actor.character}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                      
                    ))}
                </Swiper>
            </Breakpoint>

            <Breakpoint customQuery='(min-width:741px) and (max-width: 973px)'  className="mobile-cast-wrapper">
                <Swiper slidesPerView={4} spaceBetween={25}>
                    {credits.map(actor => (
                
                        <SwiperSlide key={actor.id}  >
                            <div className="actor" id={actor.id}>
                                <div className="actor-img-wrapper" >
                                {actor.profile_path == null &&
									<img  className="act-img" src={nullprofile}></img>
								}
                                {actor.profile_path != null &&
                                    <img className="act-img" src={process.env.REACT_APP_POSTER_API_S + actor.profile_path } alt="" />
                                }
                                </div>

                                <div className="actor-info-wrapper">
                                    <span className="actor-name">{actor.name}</span>
                                    <span className="character">{actor.character}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                      
                    ))}
                </Swiper>
            </Breakpoint>
          
        </section>
     );
}
 
export default Cast;