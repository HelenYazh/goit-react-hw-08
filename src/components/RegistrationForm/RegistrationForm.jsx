import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../ContactForm/ContactForm.module.css";
import { register } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectAuthError } from "../../redux/auth/selectors";

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("User name is required")
    .min(2, "Username must be at least 2 characters long")
    .max(30, "Username must be less than 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters long")
    .max(30, "Password must be less than 30 characters"),

  email: Yup.string()
    .email("Invalid e-mail address")
    .required("Email address is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={RegisterValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <label className={css.label}>
            <span>Username:</span>
            <Field type="text" name="name" placeholder="Olena" />
            <ErrorMessage
              className={css.errorText}
              name="name"
              component="span"
            />
          </label>
          <label className={css.label}>
            <span>Email:</span>
            <Field type="text" name="email" placeholder="example@gmail.com" />
            <ErrorMessage
              className={css.errorText}
              name="email"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={css.errorText}
              name="password"
              component="span"
            />
          </label>

          <button
            disabled={Object.keys(errors).length > 0}
            className={css.submitBtn}
            type="submit"
          >
            Sign up
          </button>
          {error && (
            <p className={css.errorText}>Oops, some error occured... {error}</p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
