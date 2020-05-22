import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'

import './styles.css'
import BattleField from '../../assets/battlegrass.png'

export default function Battle () {
  const pokeballs = JSON.parse(sessionStorage.getItem('pokeball'))

  const [chooseMyPokemons, setMyPokemons] = useState(1)
  const [nameMyPokemons, setNameMyPokemons] = useState('')
  const [lifeMyPokemons, setLifeMyPokemons] = useState(0)

  // Verifica se existe algum pokemon capturado no session storage
  useEffect(() => {
    if (pokeballs) {
      setMyPokemons(pokeballs[0].id)
      setNameMyPokemons(pokeballs[0].name)
      setLifeMyPokemons(pokeballs[0].life)
    }
  }, [])

  const enemies = [
    { id: 24, name: 'arbok', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png', life: 100 },
    { id: 52, name: 'meowth', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png', life: 100 },
    { id: 71, name: 'victreebel', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png', life: 100 },
    { id: 108, name: 'lickitung', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png', life: 100 },
    { id: 110, name: 'weezing', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png', life: 100 },
    { id: 112, name: 'rhydon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png', life: 100 }]

  const [chooseEnemyPokemon, setChooseEnemyPokemon] = useState(24)
  const [nameEnemyPokemons, setNameEnemyPokemons] = useState('arbok')
  const [lifeEnemies, setLifeEnemies] = useState(enemies[0].life)

  function nameAndIdMyPokemons (id, name, life) {
    setNameMyPokemons(name)
    setMyPokemons(id)
    setLifeMyPokemons(life)
  }

  function nameAndIdMyEnemies (id, name, life) {
    setNameEnemyPokemons(name)
    setChooseEnemyPokemon(id)
    setLifeEnemies(life)
  }

  // Primeira letra maiuscula
  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
                    <button key={poke.id} className="poke-btn" onClick={() => nameAndIdMyPokemons(poke.id, poke.name, poke.life)}>
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
                      <p className="enemy-pokemons">{capitalizeFirstLetter(nameEnemyPokemons)}{`(${lifeEnemies}/100)`}</p>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${chooseMyPokemons}.png`}
                        alt="poke"
                        className="pokemon-on-arena-2"
                      />
                      <p className="name-my-equip">{capitalizeFirstLetter(nameMyPokemons)}{`(${lifeMyPokemons}/100)`}</p>
                    </div>
                  </div>
                  <button className="field-btn" onClick={() => setLifeEnemies(lifeEnemies - 10)}>Attack</button>
                </td>

                <td>
                  {enemies.map(enemy => (
                    <button
                      disabled={lifeEnemies === 0}
                      key={enemy.id}
                      className={`poke-btn ${enemy.name}`}
                      onClick={() => nameAndIdMyEnemies(enemy.id, enemy.name, enemy.life)
                      }>
                      <img src={enemy.image} alt={enemy.name} className="pokemons-low"/>
                    </button>
                  ))}
                </td>

              </tr>
            </tbody>
          </table>
          : <p className="not-battle">You can not battle. There are not Pokemons yet!!!</p>}
      </div>
    </>
  )
}
