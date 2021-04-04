import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return ( 
        <footer className="page-footer">
            <div className="container">
                
                <div className="footer-wrapper">
                    <div className="left-side">
                        <p className="lead">© Created By Mario 2021</p>
                    </div>

                    <div className="right-side">
                    
                        <a href="https://www.instagram.com/mario.skm/">
                            <FontAwesomeIcon icon={['fab', 'instagram']}></FontAwesomeIcon>
                          
                        </a>
                    

                        <a href="mailto:marioskm7@gmail.com">
                        <FontAwesomeIcon icon={['fa', 'envelope']}/>
                            
                        </a>
                    

                        <a href="https://github.com/Marioshkembi">
                        <FontAwesomeIcon icon={['fab', 'github']}/>
                            
                        </a>
                   
                        <a href="https://www.linkedin.com/in/mario-shkembi-2054401ba/">
                            <FontAwesomeIcon icon={['fab', 'linkedin']}/>
                            
                        </a>
                   
                    </div>
                </div>

            </div>
            
        </footer> 
    );
}
 
export default Footer;