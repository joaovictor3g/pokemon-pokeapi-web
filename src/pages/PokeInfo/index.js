import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaQuestion } from 'react-icons/fa';

import api from '../../services/api';

import Modal from '../../components/Modal';

import './styles.css';

export default function PokeInfo(props) {
    const { id } = props.match.params;
    const [details, setDetails] = useState([]);
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [numberOnPoke, setNumber] = useState(1);
    const [order, setOrder] = useState(1);
    const [back, setBack] = useState('');
    const [types, setTypes] = useState([]);   
    const [abilities, setAbilities] = useState([]); 

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        loadPokemonById();
        //evolveTo();
    }, []);

    async function loadPokemonById() {
        const response = await api.get(`/pokemon/${id}`);

        setDetails(response.data);
        setName(response.data.name);
        setWeight(response.data.weight);
        setNumber(response.data.id);
        setOrder(response.data.order);
        setHeight(response.data.height);
        setBack(response.data.sprites.back_default);
        setTypes(response.data.types);
        setAbilities(response.data.abilities);

    }

    async function evolveTo() {

        try {
            const response = await api.get(`/evolution-chain/${id}`);

            console.log(response.data);
        
        } catch(err) {
            alert('erro');
        }

    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>  
            <div className="Header-container">
                <Link to="/" className="link-home">
                    Home
                </Link>
                <FaAngleRight size={20} color="#FFF" />
                <Link to="/pokedex" className="pokedex-button">
                    Pokedex
                </Link>
                <FaAngleRight size={20} color="#FFF" />
                <Link to={`/pokedex/poke-info/${id}`} className="pokedex-button">
                    PokeInfo
                </Link>
        </div>
            
        <div className="principal">
            <header className="pokemon-name">{capitalizeFirstLetter(name)} N° {id}</header>
            <div className="aside">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="image2"/>
                <img src={back} className="image2"/>

                
                <div className="image-and-info">
                    <header className="types-pokemons">
                        {types.map((typer, index) => (
                            <p key={index} className={typer.type.name}>
                                {capitalizeFirstLetter(typer.type.name)}
                            </p>    
                        ))}
                    </header>  

                    <div className="infos-from-pokemon">     
                        <span className="height-weight-order">Height: <p>{height/10} m</p>
                            Weight: <p>{weight/10} kg</p>
                            Order: <p>{order}</p>
                        </span>

                        <span className="abilities"><p>Abilities:</p> {abilities.map((ability, index) => (
                            
                            <span key={index}>

                                {capitalizeFirstLetter(ability.ability.name)}

                                <button id={index} onClick={()=>setIsModalVisible(true)}>
                                    <FaQuestion size={15} color="#00bfff" />
                                </button>    
                                {isModalVisible ? 
                                    <Modal onClose={()=>setIsModalVisible(false)}>
                                        {ability.ability.url}
                                        
                                    </Modal> : 
                                null}
                                </span>
                        ))}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
