import React from 'react';
import PropTypes from 'prop-types';
import TopicEntry from '../common/TopicEntry';

class Topic extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.loadReplies(e.target.id);
    }

    render() {
        var rows = [];
        
        if (this.props.topicNames) {
            for (var i = 0; i < this.props.topicNames.length; i++) {
                rows.push(<TopicEntry
                    key={i}
                    topicName={this.props.topicNames[i].topicname}
                    forumURL={this.props.forumURL}
                    topicURL={this.props.topicNames[i].topicname}
                    onClick={this.onClick}
                    id={this.props.topicNames[i].topicid}
                />);
            }
        }


        return (
            <div className="topicEntries">
                {rows}
            </div>
        );
    }
}

Topic.propTypes = {
    topicNames: PropTypes.array,
}

export default Topic