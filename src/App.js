import "./App.css";
import data from "./data.json";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

function App() {
  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);
  const [save, setSave] = useState(false);
  const [addContacts, setAddContacts] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  useEffect(() => {
    const newContacts = JSON.parse(localStorage.getItem("newContacts"));
    if (newContacts) {
      setContacts(newContacts);
    }
  }, []);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newContacts = { ...addContacts };
    newContacts[fieldName] = fieldValue;

    setAddContacts(newContacts);
  };
  const inputSubmitHandler = (e) => {
    e.preventDefault();

    const newContact = {
      id: Math.random(),
      fullName: addContacts.fullName,
      address: addContacts.address,
      phoneNumber: addContacts.phoneNumber,
      email: addContacts.email,
    };
    const newContacts = [...contacts, newContact];
    localStorage.setItem("newContacts", JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const editRowHandle = (e, contact) => {
    e.preventDefault();
    setEditContactId(contact.id);
  };

  const deleteRowHandle = (e, contact) => {
    e.preventDefault();

    const index = contacts.indexOf(contact);
    const deleted = contacts.splice(index, 1);
    const newContacts = contacts.filter((contact) => contact.id !== deleted.id);
    localStorage.removeItem("newContacts");
    setContacts(newContacts);
  };

  const saveEditRowHande = (e) => {
    e.preventDefault();
    setSave(true);
    setEditContactId(null);
  };
  const inputUpdateHandler = (e, contact) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    if (save) {
      if (fieldName === "fullName") {
        contact.fullName = fieldValue;
      }
      if (fieldName === "address") {
        contact.address = fieldValue;
      }
      if (fieldName === "phoneNumber") {
        contact.phoneNumber = fieldValue;
      }
      if (fieldName === "email" && fieldValue.includes("@")) {
        contact.email = fieldValue;
      }
    }
  };
  return (
    <div className="App-container">
      <form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  <EditableRow
                    setSave={setSave}
                    inputUpdateHandler={inputUpdateHandler}
                    saveEditRowHande={saveEditRowHande}
                    setEditContactId={setEditContactId}
                    contact={contact}
                  />
                ) : (
                  <ReadOnlyRow
                    editContactId={editContactId}
                    deleteRowHandle={deleteRowHandle}
                    editRowHandle={editRowHandle}
                    contact={contact}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add contacts</h2>
      <form onSubmit={inputSubmitHandler}>
        <input
          type="text"
          required="required"
          name="fullName"
          placeholder="Enter name..."
          onChange={inputChangeHandler}
        />
        <input
          onChange={inputChangeHandler}
          type="text"
          required="required"
          name="address"
          placeholder="Enter address..."
        />
        <input
          onChange={inputChangeHandler}
          type="text"
          required="required"
          name="phoneNumber"
          placeholder="Enter phone number..."
        />
        <input
          onChange={inputChangeHandler}
          type="email"
          required="required"
          name="email"
          placeholder="Enter email..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
