import React from 'react';
import { connect } from 'react-redux';

import Groups from './Groups';
import { loadGroups } from '../../actions/groupsAction';

class GroupsPage extends React.Component {
    componentDidMount() {
        this.props.loadGroups();
    }

    render() {
        let groups = [];
        return (
            <Groups
                groups={groups}
            />
            );
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groups,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroups: () => {
            dispatch(loadGroups());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);