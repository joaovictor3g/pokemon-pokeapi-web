import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { MdCancel } from 'react-icons/md'

import './styles.scss'

// eslint-disable-next-line react/prop-types
export default function MoveDescription ({ id, children, onClose = () => {} }) {
  const [elements, setElements] = useState('')

  useEffect(() => {
    getMoveDescription()
    console.log(children)
  }, [])

  async function getMoveDescription () {
    const response = await axios.get(children)

    setElements(response.data.flavor_text_entries[2].flavor_text)
  }

  return (
    <div>
      <div id={id} className="modal-3" onClick={() => {}}>
        <div className="container-3">
          <button type="button" className="close-3" onClick={onClose}>
            <MdCancel size={30} color="#e60000" />
          </button>

          <div className="content-3">{elements}</div>
        </div>
      </div>
    </div>
  )
}
