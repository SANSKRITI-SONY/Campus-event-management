import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-label">
        <span>04 — ABOUT</span>
      </div>

      <div className="about-content">
        <h2>
          CAMPUS IS
          <br />
          MORE THAN
          <br />
          <span>CLASSROOMS.</span>
        </h2>

        <div className="about-text">
          <p>
            CAMPUS/24 brings the events happening around NSUT
            into one place.
          </p>

          <p>
            From technical competitions and workshops to cultural
            nights and student-led initiatives — discover what is
            happening, register, and be part of it.
          </p>

          <div className="about-stats">
            <div>
              <strong>50+</strong>
              <span>EVENTS</span>
            </div>

            <div>
              <strong>20+</strong>
              <span>CLUBS</span>
            </div>

            <div>
              <strong>01</strong>
              <span>PLATFORM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;