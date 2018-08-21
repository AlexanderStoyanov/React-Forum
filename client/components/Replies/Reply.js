import React from 'react';
import ReplyEntry from '../common/ReplyEntry';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'bla this is text bla bla',
        }
    }

    render() {
        return (
            <div className="Reply">
                <ReplyEntry
                    text={this.state.text}
                />
            </div>
        );
    }
}

export default Reply