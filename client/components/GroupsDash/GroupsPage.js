import React from 'react';
import { connect } from 'react-redux';

import Groups from './Groups';
import { loadGroups, addGroup } from '../../actions/groupsAction';

class GroupsPage extends React.Component {
    componentDidMount() {
        this.props.loadGroups();
    }

    render() {
        let groupsData = ['Nothing there yet..'];
        if (this.props.groups.groupsData) {
            groupsData = this.props.groups.groupsData;
        }

        let userid = [], firstname = [], currentGroup = [];
        if (this.props.groups.userData) {
            for (i = 0; i < this.props.groups.userData; i++) {
                userid.push(this.props.groups.userData[i].userid);
                firstname.push(this.props.groups.userData[i].firstname);
                currentGroup.push(this.props.groups.userData[i].currentGroup);
            }
        }

        return (
            <div className="container">
                <Groups
                    groupsData={groupsData}
                    userid={userid}
                    firstname={firstname}
                    currentGroup={currentGroup}
                    addGroup={this.props.addGroup}
                />
            </div>
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
        addGroup: (newGroupName) => {
            dispatch(addGroup(newGroupName));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);