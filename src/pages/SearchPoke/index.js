import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'

import api from '../../services/api'

export default function SearchPoke (props) {
  // eslint-disable-next-line react/prop-types
  const { id } = props.match.params

  const [name_, setName] = useState('')
  const [pokeImage, setImage] = useState('')
  const history = useHistory()

  useEffect(() => {
    searchByName()// eslint-disable-next-line
    }, []);

  // Pegando o pokemon pelo ID
  async function searchByName () {
    const response = await api.get(`/pokemon/${id}`)

    setName(response.data.name)

    setImage(response.data.sprites.front_default)
  }
  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Captura de pokemons
  function catchPokemon (name) {
    let pokeball = JSON.parse(sessionStorage.getItem('pokeball'))

    if (!pokeball) { pokeball = [] }

    if (pokeball.length === 6) {
      alert('Full')
      history.push('/pokedex/your-pokemons')
      return
    }

    for (var i = 0; i < pokeball.length; i++) {
      if (pokeball[i].id === id) {
        alert(`${capitalizeFirstLetter(name)} already caught!!!`)
        return
      }
    }

    function getRandom () {
      return (Math.floor(Math.random() * 2))
    }

    if (getRandom() === 0) {
      alert(`${capitalizeFirstLetter(name)} WAS CAUGHT!!!`)
    } else {
      alert(`${capitalizeFirstLetter(name)} WAS NOT CAUGHT!!!`)
      return
    }

    pokeball.push({
      id,
      name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      life: 100
    })

    sessionStorage.setItem('pokeball', JSON.stringify(pokeball))
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
        <FaAngleRight size={20} color="#FFF" />
        <Link to={`/pokedex/search/${id}`} className="pokedex-button">
                    Search
        </Link>
      </div>

      <div className="principal-container">

        <table className="table-container" border="1">
          <tbody>
            <tr className="initial-tr">
              <td>ID</td>
              <td>Nome</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="id-td">{id}</td>
              <td className="td-name">{capitalizeFirstLetter(name_)}</td>
              <td className="image-td"><img src={pokeImage} alt="pokemon-image"/></td>
              <td className="actions-table">
                <button className="btn-1">
                  <Link to={`/pokedex/poke-info/${id}`} className="link">
                                Informations
                  </Link>
                </button>
                <button onClick={() => catchPokemon(name_)}>Catch</button>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </>
  )
}
