import React from 'react';
import { PropTypes } from 'prop-types';
import TextFieldGroup from './TextFieldGroup';

const AddField = ({ error, onChange, onSubmit, back, value, field, type }) => {
    return (
        <div className="addField">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="editBlock mt-5">
                        <form onSubmit={onSubmit} >
                            <TextFieldGroup
                                error={error}
                                label={"Add" + {type}}
                                onChange={onChange}
                                value={value}
                                field={field}
                                type="text"
                            />
                            <button type="submit" className="btn btn-primary m-1">Add {type}</button>
                            <button onClick={back} className="btn btn-dark m-1">Back</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddField.propTypes = {
    error: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default AddField;