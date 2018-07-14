import React from 'react';
import NavigationBar from './NavigationBar';
import SignUpPage from './SignUpPage';
import Routing from './Routing';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <NavigationBar />
                <FlashMessagesList />
                <div className="row mb-5 mt-5"></div>
                <Routing />
            </div>
        );
    }
}

export default App;