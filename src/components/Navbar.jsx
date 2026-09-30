import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <span>CAMPUS</span>
        <span>/24</span>
      </Link>

      <nav className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
        <a href="/#events" onClick={closeMenu}>Events</a>
        <a href="/#schedule" onClick={closeMenu}>Schedule</a>
        <a href="/#about" onClick={closeMenu}>About</a>
        <a href="/#registration" onClick={closeMenu}>Register</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>

        <div className="mobile-menu-actions">
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="signup-button"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="login-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="signup-button" onClick={closeMenu}>
                Sign Up
              </Link>
              <Link to="/login" className="login-button" onClick={closeMenu}>
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="navbar-actions">
        {user ? (
          <>
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              className="signup-button"
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className="login-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="signup-button">Sign Up</Link>
            <Link to="/login" className="login-button">Login</Link>
          </>
        )}
      </div>

      <button
        type="button"
        className="menu-button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "CLOSE" : "MENU"}
      </button>
    </header>
  );
}

export default Navbar;
