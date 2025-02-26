import { FaUser, FaPhoneAlt } from "react-icons/fa";
import s from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.containerContact}>
      <div className={s.row}>
        <p className={s.paragraph}>
          <FaUser className={s.icon} />
          {name}
        </p>
        <p className={s.paragraph}>
          <FaPhoneAlt className={s.icon} />
          {number}
        </p>
      </div>
      <button
        className={s.btnDelete}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
