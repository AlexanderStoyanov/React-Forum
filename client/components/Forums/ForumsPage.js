import React from 'react';
import Forum from './Forum';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getForums } from '../../actions/load';


class ForumsPage extends React.Component {
    render() {
        const { getForums } = this.props;
        return (
            <div className="row">
                <div className="col-md">
                    <Forum
                        getForums={getForums}
                    />
                </div>
            </div>
        );
    }
}

ForumsPage.propTypes = {
    getForums: PropTypes.func.isRequired,
}

export default connect(null, { getForums })(ForumsPage);