import React from 'react';
import Topic from './Topic';
import { connect } from 'react-redux';
import { loadTopics } from '../../actions/topicAction';
import { loadReplies } from '../../actions/replyAction';
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
                            loadTopics={this.props.loadTopics}
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
                            edittopics={this.props.userDetails.permissions.edittopics}
                            deletetopics={this.props.userDetails.permissions.deletetopics}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        topic: state.topic,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTopics: async (id) => {
            await dispatch(loadTopics(id));
        },
        loadReplies: (id) => {
            dispatch(loadReplies(id));
        },
        renameTopic: async (id, name) => {
            await dispatch(renameTopic(id, name));
        },
        addTopic: async (currentForumID, name) => {
            await dispatch(addTopic(currentForumID, name));
        },
        deleteTopic: async (id) => {
            await dispatch(deleteTopic(id));
        },
        loadCurrentTopicID: (currentTopicID) => {
            dispatch(loadCurrentTopicID(currentTopicID));
        },
        restoreTopic: async (id) => {
            await dispatch(restoreTopic(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);