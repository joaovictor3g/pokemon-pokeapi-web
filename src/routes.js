import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Pokedex from './pages/Pokedex';
import PokeInfo from './pages/PokeInfo';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={()=>'Hello world'} />
                <Route path="/pokedex" exact component={Pokedex} />
                <Route path="/pokedex/poke-info/:id" component={PokeInfo} />
            </Switch>
        </BrowserRouter>
    )
}
