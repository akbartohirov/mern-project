import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onLogOut = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav style={{ padding: "0 100px" }}>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          My Links
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={(e) => onLogOut(e)}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
