import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function MoveDescription({ id, children }) {
    const [elements, setElements] = useState('');

    useEffect(() => {
        getMoveDescription();
    }, []);

    async function getMoveDescription() {
        const response = await axios.get(children);

        setElements(response.data.flavor_text_entries[2].flavor_text);

        console.log(response.data); 
    }

    return (
        <div>
            <h1>{elements}</h1>
        </div>
    )
}
