import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";

const Pelicula = (props) => {
    const {actions} = useContext(Context)
    const params = useParams();
    const [detalle, modificarDetalle] = useState({});
    const [cargando,modificarCargando] = useState(true);

    useEffect(async () => {
        const res = await fetch(`${config.HOSTNAME}/films/${params.uid}`);
        const data = await res.json();
        modificarDetalle(data.result);
        modificarCargando(false);
    }, []);

    if(cargando){
        return  <div className="d-flex justify-content-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    };

    return ( <div className="container d-flex justify-content-center">
          <div className="card mb-3" style={{width: "700px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/600x800" className="img-fluid rounded-start m-1" />
                 </div>
                    <div className="col-md-8">
                        <div className="card-body">
                             <h2 className="card-title">{detalle.properties.title}</h2>
                             <p className="card-text">{detalle.properties.opening_crawl}</p>
                             <div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${detalle.properties.title}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
                        </div>
                    </div>
                        <div className="card-footer bg-transparent d-flex row justify-content-center container col ms-1">
                            <div className="mt-1 col-2"><h6>Episode:</h6><p>{detalle.properties.episode_id}</p></div>
                            <div className="mt-1 col-2"><h6>Director:</h6> <p>{detalle.properties.director}</p></div>
                            <div className="mt-1 col-2"><h6>Release date:</h6> <p>{detalle.properties.release_date}</p></div>
                            <div className="mt-1 col-2"><h6>Producer:</h6> <p>{detalle.properties.producer}</p></div>
                            <div className="mt-1 col-2"><h6>Edited:</h6> <p>{detalle.properties.edited}</p></div>
                            <div className="mt-1 col-2"><h6>Created:</h6> <p>{detalle.properties.created}</p></div>
                         </div>
                </div>
            </div>
        </div>
    );
};

export default Pelicula;