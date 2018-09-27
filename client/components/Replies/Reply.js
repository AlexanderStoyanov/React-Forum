import React from 'react';
import ReplyEntry from '../common/ReplyEntry';

class Reply extends React.Component {
    render() {
        var rows = [];

        if (this.props.replies) {
            for (var i = 0; i < this.props.replies.length; i++) {
                rows.push(<ReplyEntry
                    key={i}
                    text={this.props.replies[i]}
                    firstname={this.props.names[i]}
                    date={this.props.dates[i]}
                />);
            }
        }
        return (
            <div className="reply mt-5">
                {rows}
            </div>
        );
    }
}

export default Reply