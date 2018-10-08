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
        this.props.history.push('/');
    }

    onClick(event) {
        this.props.changeDir({
            text: event.target.name,
        });
    }

    render() {
        var name = 'undef';
        if (this.props.userDetails) {
            name = this.props.userDetails.name;
        }
        return (
            <nav className="navbar sticky-top navbar-expand-md bg-dark navbar-dark">

                <Link to='/' className="navbar-brand mr-4">Feed</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse scrollable" id="collapsibleNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/forum' name="/forum" className="nav-link" onClick={this.onClick} > Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/groups' name="/groups" className="nav-link" onClick={this.onClick} >Groups</Link>
                        </li>
                        {
                            (this.props.userDetails.token) ?
                                (<div className="d-flex">
                                    <span className="navbar-text">
                                        Welcome, {name}
                                    </span>
                                    <li className="nav-item">
                                        <Link to='/signin' name="/signin" className="nav-link" onClick={this.signOut} >Sign out</Link>
                                    </li>
                                </div>) :
                                (<div className="d-flex">
                                    <li className="nav-item">
                                        <Link to='/signin' name="/signin" className="nav-link" onClick={this.onClick} >Sign In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/signup' name="/signup" className="nav-link" onClick={this.onClick} >Sign Up</Link>
                                    </li>
                                </div>)
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(NavigationBar);