import React, { useContext, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";




export const Navbar = () => {
	const history = useHistory()
	const {store, actions} = useContext(Context);
	const [title, setTitle] = useState('');
	const [planetas, modificarPlanetas] = useState('');
	const [personas, modificarPersonas] = useState('');


	useEffect(() => {
		loadPlanets()
		loadPerson()		
	}, [])


	const loadPlanets = () => {
		const localPlaneta = localStorage.planetas;
		const _planetas = localPlaneta ? JSON.parse(localPlaneta) : []
		modificarPlanetas(_planetas)
	}	
	const loadPerson = () => {
		const localPersona = localStorage.personas;
		const _personas = localPersona ? JSON.parse(localPersona) : []
		modificarPersonas(_personas)
	}


	
	const buscador =() => { 
		if (title === "") {
			return;
		} 
		
		const planetasResult = planetas.filter((planeta) => {
			return planeta.name.toLocaleLowerCase().includes(title)
		})

		const personasResult = personas.filter((persona) => {
			return persona.name.toLocaleLowerCase().includes(title)
		})
		
		const resultados = [
			...planetasResult,
			 ...personasResult,
		]
		return <>
			{ resultados.map((obj,i) => {
				return (
					<option key={i} value={obj.name} />
					)
				}) }
			</>
	}

	const _goTo = () => {
		if (!title) return;

		const resultadoPlanetas = planetas.filter((planeta) => {
			return planeta.name === title
		})
		const resultadoPersonas = personas.filter((persona) => {
			return persona.name === title
		})

		if (resultadoPlanetas.length > 0) {
			const planet = resultadoPlanetas[0]
			history.push(`/planeta/${planet.uid}`)
			return;
		}else if(resultadoPersonas.length > 0){
			const person = resultadoPersonas[0]
			history.push(`/persona/${person.uid}`)
			return;
		}
	}
	const _inputChange = (event) => {
		const text = event.target.value
		setTitle(text)
	}

return (
		<nav className="navbar navbar-dark bg-dark ">
			<div className="container d-flex ">
  				<div className="justify-content-start d-flex">
    				<Link to="/">
      					<img src="https://www.citypng.com/public/uploads/preview/-51608494295medy7bxbvk.png" alt="Inicio" width="80" height="40" className="d-inline-block align-text-top"></img>
					</Link>
					<div className="input-group mb-3 ms-2">
  						<input type="text" className="form-control" placeholder="Ingrese Personaje/Planeta" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={event => _inputChange(event)} list="datalistOptions"/>
						<datalist className="moko" id="datalistOptions">
							{buscador()}
						</datalist>
						<button className="btn btn-primary ms-1" onClick={_goTo}>
							Buscar
						</button>
					</div>
				</div>
				<div className="justify-content-end d-flex mb-auto">
					<div className="dropdown dropstart">
  						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true" style={{paddingRight:"inherit"}}>
    					Favoritos<span className="badge rounded-pill mx-2"style={{background:"#FF4500"}}>{store.favoritos.length}</span>
  						</button>
  						<ul className="dropdown-menu dropdown-menu-dark">
							{store.favoritos.map((fav,index)=>(
								<div className="d-flex justify-content-between" key={index}><li><a className="dropdown-item">{fav.n}</a></li>
								<button onClick={()=>{actions.removerFavorito(fav.uid)}} type="button" className="btn btn-light ms-auto me-1 mb-1"><i className="fas fa-trash-alt"></i></button>
								<li><hr className="dropdown-divider"/></li>
								</div>
								
							))}
							
  						</ul>
					</div>
				
				</div>
			</div>
		</nav>
	);
};
