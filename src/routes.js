import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokeInfo from './pages/PokeInfo';
import SearchPoke from './pages/SearchPoke';
import CatchPoke from './pages/CatchPoke';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pokedex" exact component={Pokedex} />
                <Route path="/pokedex/poke-info/:id" component={PokeInfo} />
                <Route path="/pokedex/search/:id" component={SearchPoke} />
                <Route path="/pokedex/your-pokemons" component={CatchPoke} />
            </Switch>
        </BrowserRouter>
    )
}
