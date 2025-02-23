import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectFilters } from "../../redux/filtersSlice";

const ContactList = () => {
  // Витягуємо список контактів
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const filterData = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ul className={s.contactList}>
      {filterData.map(({ name, number, id }) => (
        <li key={id} className={s.containerContactList}>
          <Contact id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
