
import './fontawesome';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import  "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import Footer from './components/UI/Footer';
import Home from './components/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Moviedetails from './components/Moviedetails';
import Navbar from './components/UI/Header';
import SearchResult from './components/searchresults';
import Categories from './components/moviesCategories';
import  { BreakpointProvider } from 'react-socks';

const dotenv = require('dotenv').config()

function App() {
	const { search } = new URL( window.location);
    const query = new URLSearchParams(search).get('search');
    const [searchQuery, setSearchQuery] = useState(query || '');
	const [categorie, setCategorie] = useState('');

    return(
		<BreakpointProvider>
			<Router>

				<div className="App">
					<Navbar 
						searchQuery={searchQuery} 
						setSearchQuery={setSearchQuery} 
						setCategorie={setCategorie}
						>
						
					</Navbar>
				
					<main className="main-content">

						<Switch>
						
							<Route exact path="/" component={Home}/>							
								
							<Route path={`/moviedetails/:type?/:id?`} component={Moviedetails} />    
											
							<Route path={`/searchresults`} >
								<SearchResult moviesSearch={searchQuery}/>
							</Route>

							<Route path={`/moviescategories/:q?/:id?`} >
								<Categories categorie={categorie}/>
							</Route>

						</Switch>

					</main>
						
					<Footer></Footer>

				</div>

			</Router>
		</BreakpointProvider>
	)
}

export default App;
