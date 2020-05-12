import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import pokeLogo from '../../assets/pokeLogo.png';

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
            <div className="initial">
                <img src={pokeLogo} alt="Logo do pokémon" className="image1"/>
            </div>
            <div className="principal">
                <div className="aside">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="image2"/>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`} className="image2" />
                    <hr></hr>
                    <div className="infos-from-pokemon">
                        <p><span className="initial-span">Name:</span> {capitalizeFirstLetter(name)}</p>
                        <p><span>Weight:</span> {weight}</p>
                        <p><span>Pokedex number:</span> {numberOnPoke}</p>
                        <p><span>Order: </span>{order}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
