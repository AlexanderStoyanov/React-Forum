import React from 'react';
import Forum from './Forum';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadForums } from '../../actions/loadForums';
import { loadTopics } from '../../actions/loadTopics';
import { renameForum, loadCurrentForumID, deleteForum, addForum } from '../../actions/editForum';


class ForumsPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.loadForums();

    }

    render() {
        let forumNames = ['Nothing there yet..'];
        if (this.props.forum.forumNames) {
            forumNames = this.props.forum.forumNames;
        }
        return (
            <div className="container">
                <Forum
                    loadTopics={this.props.loadTopics}
                    forumNames={forumNames}
                    group={this.props.userDetails.group}
                    renameForum={this.props.renameForum}
                    deleteForum={this.props.deleteForum}
                    addForum={this.props.addForum}
                    currentForumid={this.props.userDetails.currentForumID}
                    loadCurrentForumID={this.props.loadCurrentForumID}
                />
            </div>
        );
    }
}

ForumsPage.propTypes = {
    loadForums: PropTypes.func.isRequired,
    loadTopics: PropTypes.func.isRequired,
    renameForum: PropTypes.func.isRequired,
    deleteForum: PropTypes.func.isRequired,
    addForum: PropTypes.func.isRequired,
    loadCurrentForumID: PropTypes.func.isRequired,
    currentForumid: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
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
        renameForum: (id, name) => {
            dispatch(renameForum(id, name));
        },
        loadCurrentForumID: (currentForumID) => {
            dispatch(loadCurrentForumID(currentForumID));
        },
        deleteForum: (currentForumID) => {
            dispatch(deleteForum(currentForumID));
        },
        addForum: (currentForumID) => {
            dispatch(addForum(currentForumID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);