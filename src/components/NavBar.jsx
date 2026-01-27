import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HRMS</div>

      <div className="nav-links">
        <Link to="/employees" className="nav-link">
          Home
        </Link>
        <Link to="/attendance" className="nav-link">
          Attendance
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
