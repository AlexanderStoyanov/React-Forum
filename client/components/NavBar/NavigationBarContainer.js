import React from 'react';
import NavigationBar from './NavigationBar';
import { changeDir, signOut } from '../../actions/navigationBarActions';
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
                    signOut={this.props.signOut}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        navBar: state.navigationBar,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeDir: (dir) => {
            dispatch(changeDir(dir));
        },
        signOut: () => {
            dispatch(signOut());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarContainer);