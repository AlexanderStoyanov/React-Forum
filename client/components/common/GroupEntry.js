import React from 'react';
import TextFieldGroup from './TextFieldGroup';

const GroupEntry = ({ groupName, groupid, checked, field, onClick, onChange }) => {
    return (
        <tr>
            <th scope="row">
                {groupName}
                <button className="btn btn-secondary ml-2" title="edit" data-id={groupid} onClick={onClick}>Edit</button>
            </th>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox1" name={field} checked={checked} onChange={onChange}
                />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox2" value="deletetopics" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox3" value="editreplies" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox4" value="deletereplies" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox5" value="blocked" />
            </td>
        </tr>
    );
}

export default GroupEntry;