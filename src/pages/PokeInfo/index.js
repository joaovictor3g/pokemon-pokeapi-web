/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleRight, FaQuestion, FaInfoCircle } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import api from '../../services/api'

// Descrição do pokemon
import Modal from '../../components/Modal'

// Descrição das abilidades
import PokemonDetail from '../../components/PokemonDetail'

// Descrição dos movimentos
import MoveDescription from '../../components/MoveDescription'

import './styles.css'
import PokeballImeg from '../../assets/pokeball.svg'
import Interrogacao from '../../assets/interrogacao.png'

export default function PokeInfo (props) {
  // Pegando o id que vem na rota
  // eslint-disable-next-line react/prop-types
  const { id } = props.match.params
  // eslint-disable-next-line no-unused-vars
  let pokeballHd

  const existsPokemon = JSON.parse(sessionStorage.getItem('pokeball'))

  // Estado que guarda a imagem de frente do pokemon.
  const [front, setFront] = useState('')

  // Estado que guarda o nome do pokemon.
  const [name, setName] = useState('')

  // Estado que guarda a altura do pokemon.
  const [height, setHeight] = useState('')

  // Estado que guarda o peso do pokemon.
  const [weight, setWeight] = useState('')

  const [order, setOrder] = useState(1)

  // Estado que a imagem de costas do pokemon.
  const [back, setBack] = useState('')

  // Estado que guarda o(s) tipo(s) do pokemon
  const [types, setTypes] = useState([])
  const [abilities, setAbilities] = useState([])
  const [moves, setMoves] = useState([])
  const [indiceAbility, setIndiceAbilityDescription] = useState(0)
  const [indexMove, setIndexMove] = useState(0)

  const [shinyFront, setShinyFront] = useState('')

  // Modal que mostra a descriçãp do pokemon
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Modal que mostra a descrição de  habilidade do pokemon
  const [detailIsVisible, setDetailIsVisible] = useState(false)

  // Descrição dos moves dos pokemons
  const [isMoveDescriptionVisible, setIsMoveDescription] = useState(false)

  // Estado pra verificar se botão foi clicado
  const [moveAppear, setMoveAppear] = useState(false)

  const [isImages, setImages] = useState(false)

  useEffect(() => {
    loadPokemonById()// eslint-disable-next-line
        //is_img();
  }, [])

  // carregar pokemon em tela pegando o id que vem na rota.
  async function loadPokemonById () {
    const response = await api.get(`/pokemon/${id}`)

    setName(response.data.name)
    setWeight(response.data.weight)
    setOrder(response.data.order)
    setHeight(response.data.height)
    setBack(response.data.sprites.back_default || Interrogacao)
    setShinyFront(response.data.sprites.front_shiny || Interrogacao)
    setTypes(response.data.types)
    setAbilities(response.data.abilities)
    setFront(response.data.sprites.front_default)
    setMoves(response.data.moves)
  }

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Funcao que mostra a descricao das habilidades.
  function letModalVisible (index) {
    setIsModalVisible(true)
    setIndiceAbilityDescription(index)
  }

  // funcao que mostra a descricao dos movimentos.
  function letMovesVisible (index) {
    setIsMoveDescription(true)
    setIndexMove(index)
  }

  // verificar se existe imagem de alta resolução, se não renderiza as imagens da propria API
  // eslint-disable-next-line camelcase
  function is_img () {
    try {
      if (id < 10) {
          pokeballHd = require(`../../images/00${id}.png`)
    } else if (id < 100) {
        pokeballHd = require(`../../images/0${id}.png`)
    } else {
        pokeballHd = require(`../../images/${id}.png`)
    }
      return true
    } catch (err) {
      pokeballHd = []
      return false
    }
  }

  return (
    <>
      <div className="Header-container">
        <Link to="/" className="link-home">
                Home
        </Link>
        <FaAngleRight size={20} color="#FFF" />
        <Link to={'/pokedex/'} className="pokedex-button">
                Pokedex
        </Link>
        <FaAngleRight size={20} color="#FFF" />
        <Link to={`/pokedex/poke-info/${id}`} className="pokedex-button">
                PokeInfo
        </Link>
      </div>

      <div className="principal">
        <header className="pokemon-name">
          {!existsPokemon ? null
            : existsPokemon.map((poke) => (
              name === poke.name
                ? <img key={poke.id} src={PokeballImeg} alt="pokeball" className="pokeball-catched" />
                : null
            ))}
          {capitalizeFirstLetter(name)} N° {id}
          <button className="info-question"
            onClick={() => setDetailIsVisible(true)}
          >
            <FaQuestion size={20} />

          </button>
          {detailIsVisible
            ? <PokemonDetail
              id={id}
              onClose={() => setDetailIsVisible(false)}
            />
            : null}

        </header>
        <div className="aside">
          <img src={
            id < 10
              ? is_img() ? require(`../../images/00${id}.png`) : front

              : id < 100
                ? is_img() ? require(`../../images/0${id}.png`) : front

                : is_img() ? require(`../../images/${id}.png`) : front

          }
          id="image2"
          alt="front"
          className="image2"
          />

          <div className="image-and-info">
            <header className="types-pokemons">
              {types.map((typer, index) => (
                <p key={index} className={typer.type.name}>
                  {capitalizeFirstLetter(typer.type.name)}
                </p>
              ))}
            </header>

            <div className="infos-from-pokemon">
              <span className="height-weight-order">Height: <p>{height / 10} m</p>
                            Weight: <p>{weight / 10} kg</p>
                            Order: <p>{order}</p>
              </span>

              <span className="abilities"><p>Abilities:</p>
                {abilities.map((ability, index) => (
                  <span key={index}>
                    {capitalizeFirstLetter(ability.ability.name)}
                    <button
                      onClick={() => letModalVisible(index)}
                      id={index}
                      type="button"
                    >
                      <FaQuestion size={15} color="#00bfff" />
                    </button>
                  </span>
                ))}
                {isModalVisible
                  ? <Modal onClose={() => setIsModalVisible(false)}>
                    {abilities[indiceAbility].ability.url}

                  </Modal>
                  : null}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="moves-and-images">

        <div className="move-informations">
          <header className="moves" >
            <p>Moves</p>
            {!moveAppear
            ? <button
              onClick={() => setMoveAppear(true)}
              className="move-btn"
              id="moves-btn"

            >

            <MdKeyboardArrowDown size={40} color="#FFF" />
            </button>
            : <button
                onClick={() => setMoveAppear(false)}
                className="move-btn"

              >
                <MdKeyboardArrowUp size={40} color="#FFF" />
            </button>
            }
          </header>
          {moveAppear
            ? <div className="move-description">
              {moves.map((move, index) => (
                <div className="move-name-description" id={move.move.name} key={index}>
                  <p>{move.move.name}</p>
                  <button
                    onClick={() => letMovesVisible(index)}
                    id="mover"
                  >
                    <FaInfoCircle size={30} color="blue" />
                  </button>

                </div>
              ))}
              {isMoveDescriptionVisible
                ? <MoveDescription
                  onClose={() => setIsMoveDescription(false)}
                  id={moves[indexMove].move.name}
                >
                  {moves[indexMove].move.url}
                </MoveDescription>
                : null}
            </div>

            : null}

        </div>

        <div className="images-shiny-and-back">
          <header className="moves" >
              <span>Other Images</span>
              {!isImages
              ? <button
                onClick={() => setImages(true)}
                className="move-btn"
                id="moves-btn"
              >
              <MdKeyboardArrowDown size={40} color="#FFF" />
              </button>
              : <button
                  onClick={() => setImages(false)}
                  className="move-btn"
                >
                  <MdKeyboardArrowUp size={40} color="#FFF" />
              </button>
              }
          </header>
            {isImages
            ? <>
            <span className="shiny">Shiny Version</span>
            <img src={shinyFront} alt="shiny-front" className="other-images"/>
          </>
          : null}
          </div>
      </div>
    </>
  )
}
