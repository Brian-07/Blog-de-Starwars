import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";

export const TagEspecies = () => {
	const [especies, modificarEspecies] = useState([]);
	const {actions} = useContext(Context)

	const _request = async () => {
		const res = await fetch(`${config.HOSTNAME}/species`)
		if (res.status !== 200) {
			console.log("Error request.")
			return [];
		}
		const data = await res.json();
		return data.results;
	};

	useEffect(async () => {
		let listaEspecies;
		if (localStorage.especies) {
			listaEspecies = JSON.parse(localStorage.especies) 
		} else {
			listaEspecies = await _request()
			localStorage.especies = JSON.stringify(listaEspecies)
		}
		modificarEspecies(listaEspecies)
	}, []);
		
	if (!especies) {
		return <div>Cargando...</div>
	}
	


	
	return (
		<div className=" d-flex container overflow-auto">
			{especies.map((especie,index)=>{
				return <div className="card m-1 text-center col-3" style={{width: "15rem"}} key={index}>
				<img src="https://via.placeholder.com/150" className="card-img-top"/>
				<div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${especie.name}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
					<div className="card-body">
					<h5 className="card-title">{especie.name}</h5>
					<Link to={`/especie/${especie.uid}`} className="btn btn-danger">Info de {especie.name}</Link>  
					</div>
				</div>
				})}
		</div>
	);
	};	
export default TagEspecies;