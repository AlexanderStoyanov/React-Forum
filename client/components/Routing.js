import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";

import Home from './Home/Home';
import Topics from './Home/Topics';

import SignUpPage from './SignUpPage';
import SignInPage from './SignIn/SignInPage';


const Root = () => (
    <main>
        <Switch>
            <Route exact path='/home' component={Home} />
            <Route path='/topics' component={Topics} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signin' component={SignInPage} />
        </Switch>
    </main>
)

export default Root;