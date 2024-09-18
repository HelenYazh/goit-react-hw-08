import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { useDispatch, useSelector } from "react-redux";
import css from "./ContactList.module.css";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <ul className={css.list}>
      {filteredContacts?.length === 0 && <li>Contacts list is empty</li>}
      {filteredContacts.map((contact) => {
        return (
          <li className={css.listItem } key={contact.id}>
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
