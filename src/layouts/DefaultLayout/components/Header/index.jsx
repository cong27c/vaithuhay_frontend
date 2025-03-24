import CartIcon from "./CartIcon";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";
import styles from "./Header.module.scss";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.body}>
          {/* logo */}
          <a href="#!">
            {" "}
            <img
              src="//theme.hstatic.net/1000069970/1001119059/14/logo_medium.png?v=7149"
              alt="Lesson"
              className={styles.logo}
            />
          </a>
          <Navigation />
          <SearchForm />
          <CartIcon />
          {/*  circle-User  */}
          <button className={styles.circleUser}>
            <i className="fa-solid fa-circle-user"></i>
          </button>
        </div>
      </header>
    </>
  );
}
export default Header;
