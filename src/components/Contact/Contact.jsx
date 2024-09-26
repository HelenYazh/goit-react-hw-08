import { FaUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { setCurrentContact } from "../../redux/contacts/slice";

const Contact = (contact) => {
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <p className={css.info}>
          <FaUser />
          &nbsp;
          <b>{contact.name}</b>
        </p>
        <p className={css.info}>
          <BsFillTelephoneFill />
          &nbsp;
          {contact.number}
        </p>
      </div>
      <div className={css.wrapper}>
        <button
          onClick={() => dispatch(setCurrentContact(contact))}
          type="button"
        >
          <FaUserEdit className={css.icon} />
        </button>
        <button
          onClick={() =>
            dispatch(deleteContact(contact.id))
              .unwrap()
              .then(() => {
                toast.success("Contact deleted successfully🎉");
              })
          }
          type="button"
        >
          <MdDeleteForever className={css.icon} />
        </button>
      </div>
    </>
  );
};

export default Contact;
