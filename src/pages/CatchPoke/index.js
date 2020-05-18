import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

import './styles.css';

export default function CatchPoke() {
    const [myPokemons, setMyPokemons] = useState([]);

    useEffect(() => {
        //1° renderização de todos os pokemons
        getMyPokemons();
    }, []);

    //Pegando valores do sessionStorage e passado sua resposta para um estado.
    function getMyPokemons() {
        const response = JSON.parse(sessionStorage.getItem('pokeball'));

        setMyPokemons(response);
    }

    //Função que deixa a primeira linha de uma string maiuscula.
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
        {!myPokemons? 
            <span className="catched-pokemons">
                There are not pokemons yet!!!<br></br>
                <Link to="/pokedex" className="link-to-catch">
                    Catch'em all!!!
                </Link>
                </span>
            : <table className="table-container" border="1">
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
            } 
        </div>
        </>
    )
}
