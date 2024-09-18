import { NavLink } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={css.wrapper}>
      <NavLink to="/contacts" />
      <p>Hello, {user.name}</p>
      <button className={css.btn} type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
