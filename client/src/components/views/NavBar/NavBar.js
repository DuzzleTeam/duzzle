import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserMenu from "./Sections/UserMenu";
import styles from "./Sections/nav-bar.module.css";

function Navbar() {
  // user info
  const user = useSelector((state) => state.user.authPayload);

  return (
    // Nav 최상위 컨테이너
    <nav className={styles.navigation}>
      <div className={styles.defaultMenu}>
        <Link to="/">
          <img src="/logo.png" alt="Duzzle Logo" />
        </Link>
        <ul className={styles.list}>
          <li>
            <Link to="/wezzle">위즐</Link>
          </li>
          <li>
            <Link to="/mezzle">미즐</Link>
          </li>
        </ul>
      </div>

      {isExistUser(user) && user.isAuthenticated ? (
        <UserMenu />
      ) : (
        <Link to="/login" className={styles.login}>
          로그인
        </Link>
      )}
    </nav>
  );
}

const isExistUser = (user) => {
  return user !== undefined;
};

export default Navbar;
