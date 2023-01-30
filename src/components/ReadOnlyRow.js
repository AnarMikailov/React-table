import React from "react";

function ReadOnlyRow({ contact, editRowHandle, deleteRowHandle }) {
  return (
    <>
      <tr>
        <td>{contact.fullName}</td>
        <td>{contact.address}</td>
        <td>{contact.phoneNumber}</td>
        <td>{contact.email}</td>
        <td>
          <button
            onClick={(e) => {
              editRowHandle(e, contact);
            }}
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              deleteRowHandle(e, contact);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default ReadOnlyRow;
