import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import Planeta from "./views/planeta";
import Persona from "./views/persona";
import Vehiculo from "./views/vehiculo";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Especie from "./views/especie";
import Nave from "./views/nave";
import Pelicula from "./views/pelicula";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/planeta/:uid">
							<Planeta />
						</Route>
						<Route exact path="/persona/:uid">
							<Persona />
						</Route>
						<Route exact path="/especie/:uid">
							<Especie />
						</Route>
						<Route exact path="/vehiculo/:uid">
							<Vehiculo />
						</Route>
						<Route exact path="/nave/:uid">
							<Nave />
						</Route>
						<Route exact path="/pelicula/:uid">
							<Pelicula />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
