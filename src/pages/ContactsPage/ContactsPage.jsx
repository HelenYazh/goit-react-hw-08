import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import EditForm from "../../components/EditForm/EditForm";
import { useSelector } from "react-redux";
import { selectCurrentContact } from "../../redux/contacts/selectors";

const ContactsPage = () => {
  const currentContact = useSelector(selectCurrentContact);

  return (
    <div>
      {currentContact ? <EditForm /> : <ContactForm />}

      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
