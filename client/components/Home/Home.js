import React from 'react';
import ForumEntry from '../common/ForumEntry';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forumName: 'static name for now',
            forumRef: '123',
        }
    }



    render() {
        return (
            <div className="Home">
                <div className="row">
                    <div className="col-md">
                        <ForumEntry
                            forumName={this.state.forumName}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <ForumEntry

                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home