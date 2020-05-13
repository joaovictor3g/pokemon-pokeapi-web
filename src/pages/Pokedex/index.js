import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaAngleRight, FaSearch } from 'react-icons/fa';

import api from '../../services/api';

//import Header from '../../components/Header';
import './styles.css';

export default function Pokedex() {
   
    const [pokemons, setPokemons] = useState([]);// eslint-disable-next-line
    const [pages, setPages] = useState(1);
    const [previousPage, setPreviousPage] = useState([]);
    
    const [name, setName] = useState([]);
   
    const [limit, setLimit] = useState(5); 
  

    const history = useHistory();

    useEffect(() => {
        renderPokemons();
      
    }, []);

    async function renderPokemons(offset = 0, limits = 5) {
        const response = await api.get(`/pokemon/?offset=${offset}&limit=${limits}`);

        setPokemons(response.data.results);

        setPreviousPage(response.data.previous);

    }
    
    function nextPage() {
        setPages(pages+1);
        setLimit(limit+1);
        renderPokemons(pages, limit);
    }

    function goToPreviousPage() {
        if(previousPage === null)
            return;
        setPreviousPage(pages-1);
        renderPokemons(previousPage);
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function getId(name) {
            try {
                const response = await api.get(`/pokemon/${name}`);

                history.push(`/pokedex/search/${response.data.id}`);
            
            } catch (err) {
                alert('Pokemon not added yet!!!!')
            }

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
        </div>
        
        <div className="principal-container"> 
            
            <div className="search-button-container">
                <input 
                    className="search-pokemon" 
                    placeholder="Search a pokemon by name (or id) ex: bulbasaur or 1"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                
                <button type="submit" onClick={()=>getId(name)} className="search-button-frame">
                    <FaSearch size={22} color="#FFF" />
                </button>
            </div>
            <table className="table-container" border="1">
                <tbody>
                    <tr className="initial-tr">
                        <td>ID</td>
                        <td>Nome</td>
                        <td></td>
                        <td></td>
                        
                    </tr> 
                    {pokemons.map((pokemon, index) => (
                        <tr key={index+1}>
                            <td className="id-td">{index+1}</td>
                            <td className="td-name">{capitalizeFirstLetter(pokemon.name)}</td>
                            <td className="image-td">
                                <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} 
                                alt="pokemon"/>
                            </td>
                            <td className="actions-table">
                                <button  className="btn-1">
                                <Link to={`/pokedex/poke-info/${index+1}`} className="link">
                                    Informações
                                </Link>
                                </button>
                                <button>Capturar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>   
            <div className="actions"> 
                <button disabled={goToPreviousPage === null} onClick={goToPreviousPage} className="prev">Anterior</button>
                <button className="next" onClick={nextPage}>Próximo</button> 
            </div>
        </div>
        </>
    )
}
