import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

export default function CatchPoke() {
    const [myPokemons, setMyPokemons] = useState([]);

    useEffect(() => {
        getMyPokemons();
    }, []);

    function getMyPokemons() {
        const response = JSON.parse(sessionStorage.getItem('pokeball'));

        setMyPokemons(response);
    
        
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
            <Link to="/pokedex/your-pokemons" className="pokedex-button">
                Pokemons
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
                    {myPokemons.map((pokemon, index) => (
                        <tr key={index}>
                            <td className="id-td">{pokemon.id}</td>
                            <td className="td-name">{capitalizeFirstLetter(pokemon.name)}</td>
                            <td className="image-td">
                                <img 
                                    src={pokemon.image} 
                                    alt="pokemon"
                                />
                            </td>

                            <td className="actions-table">
                                <button  className="btn-1">
                                    <Link to={`/pokedex/poke-info/${pokemon.id}`} className="link">
                                        Informations
                                    </Link>
                                </button>

                                <button onClick={()=>{}}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                      ))}
                </tbody>
            </table>   
        </div>
        </>
    )
}
