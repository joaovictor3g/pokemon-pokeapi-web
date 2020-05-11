import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Pokedex from './pages/Pokedex';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pokedex/:page?" exact component={Pokedex} />
            </Switch>
        </BrowserRouter>
    )
}
