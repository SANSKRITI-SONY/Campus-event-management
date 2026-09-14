import { useEffect, useState } from "react";
import "./Events.css";
import {
  formatDate,
  formatTime,
} from "../utils/formatDate.js";

function Events() {
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await fetch(
          "https://campus-event-backend-a97k.onrender.com/api/events"
        );

        const data = await response.json();

        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }

    getEvents();
  }, []);

  async function registerForEvent(eventId) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        "https://campus-event-backend-a97k.onrender.com/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            event_id: eventId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong.");
    }
  }

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText) ||
      event.venue.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "ALL" ||
      event.category.toUpperCase() === category;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "ALL",
    ...new Set(
      events.map((event) =>
        event.category.toUpperCase()
      )
    ),
  ];

  return (
    <section
      className="events-section"
      id="events"
    >
      <div className="section-heading">
        <div>
          <span className="section-label">
            02 — EVENTS
          </span>

          <h2>
            WHAT'S
            <br />
            HAPPENING.
          </h2>
        </div>

        <p>
          Find competitions, workshops,
          <br />
          cultural events and more.
        </p>
      </div>

      {/* SEARCH + FILTER */}

      <div className="event-controls">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* EVENTS */}

      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div className="no-events-found">
            <p>
              No events match your search.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <article
              className="event-item"
              key={event.id}
            >
              <div className="event-date">
                {formatDate(event.event_date)}
              </div>

              <div className="event-info">
                <span>
                  {event.category}
                </span>

                <h3>{event.title}</h3>

                <p>
                  {event.venue} ·{" "}
                  {formatTime(event.event_time)}
                </p>
              </div>

              <button
                className="register-event-button"
                onClick={() =>
                  registerForEvent(event.id)
                }
              >
                REGISTER →
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Events;