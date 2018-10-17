import React from 'react';
import Forum from './Forum';
import { connect } from 'react-redux';
import { loadTopics } from '../../actions/topicAction';
import { renameForum, loadCurrentForumID, deleteForum, addForum, loadForums, restoreForum } from '../../actions/forumAction';


class ForumsPage extends React.Component {
    componentDidMount() {
        //If signed in, load forums
        if (this.props.userDetails.token) {
            this.props.loadForums();
        }
    }

    render() {
        const { group, token, currentForumID, permissions } = this.props.userDetails;
        const { loadForums, loadTopics, addForum, renameForum, deleteForum, restoreForum, loadCurrentForumID } = this.props;
        let forumNames = ['Nothing there yet..'];
        //null check
        if (this.props.forum.forumNames) {
            forumNames = this.props.forum.forumNames;
        }
        return (
            <div className="container">
                <Forum
                    loadForums={loadForums}
                    loadTopics={loadTopics}
                    addForum={addForum}
                    renameForum={renameForum}
                    deleteForum={deleteForum}
                    restoreForum={restoreForum}
                    loadCurrentForumID={loadCurrentForumID}
                    forumNames={forumNames}
                    group={group}
                    token={token}
                    currentForumID={currentForumID}
                    blocked={permissions.blocked}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        forum: state.forum,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadForums: () => {
            dispatch(loadForums());
        },
        loadTopics: (directory) => {
            dispatch(loadTopics(directory));
        },
        addForum: async (currentForumID) => {
            await dispatch(addForum(currentForumID));
        },
        renameForum: async (id, name) => {
            await dispatch(renameForum(id, name));
        },
        deleteForum: async (currentForumID) => {
            await dispatch(deleteForum(currentForumID));
        },
        restoreForum: async (currentForumID) => {
            await dispatch(restoreForum(currentForumID));
        },
        loadCurrentForumID: (currentForumID) => {
            dispatch(loadCurrentForumID(currentForumID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);