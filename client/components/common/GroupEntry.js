import React from 'react';

const GroupEntry = ({ groupName, groupid, onClick }) => {
    return (
        <tr>
            <th scope="row">
                {groupName}
                <button className="btn btn-secondary ml-2" title="edit" data-id={groupid} onClick={onClick}>Edit</button>
            </th>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox1" value="option1" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox2" value="option2" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox3" value="option3" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox3" value="option3" />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox3" value="option3" />
            </td>
        </tr>
    );
}

export default GroupEntry;