import "./Navbar.css";


function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">CAMPUS/24</div>

      <nav>
        <a href="#events">Events</a>
        <a href="#schedule">Schedule</a>
        <a href="#about">About</a>
        <a href="#registration">Register</a>
        <a href="#contact">Contact</a>
     </nav>

      <button className="login-button">Login</button>
    </header>
  );
}

export default Navbar;