import "./Events.css";

const events = [
  {
    id: 1,
    date: "18 SEP",
    title: "HackNSUT",
    category: "TECH",
    venue: "Main Auditorium",
  },
  {
    id: 2,
    date: "21 SEP",
    title: "Case Argon",
    category: "CASE COMPETITION",
    venue: "LT Block",
  },
  {
    id: 3,
    date: "25 SEP",
    title: "Battle of Bands",
    category: "CULTURAL",
    venue: "Amphitheatre",
  },
];

function Events() {
  return (
    <section className="events-section" id="events">
      <div className="section-heading">
        <div>
          <span className="section-label">02 — EVENTS</span>
          <h2>WHAT'S<br />HAPPENING.</h2>
        </div>

        <p>
          Find competitions, workshops,
          <br />
          cultural events and more.
        </p>
      </div>

      <div className="events-list">
        {events.map((event) => (
          <article className="event-item" key={event.id}>
            <div className="event-date">
              {event.date}
            </div>

            <div className="event-info">
              <span>{event.category}</span>
              <h3>{event.title}</h3>
              <p>{event.venue}</p>
            </div>

            <button className="event-arrow">
              →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Events;