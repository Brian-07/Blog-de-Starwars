import React, {useContext,useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";

const Especie = (props) => {
    const {actions} = useContext(Context)
    const params = useParams();
    const [detalle, modificarDetalle] = useState({});
    const [cargando,modificarCargando] = useState(true);

    useEffect(async () => {
        const res = await fetch(`${config.HOSTNAME}/species/${params.uid}`);
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
                    <img src="https://via.placeholder.com/200/FF0000/FFFFFF" className="img-fluid rounded-start m-1" />
                 </div>
                    <div className="col-md-8">
                        <div className="card-body">
                             <h2 className="card-title">{detalle.properties.name}</h2>
                             <p className="card-text">{detalle.description}</p>
                             <div className="d-flex justify-content-end"><button onClick={()=>{actions.agregarFavorito(`${detalle.properties.name}`)}} type="button" className="btn btn-info d-flex justify-content-center" style={{width: "30px",height:"30px"}}><i className="fas fa-heart"></i></button></div>
                        </div>
                    </div>
                        <div className="card-footer bg-transparent d-flex row justify-content-center container col ms-1">
                            <div className="mt-1 col-2"><h6>Classification:</h6><p>{detalle.properties.classification}</p></div>
                            <div className="mt-1 col-2"><h6>Designation:</h6> <p>{detalle.properties.designation}</p></div>
                            <div className="mt-1 col-2"><h6>Average Height:</h6> <p>{detalle.properties.average_height}</p></div>
                            <div className="mt-1 col-2"><h6>Average Lifespan:</h6> <p>{detalle.properties.average_lifespan}</p></div>
                            <div className="mt-1 col-2"><h6>Language:</h6> <p>{detalle.properties.language}</p></div>
                            <div className="mt-1 col-2"><h6>Eye Colors:</h6> <p>{detalle.properties.eye_colors}</p></div>
                         </div>
                </div>
            </div>
        </div>
    );
};

export default Especie;