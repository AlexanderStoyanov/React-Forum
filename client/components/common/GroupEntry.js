import React from 'react';

const GroupEntry = ({ groupName, groupid, edittopics, deletetopics, editreplies, deletereplies, blocked, disabled, onClick, onChange }) => {
    return (
        <tr>
            <th scope="row">
                {groupName}
                <button className="btn btn-secondary ml-2" title="edit" data-id={groupid} onClick={onClick}>Edit</button>
            </th>
            <td>
                <label className="switch">
                    <input className="form-check-input position-static mx-auto"
                        type="checkbox" id="edittopicsCheckbox" disabled={disabled}
                        data-id={groupid} name="edittopics" onChange={onChange} defaultChecked={(edittopics === '1') ? true : null} />
                    <span className="slider round"></span>
                </label>
            </td>
            <td>
                <label className="switch">
                    <input className="form-check-input position-static mx-auto"
                        type="checkbox" id="deletetopicsCheckbox" disabled={disabled}
                        data-id={groupid} name="deletetopics" onChange={onChange} defaultChecked={(deletetopics === '1') ? true : null} />
                        <span className="slider round"></span>
                </label>
            </td>
            <td>
                <label className="switch">
                    <input className="form-check-input position-static mx-auto"
                        type="checkbox" id="editrepliesCheckbox" disabled={disabled}
                        data-id={groupid} name="editreplies" onChange={onChange} defaultChecked={(editreplies === '1') ? true : null} />
                        <span className="slider round"></span>
                </label>
            </td>
            <td>
                <label className="switch">
                    <input className="form-check-input position-static mx-auto"
                        type="checkbox" id="deleterepliesCheckbox" disabled={disabled}
                        data-id={groupid} name="deletereplies" onChange={onChange} defaultChecked={(deletereplies === '1') ? true : null} />
                        <span className="slider round"></span>
                </label>
            </td>
            <td>
                <label className="switch">
                    <input className="form-check-input position-static mx-auto"
                        type="checkbox" id="blockedCheckbox" disabled={disabled}
                        data-id={groupid} name="blocked" onChange={onChange} defaultChecked={(blocked === '1') ? true : null} />
                        <span className="slider round"></span>
                </label>
            </td>
        </tr >
    );
}

export default GroupEntry;