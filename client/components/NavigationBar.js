import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="row">
            <div className="col-md">
                <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">

                    <Link to='/' className="navbar-brand mr-4">Feed</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse scrollable" id="collapsibleNavbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/home' className="nav-link">Home</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/signin' className="nav-link">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/signup' className="nav-link">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}