import { NavLink } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <NavLink to="/contacts" />
      <p>Hello, {user.name}</p>
    </div>
  );
};

export default UserMenu;
