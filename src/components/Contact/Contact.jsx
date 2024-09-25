import { FaUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <p className={css.info}>
          <FaUser />
          &nbsp;
          <b>{name}</b>
        </p>
        <p className={css.info}>
          <BsFillTelephoneFill />
          &nbsp;
          {number}
        </p>
      </div>
      <div className={css.wrapper}>
        <button onClick={() => dispatch()} type="button">
          <FaUserEdit className={css.icon} />
        </button>
        <button
          onClick={() =>
            dispatch(deleteContact(id))
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
