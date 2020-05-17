import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { MdCancel } from 'react-icons/md';

import './styles.scss';

export default function Modal({ id="modal", onClose = () => {}, children, open }) {
    const [description, setDescription] = useState('');
    const [effectName, setEffectName] = useState('');

    useEffect(() => {
        getIdOfAbility();//eslint-disable-next-line
        
    }, []);
    
    async function getIdOfAbility() {
       try {
            const response = await axios.get(children);
            
            setDescription(response.data.effect_entries[0].short_effect);
            setEffectName(response.data.name);
            
       } catch(err) {

       }
    }

    function handleOutsideClick(e) {
        if(e.target.id === id) onClose();
    }
    
    return (
        <>
        <div id={id} className="modal" onClick={handleOutsideClick}>
            <div className="container">
                <button type="button" className="close" onClick={onClose}>
                    <MdCancel size={30} color="#e60000" />
                </button>
                
                <div className="content">{description}</div>
            </div>
        </div> 
        </>
    )
}
