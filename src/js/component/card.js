import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Card = (props) => {
    const [likeButton, setLikeButton] = useState("bi-heart");
    const [likeValidator, setLikeValidator] = useState(false);
    const [typeView, setTypeView] = useState("");
    const [src, setSrc] = useState("");

    const { store, actions } = useContext(Context);

    const handleClick = () => {
        actions.getDetails(props.url);
    };

    const favoriteList = () => {
        if (!likeValidator) {
            actions.setFavoriteArray(props.name);
            setLikeButton("bi-heart-fill");
            setLikeValidator(true);
        } else {
            actions.deleteFavorite(props.name);
            setLikeButton("bi-heart");
            setLikeValidator(false);
        }
    };

    // Actualiza el estado de "like" cuando cambia la lista de favoritos
    useEffect(() => {
        if (store.favoriteArray.includes(props.name)) {
            setLikeValidator(true);
            setLikeButton("bi-heart-fill");
        } else {
            setLikeValidator(false);
            setLikeButton("bi-heart");
        }
    }, [store.favoriteArray, props.name]);

    useEffect(() => {
        if (store.people.some(item => item.properties.name === props.name)) {
            setTypeView("people");
            setSrc(`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`);
        } else if (store.planets.some(item => item.properties.name === props.name)) {
            setTypeView("planets");
            setSrc(props.uid === 1 
                ? "https://starwars-visualguide.com/assets/img/placeholder.jpg" 
                : `https://starwars-visualguide.com/assets/img/planets/${props.uid}.jpg`
            );
        } else if (store.starships.some(item => item.properties.name === props.name)) {
            setTypeView("starships");
            setSrc([2, 3].includes(props.uid) 
                ? "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                : `https://starwars-visualguide.com/assets/img/starships/${props.uid}.jpg`
            );
        }
    }, [store.people, store.planets, store.starships, props.name, props.uid]);

    return (
        <div className="card m-3" style={{ width: "18rem" }}>
            <div className="img-style">
                <img src={src} loading="lazy" className="card-img-top" alt={props.name} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Some quick example text...</p>
                {props.gender && <p>Gender: {props.gender}</p>}
                {props.eye_color && <p>Eye Color: {props.eye_color}</p>}
                {props.hair_color && <p>Hair Color: {props.hair_color}</p>}
                {props.population && <p>Population: {props.population}</p>}
                {props.terrain && <p>Terrain: {props.terrain}</p>}
                {props.climate && <p>Climate: {props.climate}</p>}
                {props.passengers && <p>Passengers: {props.passengers}</p>}
                {props.model && <p>Model: {props.model}</p>}
                {props.cargo_capacity && <p>Cargo Capacity: {props.cargo_capacity}</p>}
                <div className="d-flex justify-content-between">
                    <Link to={`info/${typeView}/${props.uid}`} ><button className="btn btn-primary" onClick={handleClick}>Learn More!</button></Link>
                    <i className={`bi ${likeButton}`} onClick={favoriteList}></i>
                </div>
            </div>
        </div>
    );
};
