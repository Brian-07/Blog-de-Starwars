import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";

const Persona = (props) => {
    const {actions} = useContext(Context)
    const params = useParams();
    const [detalle, modificarDetalle] = useState({});
    const [cargando,modificarCargando] = useState(true);

    useEffect(async () => {
        const res = await fetch(`${config.HOSTNAME}/people/${params.uid}`);
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
                    <img src="https://via.placeholder.com/200/0000FF/808080" className="img-fluid rounded-start m-1" />
                 </div>
                    <div className="col-md-8">
                        <div className="card-body">
                             <h2 className="card-title">{detalle.properties.name}</h2>
                             <p className="card-text">{detalle.description}</p>
                             <div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${detalle.properties.name}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
                        </div>
                    </div>
                        <div className="card-footer bg-transparent d-flex row justify-content-center container col ms-1">
                            <div className="mt-1 col-2"><h6>Height:</h6><p>{detalle.properties.height}</p></div>
                            <div className="mt-1 col-2"><h6>Mass:</h6> <p>{detalle.properties.mass}</p></div>
                            <div className="mt-1 col-2"><h6>Hair Color:</h6> <p>{detalle.properties.hair_color}</p></div>
                            <div className="mt-1 col-2"><h6>Skin Color:</h6> <p>{detalle.properties.skin_color}</p></div>
                            <div className="mt-1 col-2"><h6>Eye Color:</h6> <p>{detalle.properties.eye_color}</p></div>
                            <div className="mt-1 col-2"><h6>Birth Year:</h6> <p>{detalle.properties.birth_year}</p></div>
                         </div>
                </div>
            </div>
        </div>
    );
};

export default Persona;