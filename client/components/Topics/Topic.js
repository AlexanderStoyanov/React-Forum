import React from 'react';
import PropTypes from 'prop-types';
import TopicEntry from '../common/TopicEntry';

class Topic extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var rows = [];
        
        if (this.props.topicNames) {
            for (var i = 0; i < this.props.topicNames.length; i++) {
                rows.push(<TopicEntry
                    key={i}
                    topicName={this.props.topicNames[i].topicname}
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