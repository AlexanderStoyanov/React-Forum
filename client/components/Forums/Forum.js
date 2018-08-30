import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';

class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forumName: [],
        };

        this.load = this.load.bind(this);
    }

    load() {
        //hasCodeRunBefore makes getForums() run only once when /forum directory is loaded
        localStorage.removeItem("hasCodeRunBefore");
        this.props.getForums().then(
            (res) => {
                if (!('hasCodeRunBefore' in localStorage)) {
                    console.log(res);
                    //populating forumName array to use it to get all forum names
                    for (let i = 0; i < res.data.payload.length; i++) {
                        this.setState(prevState => ({
                            forumName: [...prevState.forumName, res.data.payload[i].forumname]
                        }));
                    }
                    localStorage.setItem("hasCodeRunBefore", true);
                }
            },
            (err) => {
                console.log('error');
            }
        );
    }



    render() {
        var rows = [];
        for (var i = 0; i < this.state.forumName.length; i++) {
            rows.push(<ForumEntry
                key={i}
                forumName={this.state.forumName[i]}
                forumURL={this.state.forumName[i]}
            />);
        }

        return (
            <div onLoad={this.load()}>
                {rows}
            </div>
        );
    }
}

export default withRouter(Forum)