import React from 'react';
import NavigationBar from './NavigationBar';
import { changeDir } from '../../actions/navigationBarActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class NavigationBarContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="NavigationBar">
                <NavigationBar
                    navBar={this.props.navBar}
                    userDetails={this.props.userDetails}
                    changeDir={this.props.changeDir}
                />
            </div>
        );
    }
}

NavigationBarContainer.propTypes = {
    changeDir: PropTypes.func.isRequired,
}


function mapStateToProps(state) {
    return {
        navBar: state.navigationBar,
        userDetails: state.userDetails,
    }
}

export default connect(mapStateToProps, { changeDir })(NavigationBarContainer);