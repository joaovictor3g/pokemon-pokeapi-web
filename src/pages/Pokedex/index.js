import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaAngleRight, FaSearch } from 'react-icons/fa';

import api from '../../services/api';

//import Header from '../../components/Header';
import './styles.css';

export default function Pokedex() {
   
    const [pokemons, setPokemons] = useState([]);// eslint-disable-next-line
    const [pages, setPages] = useState(0);
    const [count, setCount] = useState(0);

    let obj = [];
    
    const [name, setName] = useState([]);
   
    const [limit, setLimit] = useState(5); 
  

    const history = useHistory();

    useEffect(() => {
        renderPokemons();
      
    }, []);

    async function renderPokemons(offset) {
        const response = await api.get(`/pokemon/?offset=${offset}&limit=5`);

        setPokemons(response.data.results); 

        setCount(response.data.count);

        /*response.data.results.map((pokemon, index) => (
            obj.push({
                id: index+1+offset,
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1+offset}.png`
            })
        ));*/

        //sessionStorage.setItem('all', JSON.stringify(obj));
    
    }
    
    function nextPage(e) {
        e.preventDefault();

        if(pages===count) 
            return;

        setPages(pages+5);

        console.log(pages);

        renderPokemons(pages+5);
    }

    function goToPreviousPage(e) {
        e.preventDefault();

        if(pages <= 0)
            return;
        //setLimit(limit-1);
        setPages(pages-5);
        renderPokemons(pages);
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function getId(name) {
        try {
            name = name.toLowerCase();
            const response = await api.get(`/pokemon/${name}`);
            history.push(`/pokedex/search/${response.data.id}`);
        
        } catch (err) {
            alert(`Pokemon not added yet!!!!${name}`)
            }

    }

    //Mandando os pokemons que quero capturar pro sessionstorage
    function catchPokemon(name, id) {
        let pokeball = JSON.parse(sessionStorage.getItem('pokeball'));

        if(!pokeball)
            pokeball = [];
        
        if(pokeball.length===6) {
            alert('Full');
            history.push('/pokedex/your-pokemons');
            return;
        }

        pokeball.push({
            id,
            name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        });
        sessionStorage.setItem('pokeball', JSON.stringify(pokeball));
        alert('Pokemon was caught');
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
                            <td className="id-td">{index+1+pages}</td>
                            <td className="td-name">{capitalizeFirstLetter(pokemon.name)}</td>
                            <td className="image-td">
                                <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1+pages}.png`} 
                                alt="pokemon"/>
                            </td>
                            
                            <td className="actions-table">
                                <button  className="btn-1">
                                    <Link to={`/pokedex/poke-info/${index+1+pages}`} className="link">
                                        Informations
                                    </Link>
                                </button>
                                <button onClick={()=>catchPokemon(pokemon.name, index+1)}>Catch
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>   
            <div className="actions"> 
                <button onClick={goToPreviousPage} className="prev">Anterior</button>
                <button className="next" onClick={nextPage}>Próximo</button> 
            </div>
        </div>
        </>
    )
}
