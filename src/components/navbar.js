import styles from "./css-modules/navbar.module.css";
import icon1 from "../resources/assets/option1.png";
import { Link } from "react-router-dom";

function Navbar({ heading, sub_heading }) {
  return (
    <nav className={styles.navbar_container}>
      <Link
        className={styles.logo}
        to="/"
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <div>
          <h1 className={styles.heading}>{heading}</h1>
          <h2 className={styles.sub_heading}>{sub_heading}</h2>
        </div>
      </Link>
      <div className={styles.social_icons}>
        <img alt="" className={styles.nav_icon} src={icon1} />
      </div>
    </nav>
  );
}

export default Navbar;
