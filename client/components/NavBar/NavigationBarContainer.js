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
        //console.log(this.props.navBar);
        return (
            <div className="NavigationBar"><NavigationBar navBar={this.props.navBar} changeDir={this.props.changeDir} /></div>
        );
    }
}

NavigationBarContainer.propTypes = {
    navBar: PropTypes.object.isRequired,
    changeDir: PropTypes.func.isRequired,
}


function mapStateToProps(state) {
    return {
        navBar: state.navigationBar,
    }
}

export default connect(mapStateToProps, { changeDir })(NavigationBarContainer);