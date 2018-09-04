import React from 'react';
import Topic from './Topic';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


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
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        topic: state.topic
    }
}

export default connect(mapStateToProps)(TopicsPage);