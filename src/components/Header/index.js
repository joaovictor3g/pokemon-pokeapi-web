import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Header() {
    return (
        <div className="Header-container">
            <Link to="/" className="home-link">
                Home
            </Link>
        </div>
    )
}
