import React from 'react';
import SignInForm from './SignInForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/signInAction';
import { addFlashMessage } from '../../actions/flashMessages';


class SignInPage extends React.Component {
    render() {
        const { userSignInRequest, addFlashMessage } = this.props;
        return (
            <div className="row">
                <div className="col-md-2 mx-auto">
                    <SignInForm
                        userSignInRequest={userSignInRequest}
                        addFlashMessage={addFlashMessage}
                    />
                </div>
            </div>
        );
    }
}

SignInPage.propTypes = {
    userSignInRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignInRequest, addFlashMessage })(SignInPage);