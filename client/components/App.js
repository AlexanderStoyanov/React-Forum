import React from 'react';
import NavigationBarContainer from './NavBar/NavigationBarContainer';
//import SignUpPage from './SignUpPage';
import Routing from './Routing';
import FlashMessagesList from './flash/FlashMessagesList';

import RepliesPage from './Replies/RepliesPage';
import { Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavigationBarContainer />
                <FlashMessagesList />
                <div className="row mb-5 mt-5"></div>
                <Switch>
                    <Route path={`/forum/:forumName/:topicName`} component={RepliesPage} />
                </Switch>
                <Routing />
            </div>
        );
    }
}

export default App;