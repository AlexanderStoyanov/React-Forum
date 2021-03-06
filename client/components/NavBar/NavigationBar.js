import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    signOut(event) {
        event.preventDefault();
        this.props.signOut();
        this.props.history.push('/signin');
    }

    onClick(event) {
        this.props.changeDir({
            text: event.target.name,
        });
    }

    render() {
        const { userDetails } = this.props;
        var name = 'undef';
        if (userDetails) {
            name = userDetails.name;
        }
        return (
            <nav className="navbar sticky-top navbar-expand-md navbar-dark"
                style={{ background: '#111' }}
            >
                <Link to='/' className="navbar-brand mr-4">Feed</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse scrollable" id="collapsibleNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/forum' name="/forum" className="nav-link" onClick={this.onClick} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/groups' name="/groups" className="nav-link" onClick={this.onClick} >Groups</Link>
                        </li>
                    </ul>
                    {
                        (userDetails.token) ?
                            (<ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <span className="navbar-text">
                                        Welcome, {name}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signin' name="/signin" className="nav-link" onClick={this.signOut} >Sign out</Link>
                                </li>
                            </ul>) :
                            (<ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/signin' name="/signin" className="nav-link" onClick={this.onClick} >Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signup' name="/signup" className="nav-link" onClick={this.onClick} >Sign Up</Link>
                                </li>
                            </ul>)
                    }
                </div>
            </nav>
        );
    }
}

export default withRouter(NavigationBar);