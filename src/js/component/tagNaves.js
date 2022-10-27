import React, { useContext,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";


export const TagNaves = () => {
	const [naves, modificarNaves] = useState([]);
	const {actions} = useContext(Context)



	const _request = async () => {
		const res = await fetch(`${config.HOSTNAME}/starships`)
		if (res.status !== 200) {
			console.log("Error request.")
			return [];
		}
		const data = await res.json();
		return data.results;
	};

	useEffect(async () => {
		let listaNaves;
		if (localStorage.naves) {
			listaNaves = JSON.parse(localStorage.naves) 
		} else {
			listaNaves = await _request()
			localStorage.naves = JSON.stringify(listaNaves)
		}
		modificarNaves(listaNaves)
	}, []);
		
	if (!naves) {
		return <div>Cargando...</div>
	}
	


	
	return (
		<div className=" d-flex container overflow-auto">
			{naves.map((nave,index)=>{
				return <div className="card m-1 text-center col-3" style={{width: "15rem"}} key={index}>
				<img src="https://via.placeholder.com/150" className="card-img-top"/>
				<div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${nave.name}`)}}  type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
					<div className="card-body">
					<h5 className="card-title">{nave.name}</h5>
					<Link to={`/nave/${nave.uid}`} className="btn btn-warning">Info de {nave.name}</Link>  
					</div>
				</div>
				})}
		</div>
	);
	};	
export default TagNaves;