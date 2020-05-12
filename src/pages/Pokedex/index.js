import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

import api from '../../services/api';

//import Header from '../../components/Header';
import './styles.css';

export default function Pokedex() {
    const [count, setCount] = useState('');
    const [pokemons, setPokemons] = useState([]);// eslint-disable-next-line
    const [pages, setPages] = useState(1);
    const [previousPage, setPreviousPage] = useState([]);
    var [id, setID]= useState([]);
    const [name, setName] = useState([]);
    const [front_default, setFront] = useState([]);
    const [limit, setLimit] = useState(5); 
    let [response, setResponse] = useState([]);

    useEffect(() => {
        renderPokemons();
        //getId();
    }, []);

    async function renderPokemons(offset = 0, limits = 5) {
        const response = await api.get(`/pokemon/?offset=${offset}&limit=${limits}`);

        setPokemons(response.data.results);

        setCount(response.data.count);

        setPreviousPage(response.data.previous);

        //console.log(offset);
        //console.log(limits);

        //setPokemons(pokemons.filter(pokemon => pokemon.name !== name));

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

    async function getId(limits = 5) {
        for (var i = 0; i < limits; i++) {
           const response = await api.get(`/pokemon/${i+1}`);
        
           console.log(response.data.id, response.data.name);

           setID(response.data.id);

           setName(response.data.name);
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
            <h1 className="title-info">Pokedex<p>({count} Pokemons)</p></h1>  

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
                            <td className="image-td"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} alt="pokemon"/></td>
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
