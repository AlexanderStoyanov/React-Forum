import React from 'react';
import Topic from './Topic';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadReplies } from '../../actions/loadReplies';


class TopicsPage extends React.Component {
    render() {
        let topicNames = ['Nothing there yet..'];
        if (this.props.topic.topicNames) {
            topicNames = this.props.topic.topicNames[0];
        }
        
        return (
            <div className="row">
                <div className="col-md">
                    <Topic
                        topicNames={topicNames}
                        loadReplies={this.props.loadReplies}
                        forumURL={this.props.topic.currentDirectory}
                    />
                </div>
            </div>
        );
    }
}

TopicsPage.propTypes = {
    loadReplies: PropTypes.func.isRequired,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);