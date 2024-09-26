import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "../LoginForm/LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { selectCurrentContact } from "../../redux/contacts/selectors";
import { setCurrentContact } from "../../redux/contacts/slice";

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Name is required!"),
  number: Yup.string()
    .matches(phoneRegExp, "Must be 'xxx-xxx-xxxx' format")
    .required("A phone number is required!"),
});

const EditForm = () => {
  const currentContact = useSelector(selectCurrentContact);
  const dispatch = useDispatch();
  const initialValues = {
    name: currentContact.name,
    number: currentContact.number,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const updateContact = {
          id: currentContact.id,
          name: values.name,
          number: values.number,
        };

        dispatch(editContact(updateContact))
          .unwrap()
          .then(() => {
            toast.success("Contact edited successfully🎉");
            resetForm();
          });
      }}
      validationSchema={formValidationSchema}
    >
      <Form className={css.wrapper}>
        <label>
          <span>Name</span>
          <Field type="text" name="name" placeholder="Olena" />
          <ErrorMessage
            className={css.errorText}
            name="name"
            component="span"
          />
        </label>

        <label>
          <span>Number</span>
          <Field type="tel" name="number" placeholder="xxx-xxx-xxxx" />
          <ErrorMessage
            className={css.errorText}
            name="number"
            component="span"
          />
        </label>
        <div className={css.editBtns}>
          <button type="submit">Edit contact</button>
          <button
            type="button"
            onClick={() => dispatch(setCurrentContact(null))}
          >
            Cancel editing
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditForm;
