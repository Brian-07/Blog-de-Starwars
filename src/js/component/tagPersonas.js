import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";


export const TagPersonas = () => {
	const [personas, modificarPersonas] = useState([]);
	const {actions} = useContext(Context)


	const _request = async () => {
		const res = await fetch(`${config.HOSTNAME}/people`)
		if (res.status !== 200) {
			console.log("Error request.")
			return [];
		}
		const data = await res.json();
		return data.results;
	};

	useEffect(async () => {
		let listaPersonas;
		if (localStorage.personas) {
			listaPersonas = JSON.parse(localStorage.personas) 
		} else {
			listaPersonas = await _request()
			localStorage.personas = JSON.stringify(listaPersonas)
		}
		modificarPersonas(listaPersonas)
	}, []);
		
	if (!personas) {
		return <div>Cargando...</div>
	}
	

	
	return (
		<div className=" d-flex container overflow-auto">
			{personas.map((persona,index)=>{
				return <div className="card m-1 text-center col-3" style={{width: "15rem"}} key={index}>
				<img src="https://via.placeholder.com/150" className="card-img-top"/>
				<div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${persona.name}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
					<div className="card-body">
					<h5 className="card-title">{persona.name}</h5>
					<Link to={`/persona/${persona.uid}`} className="btn btn-primary">Info de {persona.name}</Link>
					</div>
				</div>
				})}
		</div>
	);
	};

export default TagPersonas;