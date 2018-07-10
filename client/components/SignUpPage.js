import React from 'react';
import SignUpForm from './SignUpForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignUpRequest } from '../actions/signUpAction';


class SignUpPage extends React.Component {
    render() {
        const { userSignUpRequest } = this.props;
        return (
            <div className="row">
                <div className="col-md-2 mx-auto">
                    <SignUpForm userSignUpRequest={userSignUpRequest} />
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest  })(SignUpPage);