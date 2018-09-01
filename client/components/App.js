import React from 'react';
import NavigationBarContainer from './NavBar/NavigationBarContainer';
//import SignUpPage from './SignUpPage';
import Routing from './Routing';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <NavigationBarContainer />
                <FlashMessagesList />
                <div className="row mb-5 mt-5"></div>
                <Routing />
            </div>
        );
    }
}

export default App;