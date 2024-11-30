import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "../LoginForm/LoginForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  phoneNumber: "",
};

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Name is required!"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Must be 'xxx-xxx-xxxx' format")
    .required("A phone number is required!"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const contactObject = {
      name: values.name,
      phoneNumber: values.phoneNumber,
    };

    dispatch(addContact(contactObject))
      .unwrap()
      .then(() => {
        toast.success("Contact added successfully🎉");
      });

    actions.resetForm();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
            <Field type="tel" name="phoneNumber" placeholder="xxx-xxx-xxxx" />
            <ErrorMessage
              className={css.errorText}
              name="phoneNumber"
              component="span"
            />
          </label>

          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
