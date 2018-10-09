import React from 'react';
import SignUpForm from './SignUpForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignUpRequest, doesUserExist } from '../../actions/authentication';
import { addFlashMessage } from '../../actions/flashMessages';


class SignUpPage extends React.Component {
    render() {
        const { userSignUpRequest, addFlashMessage, doesUserExist } = this.props;
        return (
            <div className="row mt-5">
                <div className="col-md-2 mx-auto">
                    <SignUpForm
                        userSignUpRequest={userSignUpRequest}
                        addFlashMessage={addFlashMessage}
                        doesUserExist={doesUserExist}
                    />
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExist: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest, addFlashMessage, doesUserExist })(SignUpPage);