import React from 'react';
import ReplyEntry from '../common/ReplyEntry';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        var rows = [];

        if (this.props.replies) {
            for (var i = 0; i < this.props.replies.length; i++) {
                rows.push(<ReplyEntry
                    key={i}
                    text={this.props.replies[i].text}
                />);
            }
        }
        return (
            <div className="reply">
                {rows}
            </div>
        );
    }
}

export default Reply