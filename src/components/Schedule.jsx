import "./Schedule.css";

const schedule = [
  {
    time: "09:00",
    title: "Opening Ceremony",
    type: "MAIN EVENT",
    location: "Main Auditorium",
  },
  {
    time: "11:00",
    title: "Tech Workshop",
    type: "WORKSHOP",
    location: "Lecture Hall 3",
  },
  {
    time: "14:00",
    title: "Case Competition",
    type: "COMPETITION",
    location: "LT Block",
  },
  {
    time: "17:30",
    title: "Battle of Bands",
    type: "CULTURAL",
    location: "Amphitheatre",
  },
];

function Schedule() {
  return (
    <section className="schedule-section" id="schedule">
      <div className="schedule-heading">
        <span className="section-label">03 — SCHEDULE</span>

        <h2>
          THE DAY,
          <br />
          AT A GLANCE.
        </h2>
      </div>

      <div className="schedule-list">
        {schedule.map((item) => (
          <div className="schedule-item" key={item.time}>
            <div className="schedule-time">
              {item.time}
            </div>

            <div className="schedule-details">
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.location}</p>
            </div>

            <div className="schedule-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Schedule;