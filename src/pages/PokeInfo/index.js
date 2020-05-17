import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaQuestion, FaInfoCircle } from 'react-icons/fa';

import api from '../../services/api';

import Modal from '../../components/Modal';
import PokemonDetail from '../../components/PokemonDetail';
import MoveDescription from '../../components/MoveDescription';

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
    const [moves, setMoves] = useState([]);
    const [indice, setIndice] = useState(0);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailIsVisible, setDetailIsVisible] = useState(false);
    const [isMoveDescriptionVisible, setIsMoveDescription] = useState(false);

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
        setMoves(response.data.moves);
        //console.log(response.data.moves);

    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function letVisible(e) {
        if(e.target.value===indice) 
            setIsMoveDescription(true);
      
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
                                        id={index}
                                        type="button"
                                        onChange={e=>setIndice(e.target.id)}
                                        value={indice}
                                    >
                                        <FaQuestion size={15} color="#00bfff" />
                                    </button>    

                                    {isModalVisible && index===indice ? 
                                        <Modal onClose={()=>setIsModalVisible(false)}>
                                            {ability.ability.url}
                        
                                        </Modal>: 
                                    null}
                                </span>
                        ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="move-informations">
            <header className="moves" >
                Moves
            </header>
            
            <div className="move-description">
                {moves.map((move, index) => (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    <div className="move-name-description" key={index}>
                        <p>{move.move.name}</p>
                        <button
                            onClick={()=>setIsMoveDescription(true)}
                            id="mover"
                        >
                            <FaInfoCircle size={30} color="blue" />
                        </button>

                        
                    </div>
                ))}
                {isMoveDescriptionVisible ? 
                    <MoveDescription
                        onClose={()=>setIsMoveDescription(false)}   
                    >
                    </MoveDescription>:
                null}
            </div>
        </div>
        </>
    )
}