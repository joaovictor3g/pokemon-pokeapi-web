import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './styles.scss';

export default function Modal({ id="modal", onClose = () => {}, children  }) {
    const [description, setDescription] = useState('');

    useEffect(() => {
        getIdofAbility();
    }, [])
    
    async function getIdofAbility() {
       try {
            const response = await axios.get(children);
            
            setDescription(response.data.effect_entries[0].short_effect);
            
       } catch(err) {

       }
    }

    function handleOutsideClick(e) {
        if(e.target.id === id) onClose();
    }
    
    return (
        <div id={id} className="modal" onClick={handleOutsideClick}>
            <div className="container">
                <button type="button" className="close" onClick={onClose}/>
                
                <div className="content">{description}</div>
            </div>
        </div>
    )
}
