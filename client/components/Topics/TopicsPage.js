import React from 'react';
import Topic from './Topic';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadReplies } from '../../actions/loadReplies';
import { loadCurrentTopicID, renameTopic, deleteTopic, addTopic, restoreTopic } from '../../actions/topicAction';


class TopicsPage extends React.Component {
    render() {
        let topicNames = ['Nothing there yet..'];
        if (this.props.topic.topicNames) {
            topicNames = this.props.topic.topicNames;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <Topic
                            topicNames={topicNames}
                            loadReplies={this.props.loadReplies}
                            loadCurrentTopicID={this.props.loadCurrentTopicID}
                            currentTopicid={this.props.userDetails.currentTopicID}
                            currentForumid={this.props.userDetails.currentForumID}
                            renameTopic={this.props.renameTopic}
                            deleteTopic={this.props.deleteTopic}
                            restoreTopic={this.props.restoreTopic}
                            addTopic={this.props.addTopic}
                            forumURL={this.props.topic.currentDirectory}
                            group={this.props.userDetails.group}
                            match={this.props.match}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

TopicsPage.propTypes = {
    loadReplies: PropTypes.func.isRequired,
    renameTopic: PropTypes.func.isRequired,
    addTopic: PropTypes.func.isRequired,
    deleteTopic: PropTypes.func.isRequired,
    restoreTopic: PropTypes.func.isRequired,
    loadCurrentTopicID: PropTypes.func.isRequired,
    currentTopicid: PropTypes.number.isRequired,
    currentForumid: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        topic: state.topic,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadReplies: (id) => {
            dispatch(loadReplies(id));
        },
        renameTopic: (id, name) => {
            dispatch(renameTopic(id, name));
        },
        addTopic: (currentForumID, name) => {
            dispatch(addTopic(currentForumID, name));
        },
        deleteTopic: (id) => {
            dispatch(deleteTopic(id));
        },
        loadCurrentTopicID: (currentTopicID) => {
            dispatch(loadCurrentTopicID(currentTopicID));
        },
        restoreTopic: (id) => {
            dispatch(restoreTopic(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);