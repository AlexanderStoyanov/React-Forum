import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';

class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forumName: '',
            forumRef: '123',
        };

        this.load = this.load.bind(this);
    }

    load() {
        localStorage.removeItem("hasCodeRunBefore");
        this.props.getForums().then(
            (res) => {
                if (!('hasCodeRunBefore' in localStorage)) {
                    this.setState({ forumName: res.data.ress.rows[0].forumname });
                    console.log('success');
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
            <ForumEntry
                onLoad={this.load()}
                forumName={this.state.forumName}
            />
        );
    }
}

export default withRouter(Forum)