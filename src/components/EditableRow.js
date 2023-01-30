import React from "react";
import data from "../data.json";
function EditableRow({
  setEditContactId,
  saveEditRowHande,
  contact,
  inputUpdateHandler,
}) {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          name="fullName"
          placeholder="Enter name..."
          onChange={(e) => {
            inputUpdateHandler(e, contact);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          name="address"
          placeholder="Enter address..."
          onChange={(e) => {
            inputUpdateHandler(e, contact);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          name="phoneNumber"
          placeholder="Enter phone number..."
          onChange={(e) => {
            inputUpdateHandler(e, contact);
          }}
        />
      </td>
      <td>
        <input
          type="email"
          required="required"
          name="email"
          placeholder="Enter email..."
          onChange={(e) => {
            inputUpdateHandler(e, contact);
          }}
        />
      </td>
      <td>
        <button
          onClick={(e) => {
            saveEditRowHande(e, contact);
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setEditContactId(null);
          }}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default EditableRow;
