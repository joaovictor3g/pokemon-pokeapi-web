import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.scss';
import { MdCancel } from 'react-icons/md';

export default function PokemonDetail({ id, div_id = "modal", onClose = () => {} }) {
    const [description, setDescription] = useState([]);
    const [uniqueDescription, setUniqueDescription] = useState([]);

    useEffect(() => {
        getDetail();
    }, []);

    async function getDetail() {
        const response = await api.get(`/pokemon-species/${id}`);
        let obj = [];

        response.data.flavor_text_entries.map((desc) => (
            obj.push(desc.version.name)
        ))
        
        for(var i = 0; i < obj.length; i++){
            if(response.data.flavor_text_entries[i].language.name==="en" && response.data.flavor_text_entries[i].version.name===obj[i]) {
                setUniqueDescription(response.data.flavor_text_entries[i].flavor_text);
                break;
            }
        }

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
                
                <div className="content">{uniqueDescription}</div>
            </div>
        </div>
    )
}
