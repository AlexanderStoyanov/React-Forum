import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";

import ForumsPage from './Forums/ForumsPage';
import TopicsPage from './Topics/TopicsPage';

import SignUpPage from './SignUpPage';
import SignInPage from './SignIn/SignInPage';


const Root = ({ match }) => (
    <main>
        <Switch>
            <Route exact path='/forum' component={ForumsPage} />
            <Route path={`/forum/:forumName`} component={TopicsPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signin' component={SignInPage} />
        </Switch>
    </main>
)

export default Root;