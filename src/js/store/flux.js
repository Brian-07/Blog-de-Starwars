import { bool } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favoritos:[],
			
		},
		actions: {
			agregarFavorito: (n) => {
				
				const store = getStore()
				const auxFavoritos = [...store.favoritos];
				const resultado = auxFavoritos.map((fav)=>{
					return fav.n;
				})
				if(resultado.includes(n) == false){
					auxFavoritos.push({
						uid:auxFavoritos.length + 1,
						n,	
				});
				}else if(resultado.includes(n) == true){
					alert("Ya tienes agregado ese favorito!")
				};
				setStore({favoritos: auxFavoritos});
			},
			removerFavorito: (uid) =>{
				const store = getStore()
				const auxFavoritos = [...store.favoritos];
				const resultado = auxFavoritos.filter((fav) => fav.uid !== uid)
				setStore({favoritos: resultado});
				
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
