import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";


export const TagPeliculas = () => {
	const [peliculas, modificarPeliculas] = useState([]);
	const {actions} = useContext(Context);

	const _request = async () => {
		const res = await fetch(`${config.HOSTNAME}/films`)
		if (res.status !== 200) {
			console.log("Error request.")
			return [];
		}
		const data = await res.json();
		return data.result;
	};

	useEffect(async () => {
		let listaPeliculas;
		if (localStorage.peliculas) {
			listaPeliculas = JSON.parse(localStorage.peliculas) 
		} else {
			listaPeliculas = await _request()
			localStorage.peliculas = JSON.stringify(listaPeliculas)
		}
		modificarPeliculas(listaPeliculas)
	}, []);
		
	if (!peliculas) {
		return <div>Cargando...</div>
	}
	



	
	return (
		<div className=" d-flex container overflow-auto">
			{peliculas.map((pelicula,index)=>{
				return <div className="card m-1 text-center col-3" style={{width: "15rem"}} key={index}>
				<img src="https://via.placeholder.com/150" className="card-img-top"/>
				<div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${pelicula.properties.title}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
					<div className="card-body">
					<h5 className="card-title">{pelicula.properties.title}</h5>
					<Link to={`/pelicula/${pelicula.uid}`} className="btn btn-secondary">Info de {pelicula.properties.title}</Link>  
					</div>
				</div>
				})}
		</div>
	);
	};
	

export default TagPeliculas;