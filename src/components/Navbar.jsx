import { NavLink } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">

        <FaFilm />

        <span>Netflix Lite</span>

      </div>

      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/favorites">
          Favorites
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;