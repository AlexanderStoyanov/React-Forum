import React from 'react';
import ReplyEntry from '../common/ReplyEntry';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            t: 0,
        }
    }

    
    load() {
        this.props.getReplies().then(
            (res) => {
                //res is returned twice (needs fixing). Also, t (terminator) is not the most elegant solution => needs fixing too.
                //Although, this method successfully retrieves replies from db.
                console.log(res);
                if (this.state.t === 0) {
                    this.setState({ text: res.data.payload[0].text, t: 1 });
                }
            },
            (err) => {
                console.log('error');
            }
        );
    }

    render() {
        return (
            <div className="reply" onLoad={this.load()}>
                <ReplyEntry
                    text={this.state.text}
                />
            </div>
        );
    }
}

export default Reply