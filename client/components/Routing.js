import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";

import Home from './Home';
import SignUpPage from './SignUpPage';


const Root = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={SignUpPage} />

        </Switch>
    </main>
)

export default Root;