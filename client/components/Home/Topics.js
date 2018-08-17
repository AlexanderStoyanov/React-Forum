import React from 'react';
import TopicEntry from '../common/TopicEntry';

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="Topics">
                <div className="row">
                    <div className="col-md">
                        <TopicEntry />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <TopicEntry />
                    </div>
                </div>
            </div>
        );
    }
}

export default Topics