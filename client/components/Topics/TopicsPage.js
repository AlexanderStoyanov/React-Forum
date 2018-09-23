import React from 'react';
import Topic from './Topic';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadReplies } from '../../actions/loadReplies';
import { loadCurrentTopicID } from '../../actions/topicAction';


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
                            renameTopic={this.props.renameTopic}
                            forumURL={this.props.topic.currentDirectory}
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
    loadCurrentTopicID: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        topic: state.topic
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadReplies: (id) => {
            dispatch(loadReplies(id));
        },
        renameTopic: (id) => {
            dispatch(renameTopic(id));
        },
        loadCurrentTopicID: (currentTopicID) => {
            dispatch(loadCurrentTopicID(currentTopicID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);