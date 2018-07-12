import React from 'react'
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import SignUpPage from './SignUpPage'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUpPage} />

        </Switch>
    </main>
)

export default Main