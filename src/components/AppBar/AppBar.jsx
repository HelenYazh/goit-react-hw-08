import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.appBar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
