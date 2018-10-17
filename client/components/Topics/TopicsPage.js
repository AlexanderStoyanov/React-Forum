import React from 'react';
import Topic from './Topic';
import { connect } from 'react-redux';
import { loadTopics } from '../../actions/topicAction';
import { loadReplies } from '../../actions/replyAction';
import { loadCurrentTopicID, renameTopic, deleteTopic, addTopic, restoreTopic } from '../../actions/topicAction';


class TopicsPage extends React.Component {
    render() {
        const { loadCurrentTopicID, renameTopic, deleteTopic, addTopic, restoreTopic, loadTopics, loadReplies, match, topic } = this.props;
        const { currentForumID, currentTopicID, permissions, group } = this.props.userDetails;
        let topicNames = ['Nothing there yet..'];
        if (this.props.topic.topicNames) {
            topicNames = this.props.topic.topicNames;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <Topic
                            loadTopics={loadTopics}
                            loadReplies={loadReplies}
                            addTopic={addTopic}
                            renameTopic={renameTopic}
                            deleteTopic={deleteTopic}
                            restoreTopic={restoreTopic}
                            loadCurrentTopicID={loadCurrentTopicID}
                            topicNames={topicNames}
                            group={group}
                            match={match}
                            forumURL={topic.currentDirectory}
                            currentTopicID={currentTopicID}
                            currentForumID={currentForumID}
                            edittopics={permissions.edittopics}
                            deletetopics={permissions.deletetopics}
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