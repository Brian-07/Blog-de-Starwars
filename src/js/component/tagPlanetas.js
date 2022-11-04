import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import Planeta from "../views/planeta";
import { Context } from "../store/appContext";


export const TagPlanetas = () => {
	const [planetas, modificarPlanetas] = useState(null);
	const {actions} = useContext(Context)
	
	const _request = async () => {
		const res = await fetch(`${config.HOSTNAME}/planets`)
		if (res.status !== 200) {
			return [];
		}
		const data = await res.json();
		return data.results;

	}

	useEffect(async () => {
		let listaPlanetas;
		if (localStorage.planetas) {
			listaPlanetas = JSON.parse(localStorage.planetas) 
		} else {
			listaPlanetas = await _request()
			localStorage.planetas = JSON.stringify(listaPlanetas)
		}
		modificarPlanetas(listaPlanetas)
	}, []);

	if (!planetas) {
		return <div>Cargando...</div>
	}
	
	return (
		<div className=" d-flex container overflow-auto">
			{planetas.map((planeta,index)=>{
				return <div className="card m-1 text-center col-3" style={{width: "15rem"}} key={index}>
							<img src="https://via.placeholder.com/150" className="card-img-top"/>
							<div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${planeta.name}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
								<div className="card-body">
				  				<h5 className="card-title">{planeta.name}</h5>
								<Link to={`/planeta/${planeta.uid}`} className="btn btn-success">Info de {planeta.name}</Link>  
								</div>
			  	</div>
				})}
		</div>
	);
	};
export default TagPlanetas;