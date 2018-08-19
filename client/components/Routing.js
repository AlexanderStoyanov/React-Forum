import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";

import ForumsPage from './Forums/ForumsPage';
import Forum from './Forums/Forum';
import Topics from './Forums/Topics';

import SignUpPage from './SignUpPage';
import SignInPage from './SignIn/SignInPage';


const Root = () => (
    <main>
        <Switch>
            <Route exact path='/forum' component={ForumsPage} />
            <Route path='/topics' component={Topics} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signin' component={SignInPage} />
        </Switch>
    </main>
)

export default Root;