import React from 'react';
import ReplyEntry from '../common/ReplyEntry';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicId: '',
            text: '',
        }
    }


    load() {
        localStorage.removeItem("hasCodeRunBefore");
        this.props.getReplies().then(
            (res) => {
                //res is returned twice because of setState method causing this component to reload which triggers load() again.
                if (!('hasCodeRunBefore' in localStorage)) {
                    console.log(res);
                    this.setState({ text: res.data.payload[0].text });
                    localStorage.setItem("hasCodeRunBefore", true);
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