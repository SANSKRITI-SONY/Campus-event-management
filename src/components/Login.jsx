import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
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
      "https://campus-event-backend-a97k.onrender.com/api/auth/login",
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
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Login successful.");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <main className="login-page">
      <div className="login-intro">
        <div className="login-top">
          <span>07 — ACCOUNT</span>
          <span>NSUT / 2026</span>
        </div>

        <div className="login-heading">
          <p>WELCOME BACK</p>

          <h1>
            CAMPUS
            <br />
            <span>/24</span>
          </h1>

          <h2>
            PICK UP
            <br />
            WHERE YOU LEFT OFF.
          </h2>
        </div>

        <div className="login-bottom">
          <span>DISCOVER · PARTICIPATE · CONNECT</span>
        </div>
      </div>

      <div className="login-form-area">
        <div className="login-form-header">
          <span>LOGIN</span>

          <h2>Welcome back.</h2>

          <p>
            Sign in to register for events
            and manage your participation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">
              01 / EMAIL
            </label>

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

          <div className="login-field">
            <label htmlFor="password">
              02 / PASSWORD
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-submit">
            LOGIN
            <span>→</span>
          </button>
        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="login-signup">
          Don't have an account?
          <Link to="/signup"> Sign up →</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;