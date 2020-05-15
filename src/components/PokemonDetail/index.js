import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.scss';
import { MdCancel } from 'react-icons/md';

export default function PokemonDetail({ id, div_id = "modal", children, onClose = () => {} }) {
    const [description, setDescription] = useState('');

    useEffect(() => {
        getDetail();
    }, []);

    async function getDetail() {
        const response = await api.get(`/pokemon-species/${id}`);

        setDescription(response.data.flavor_text_entries[1].flavor_text);
        console.log(response.data);
    }
    
    function handleOutsideClick(e) {
        if(e.target.id === div_id) onClose();
    }

    return (
        <div id={div_id} className="modal-2" onClick={handleOutsideClick}>
            <div className="container-2">
                <button type="button" className="close-2" onClick={onClose}>
                    <MdCancel size={30} color="#FFF" />
                </button>
                
                <div className="content">{description}</div>
            </div>
        </div>
    )
}
