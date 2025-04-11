import CartIcon from "./CartIcon";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import config from "~/config";
import CircleUser from "./CircleUser";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.body}>
          <Link to={config.routes.home}>
            <img
              src="	http://theme.hstatic.net/1000069970/1001119059/14/logo-bct-1_medium.png?v=7149"
              alt="Lesson"
              className={styles.logo}
            />
          </Link>
          <Navigation />
          <SearchForm />
          <CartIcon />
          <CircleUser />
        </div>
      </header>
    </>
  );
}
export default Header;
