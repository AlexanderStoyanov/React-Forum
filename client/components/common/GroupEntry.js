import React from 'react';

const GroupEntry = ({ groupName, groupid, onClick, onChange }) => {
    return (
        <tr>
            <th scope="row">
                {groupName}
                <button className="btn btn-secondary ml-2" title="edit" data-id={groupid} onClick={onClick}>Edit</button>
            </th>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox1" data-id={groupid} name="edittopics" onChange={onChange}
                />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox2" data-id={groupid} name="deletetopics" onChange={onChange} />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox3" data-id={groupid} name="editreplies" onChange={onChange} />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox4" data-id={groupid} name="deletereplies" onChange={onChange} />
            </td>
            <td>
                <input className="form-check-input position-static mx-auto" type="checkbox" id="inlineCheckbox5" data-id={groupid} name="blocked" onChange={onChange} />
            </td>
        </tr>
    );
}

export default GroupEntry;