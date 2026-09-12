import "./Contact.css";

function Contact() {
  return (
    <>
      <section className="contact-section" id="contact">
        <div className="contact-label">
          <span>06 — CONTACT</span>
        </div>

        <div className="contact-content">
          <div>
            <h2>
              GOT A
              <br />
              QUESTION?
              <br />
              <span>LET'S TALK.</span>
            </h2>
          </div>

          <div className="contact-details">
            <p>
              Need help with an event, registration,
              or something else?
            </p>

            <a href="mailto:events@nsut.ac.in">
              events@nsut.ac.in →
            </a>

            <p className="contact-location">
              NSUT, Dwarka
              <br />
              New Delhi
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>CAMPUS/24</div>

        <div>BUILT FOR NSUT STUDENTS</div>

        <div>© 2026</div>
      </footer>
    </>
  );
}

export default Contact;