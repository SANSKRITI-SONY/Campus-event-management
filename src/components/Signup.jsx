import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      "https://campus-event-backend-a97k.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Account created successfully.");

      setUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setMessage(data.message);
    }
  }

  return (
    <main className="signup-page">
      <div className="signup-intro">
        <div className="signup-top">
          <span>06 — ACCOUNT</span>
          <span>NSUT / 2026</span>
        </div>

        <div className="signup-heading">
          <p>WELCOME TO</p>

          <h1>
            CAMPUS
            <br />
            <span>/24</span>
          </h1>

          <h2>YOUR CAMPUS, IN ONE PLACE.</h2>
        </div>

        <div className="signup-bottom">
          <span>DISCOVER · PARTICIPATE · CONNECT</span>
        </div>
      </div>

      <div className="signup-form-area">
        <div className="signup-form-header">
          <span>CREATE ACCOUNT</span>

          <h2>Sign up</h2>

          <p>
            Create your student account to register
            for events and manage your participation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="signup-field">
            <label htmlFor="name">01 / FULL NAME</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">02 / EMAIL</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">03 / PASSWORD</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-submit">
            CREATE ACCOUNT
            <span>→</span>
          </button>
        </form>

        {message && (
          <p className="signup-message">
            {message}
          </p>
        )}

        <p className="signup-login">
          Already have an account?
          <Link to="/login"> Login →</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;