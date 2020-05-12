import React from 'react';
import { Link } from 'react-router-dom';

import PokeLogo from '../../assets/pokeLogo.png';

import './styles.css';

export default function Home() {
    
    return (
        <div>
            <img src={PokeLogo} alt="Logo Pokemon" />
            <hr />
            <Link to="/pokedex" className="link-btn">
                Access to Pokedex
            </Link>
        </div>
    )
}
