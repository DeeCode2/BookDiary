import { useRef, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { UserAuth } from "../config/AuthContext.jsx";
import "../styles/Navbar.scss";
import "../App.scss";

function Navbar(props) {
  //get user auth and logout functions from config
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <nav>
      <h1>My Book Diary</h1>
      <ul>
        <li>
          <Link to={"/library"}>Library</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="yellowBtn">Logout</button>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
