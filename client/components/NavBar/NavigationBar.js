import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.changeDir({
            text: event.target.name,
        });
    }

    render() {
        var text = 'undef';
        if (this.props.navBar[0]) {
            text = this.props.navBar[0].text;
        } else {
            text = 'undef';
        }
        return (
            <div className="row">
                <div className="col-md">
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">

                        <Link to='/' className="navbar-brand mr-4">Feed + {text}</Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse scrollable" id="collapsibleNavbar">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to='/forum' name="Home" className="nav-link" onClick={this.onClick} > Home</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/signin' name="Sign In" className="nav-link" onClick={this.onClick} >Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signup' name="Sign Up" className="nav-link" onClick={this.onClick} >Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    navBar: PropTypes.object,
    changeDir: PropTypes.func,
}

export default NavigationBar;