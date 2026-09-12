import "./Registration.css";

function Registration() {
  return (
    <section className="registration-section" id="registration">
      <div className="registration-label">
        <span>05 — REGISTER</span>
      </div>

      <div className="registration-content">
        <div className="registration-heading">
          <h2>
            READY TO
            <br />
            <span>SHOW UP?</span>
          </h2>

          <p>
            Pick an event, enter your details,
            <br />
            and save your spot.
          </p>
        </div>

        <form className="registration-form">
          <div className="form-group">
            <label htmlFor="name">FULL NAME</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="event">SELECT EVENT</label>
            <select id="event">
              <option value="">Choose an event</option>
              <option value="hacknsut">HackNSUT</option>
              <option value="case-argon">Case Argon</option>
              <option value="battle-of-bands">
                Battle of Bands
              </option>
            </select>
          </div>

          <button type="submit" className="register-button">
            REGISTER →
          </button>
        </form>
      </div>
    </section>
  );
}

export default Registration;