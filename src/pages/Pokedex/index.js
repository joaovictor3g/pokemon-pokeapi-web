import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Pokedex() {
    const [count, setCount] = useState('');
    const [pokemons, setPokemons] = useState([]);// eslint-disable-next-line
    const [name, setName] = useState('');// eslint-disable-next-line
    const [img, setImg] = useState([]);// eslint-disable-next-line
    const [id, setId] = useState(1);
    const [pages, setPages] = useState(1);
    const [previousPage, setPreviousPage] = useState([]);
    const [indice, setIndice] = useState(1);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        renderPokemons();
      
    }, []);

    async function renderPokemons(page = 0) {
        const response = await api.get(`/pokemon/?offset=${page}&limit=807`);

        console.log(page);

        setPokemons(response.data.results);

        setCount(response.data.count);

        setPreviousPage(response.data.previous);

    }
    
    function nextPage() {
        setPages(pages+1);
        renderPokemons(pages);
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

    return (
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
                            <td className="actions-table"><button className="btn-1">Informações</button><button>Capturar</button></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>   
            <div className="actions"> 
                <button disabled={goToPreviousPage === null} onClick={goToPreviousPage} className="prev">Anterior</button>
                <button className="next" onClick={nextPage}>Próximo</button> 
            </div>
        </div>
    )
}
