import React from 'react';
import SignInForm from './SignInForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/authentication';
import { addFlashMessage } from '../../actions/flashMessages';


class SignInPage extends React.Component {
    render() {
        const { userSignInRequest, addFlashMessage, userDetails } = this.props;
        return (
            <div className="row mt-5">
                <div className="col-md-2 mx-auto">
                    <SignInForm
                        userSignInRequest={userSignInRequest}
                        addFlashMessage={addFlashMessage}
                        userDetails={userDetails}
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

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    }
}

export default connect(mapStateToProps, { userSignInRequest, addFlashMessage })(SignInPage);