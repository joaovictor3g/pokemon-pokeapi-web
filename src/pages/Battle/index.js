import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'

import './styles.css'
import BattleField from '../../assets/battlegrass.png'

export default function Battle () {
  const pokeballs = JSON.parse(sessionStorage.getItem('pokeball'))
  const [chooseEnemyPokemon, setChooseEnemyPokemon] = useState(24)
  const [chooseMyPokemons, setMyPokemons] = useState(pokeballs[0].id)

  const enemies = [
    { id: 24, name: 'arbok', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png' },
    { id: 52, name: 'meowth', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
    { id: 71, name: 'victreebel', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png' },
    { id: 108, name: 'lickitung', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png' },
    { id: 110, name: 'weezing', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png' },
    { id: 112, name: 'rhydon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png' }]

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
        <Link to="/pokedex/your-pokemons" className="pokedex-button">
                See your pokemons
        </Link>
        <FaAngleRight size={20} color="#FFF" />
        <Link to="/pokedex/battle" className="pokedex-button">
              Battle
        </Link>
      </div>
      <div className="pokemons-image">
        {pokeballs
          ? <table border="1" className="table-pokemons">
            <tbody>
              <tr className="initial-tr">
                <td>Pokeball</td>
                <td>Arena</td>
                <td>Enemy</td>
              </tr>

              <tr>
                <td>
                  {pokeballs.map(poke => (
                    <button key={poke.id} className="poke-btn" onClick={() => setMyPokemons(poke.id)}>
                      <img src={poke.image} alt={poke.name} className="pokemons-low"/>
                    </button>

                  ))}
                </td>

                <td>
                  <div className="principal-div-over">
                    <img src={BattleField} alt="Battle-Field" className="field-image"/>
                    <div className="other-image">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chooseEnemyPokemon}.png`}
                        alt="poke"
                        className="pokemon-on-arena"
                      />
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${chooseMyPokemons}.png`}
                        alt="poke"
                        className="pokemon-on-arena-2"
                      />
                    </div>
                  </div>
                  <button className="field-btn" onClick={() => {}}>Attack</button>
                </td>

                <td>
                  {enemies.map(enemy => (
                    <button key={enemy.id} className="poke-btn" onClick={() => setChooseEnemyPokemon(enemy.id)}>
                      <img src={enemy.image} alt={enemy.name} className="pokemons-low"/>
                    </button>
                  ))}
                </td>

              </tr>
            </tbody>
          </table>
          : <p>There are not Pokemons yet!!!</p>}
      </div>
    </>
  )
}
