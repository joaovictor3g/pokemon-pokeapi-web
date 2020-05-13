import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import api from '../../services/api';

import './styles.css';

export default function PokeInfo(props) {
    const { id } = props.match.params;
    const [details, setDetails] = useState([]);
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [numberOnPoke, setNumber] = useState(1);
    const [order, setOrder] = useState(1);
    

    useEffect(() => {
        loadPokemonById();
    }, []);

    async function loadPokemonById() {
        const response = await api.get(`/pokemon/${id}`);

        setDetails(response.data);
        setName(response.data.name);
        setWeight(response.data.weight);
        setNumber(response.data.id);
        setOrder(response.data.order);
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
            <header className="pokemon-name">{capitalizeFirstLetter(name)}</header>
            <div className="aside">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="image2"/>
            
                <div className="infos-from-pokemon">
                    <table border="1">
                        <tbody>
                            <tr className="initial-tr">
                                <td>Weight</td>
                                <td>Pokedex number</td>
                                <td>Order</td>
                                <td>Shiny version</td>
                            </tr>
                            <tr>
                                <td>{weight}</td>
                                <td>{numberOnPoke}</td> 
                                <td>{order}</td>
                                <td><img className="shiny-version" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
