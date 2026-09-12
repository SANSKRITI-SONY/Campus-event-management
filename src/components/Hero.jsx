import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-top">
        <span>NSUT CAMPUS EVENTS</span>
        <span>2026 / 27</span>
      </div>

      <div className="hero-content">
        <h1>
          EVENTS THAT
          <br />
          MAKE CAMPUS
          <br />
          <span>MOVE.</span>
        </h1>

        <p>
          Discover what’s happening around campus.
          <br />
          Find your people. Show up. Take part.
        </p>
      </div>

      <div className="hero-bottom">
        <span>01 — DISCOVER</span>

        <a href="#events">
          Explore events →
        </a>
      </div>
    </section>
  );
}

export default Hero;