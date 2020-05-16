import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaQuestion } from 'react-icons/fa';

import api from '../../services/api';

import Modal from '../../components/Modal';
import PokemonDetail from '../../components/PokemonDetail';

import './styles.css';
import PokeballImeg from '../../assets/pokeball.svg';

export default function PokeInfo(props) {
    const { id } = props.match.params;

    const existsPokemon = JSON.parse(sessionStorage.getItem('pokeball'));

    const [front, setFront] = useState('');
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [order, setOrder] = useState(1);
    const [back, setBack] = useState('');
    const [types, setTypes] = useState([]);   
    const [abilities, setAbilities] = useState([]); 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailIsVisible, setDetailIsVisible] = useState(false);

    useEffect(() => {
        loadPokemonById();//eslint-disable-next-line
        
    }, []);

    async function loadPokemonById() {
        const response = await api.get(`/pokemon/${id}`);

        
        setName(response.data.name);
        setWeight(response.data.weight);
        setOrder(response.data.order);
        setHeight(response.data.height);
        setBack(response.data.sprites.back_default);
        setTypes(response.data.types);
        setAbilities(response.data.abilities);
        setFront(response.data.sprites.front_default);


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
                <Link to={`/pokedex/`} className="pokedex-button">
                    Pokedex
                </Link>
                <FaAngleRight size={20} color="#FFF" />
                <Link to={`/pokedex/poke-info/${id}`} className="pokedex-button">
                    PokeInfo
                </Link>
        </div>
            
        <div className="principal">
            <header className="pokemon-name">
                {!existsPokemon ? null :
                    existsPokemon.map((poke) => (
                        name === poke.name ? 
                            <img key={poke.id} src={PokeballImeg} alt="pokeball" className="pokeball-catched" /> :
                            null
                ))}
                {capitalizeFirstLetter(name)} N° {id}
                <button className="info-question"
                    onClick={()=>setDetailIsVisible(true)}
                >
                    <FaQuestion size={20}  />
                    
                </button>
                {detailIsVisible ?
                 <PokemonDetail 
                    id={id} 
                    onClose={()=>setDetailIsVisible(false)} 
                />: 
                 null}

            </header>
            <div className="aside">
                <img src={front} alt="front" className="image2"/>
                <img src={back} alt="back" className="image2"/>

                
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

                        <span className="abilities"><p>Abilities:</p> 
                            {abilities.map((ability, index) => (
                                <span key={index}>
                                    {capitalizeFirstLetter(ability.ability.name)}
                                    <button 
                                        onClick={()=>setIsModalVisible(true)}
                                    >
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
