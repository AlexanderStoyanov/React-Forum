import React from 'react';
import { PropTypes } from 'prop-types';
import TextFieldGroup from './TextFieldGroup';

const EditField = ({ error, onChange, onSubmit, back, remove, value, field, type }) => {
    return (
        <div className="editField">
            <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={onSubmit} >
                                <TextFieldGroup
                                    error={error}
                                    label={"Edit" + {type}}
                                    onChange={onChange}
                                    value={value}
                                    field={field}
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Rename {type}</button>
                                <button onClick={back} className="btn btn-dark m-1">Back</button>
                                <button onClick={remove} className="btn btn-danger float-right m-1">Delete {type}</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
}

EditField.propTypes = {
    error: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default EditField;