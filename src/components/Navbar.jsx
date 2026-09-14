import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span>CAMPUS</span>
        <span>/24</span>
      </Link>

      <nav className="nav-links">
        <a href="/#events">Events</a>
        <a href="/#schedule">Schedule</a>
        <a href="/#about">About</a>
        <a href="/#registration">Register</a>
        <a href="/#contact">Contact</a>
      </nav>

      <div className="navbar-actions">
        {user ? (
          <>
            <Link
              to={
                user.role === "admin"
                  ? "/admin"
                  : "/dashboard"
              }
              className="signup-button"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="login-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="signup-button"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="login-button"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;