import React from 'react';
import NavigationBarContainer from './NavBar/NavigationBarContainer';
//import SignUpPage from './SignUpPage';
//import Routing from './Routing';
import FlashMessagesList from './flash/FlashMessagesList';

import ForumsPage from './Forums/ForumsPage';
import TopicsPage from './Topics/TopicsPage';
import RepliesPage from './Replies/RepliesPage';
import SignUpPage from './SignUp/SignUpPage';
import SignInPage from './SignIn/SignInPage';

import { Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavigationBarContainer />
                <FlashMessagesList />
                <main>
                    <Switch>
                        <Route path={`/forum/:forumName/:topicName`} component={RepliesPage} />
                        <Route path={`/forum/:forumName`} component={TopicsPage} />
                        <Route exact path='/forum' component={ForumsPage} />
                        <Route path='/signup' component={SignUpPage} />
                        <Route path='/signin' component={SignInPage} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;