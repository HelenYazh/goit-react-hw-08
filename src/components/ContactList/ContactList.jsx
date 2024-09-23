import Contact from "../Contact/Contact";
import {
  selectContacts,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";
import { useDispatch, useSelector } from "react-redux";
import css from "./ContactList.module.css";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      {contacts?.length === 0 ? (
        <h3 className={css.text}>Contacts list is empty</h3>
      ) : (
        <ul className={css.list}>
          {filteredContacts.length > 0 ? (
            <>
              {filteredContacts.map((contact) => {
                return (
                  <li className={css.listItem} key={contact.id}>
                    <Contact
                      key={contact.id}
                      id={contact.id}
                      name={contact.name}
                      number={contact.number}
                    />
                  </li>
                );
              })}
            </>
          ) : (
            <h3>No contacts were found for your request</h3>
          )}
        </ul>
      )}
    </>
  );
};

export default ContactList;
