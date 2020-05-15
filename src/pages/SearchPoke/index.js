import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

import api from '../../services/api';

export default function SearchPoke(props) {
    const { id } = props.match.params;
    
    const [name_, setName] = useState('');
    const [pokeImage, setImage] = useState('');

    
    useEffect(() => {
        searchByName();//eslint-disable-next-line
    }, []);

    async function searchByName() {
        const response = await api.get(`/pokemon/${id}`);

        setName(response.data.name);
        setImage(response.data.sprites.front_default);

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
                <Link to={`/pokedex/search/${id}`} className="pokedex-button">
                    Search
                </Link>
            </div>
            
            <div className="principal-container"> 
            
            <table className="table-container" border="1">
                <tbody>
                    <tr className="initial-tr">
                        <td>ID</td>
                        <td>Nome</td>
                        <td></td>
                        <td></td>
                    </tr> 
                    <tr>
                        <td className="id-td">{id}</td>
                        <td className="td-name">{capitalizeFirstLetter(name_)}</td>
                        <td className="image-td"><img src={pokeImage} alt="pokemon-image"/></td>
                        <td className="actions-table">
                            <button  className="btn-1">
                            <Link to={`/pokedex/poke-info/${id}`} className="link">
                                Informations
                            </Link>
                            </button>
                            <button>Catch</button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>   

            </div>
    
        </>
    )
}
