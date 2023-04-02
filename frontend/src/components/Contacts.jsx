import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Contacts({ contacts, currentUser, changeCurrentChat }) {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");

  useEffect(() => {
    if (currentUser) {
      const filtered = contacts.filter((item) => item.username !== currentUser.username);
      setFilteredContacts(filtered);
    }
  }, [contacts, currentUser]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchedContact = filteredContacts.filter((value) =>
    value.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClick = (i, contact) => {
    setCurrentSelected(i);
    changeCurrentChat(contact);
  }

  return (
    <div className="contacts">
      <div className="searchBar">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </div>
      <div className="list">
      {searchedContact.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div>
          {searchedContact.map((item, i) => (
            <li
              key={item._id}
              onClick={() => handleClick(i, item)}
              className={`contactList ${currentSelected === i ? "selected" : ""}`}
            >
              <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt="" />

              {item.username}
            </li>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
