import React from "react";
import "../../styles/home.css";
import TagPlanetas from "../component/tagPlanetas";
import TagPersonas from "../component/tagPersonas";
import TagEspecies from "../component/tagEspecies";
import TagVehiculos from "../component/tagVehiculos";
import TagNaves from "../component/tagNaves";
import TagPeliculas from "../component/tagPeliculas";


export const Home = () => {
	
	return (
		 <div>
			<div className="overflow-auto border border-success m-5"><h3 style={{color:"green"}}>Planetas</h3><TagPlanetas/></div>
		 	<div className="overflow-auto border border-primary m-5"><h3 style={{color:"blue"}}>Personas</h3><TagPersonas/></div>
		 	<div className="overflow-auto border border-danger m-5"><h3 style={{color:"red"}}>Especies</h3><TagEspecies/></div>
		 	<div className="overflow-auto border border-dark m-5"><h3 style={{color:"white"}}>Vehiculos</h3><TagVehiculos/></div>
		 	<div className="overflow-auto border border-warning m-5"><h3 style={{color:"yellow"}}>Naves</h3><TagNaves/></div>
			<div className="overflow-auto border border-secondary m-5"><h3 style={{color:"gray"}}>Películas</h3><TagPeliculas/></div>
		 </div>
	);
	};

