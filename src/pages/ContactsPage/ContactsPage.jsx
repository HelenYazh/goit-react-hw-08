import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import EditForm from "../../components/EditForm/EditForm";

const ContactsPage = () => {
  return (
    <div>
      <ContactForm />
      <EditForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
