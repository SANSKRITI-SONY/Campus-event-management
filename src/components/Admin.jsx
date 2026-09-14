import { useEffect, useState } from "react";
import "./Admin.css";
import { formatDate, formatTime } from "../utils/formatDate.js";

function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    event_date: "",
    event_time: "",
    venue: "",
    capacity: "",
  });

  const [editingEvent, setEditingEvent] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await fetch(
          "https://campus-event-backend-a97k.onrender.com/api/events"
        );

        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }

    getEvents();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setEvent({
      ...event,
      [name]: value,
    });
  }

  function startEditing(selectedEvent) {
    setEditingEvent(selectedEvent);

    setEvent({
      title: selectedEvent.title,
      description: selectedEvent.description,
      category: selectedEvent.category,
      event_date: selectedEvent.event_date,
      event_time: selectedEvent.event_time,
      venue: selectedEvent.venue,
      capacity: selectedEvent.capacity,
    });

    setShowForm(true);
  }

  function cancelEditing() {
    setEditingEvent(null);

    setEvent({
      title: "",
      description: "",
      category: "",
      event_date: "",
      event_time: "",
      venue: "",
      capacity: "",
    });

    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const url = editingEvent
      ? `https://campus-event-backend-a97k.onrender.com/api/events/${editingEvent.id}`
      : "https://campus-event-backend-a97k.onrender.com/api/events";

    const method = editingEvent ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();

      if (response.ok) {
        if (editingEvent) {
          setEvents(
            events.map((item) =>
              item.id === editingEvent.id
                ? data
                : item
            )
          );

          alert("Event updated successfully.");
        } else {
          setEvents([...events, data]);

          alert("Event created successfully.");
        }

        setEvent({
          title: "",
          description: "",
          category: "",
          event_date: "",
          event_time: "",
          venue: "",
          capacity: "",
        });

        setEditingEvent(null);
        setShowForm(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Something went wrong.");
    }
  }

  async function deleteEvent(eventId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `https://campus-event-backend-a97k.onrender.com/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(
          events.filter(
            (event) => event.id !== eventId
          )
        );

        if (selectedEvent?.id === eventId) {
          setSelectedEvent(null);
          setParticipants([]);
        }

        alert("Event deleted successfully.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Something went wrong.");
    }
  }

  async function viewParticipants(event) {
    if (selectedEvent?.id === event.id) {
      setSelectedEvent(null);
      setParticipants([]);
      return;
    }

    try {
      const response = await fetch(
        `https://campus-event-backend-a97k.onrender.com/api/events/${event.id}/participants`
      );

      const data = await response.json();

      if (response.ok) {
        setSelectedEvent(event);
        setParticipants(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(
        "Failed to fetch participants:",
        error
      );

      alert("Something went wrong.");
    }
  }

  return (
    <section className="admin-section">
      {/* HEADER */}

      <div className="admin-section-header">
        <div>
          <span>EVENT MANAGEMENT</span>

          <h2>YOUR EVENTS</h2>
        </div>

        {!editingEvent && (
          <button
            className="create-event-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? "CLOSE FORM"
              : "CREATE EVENT →"}
          </button>
        )}
      </div>

      {/* CREATE / EDIT FORM */}

      {showForm && (
        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <h3>
            {editingEvent
              ? "EDIT EVENT"
              : "CREATE NEW EVENT"}
          </h3>

          <input
            name="title"
            placeholder="Event title"
            value={event.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={event.description}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={event.category}
            onChange={handleChange}
            required
          />

          <div className="admin-form-row">
            <input
              type="date"
              name="event_date"
              value={event.event_date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="event_time"
              value={event.event_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-row">
            <input
              name="venue"
              placeholder="Venue"
              value={event.venue}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={event.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              className="save-event-button"
            >
              {editingEvent
                ? "SAVE CHANGES →"
                : "SAVE EVENT →"}
            </button>

            {editingEvent && (
              <button
                type="button"
                className="cancel-event-button"
                onClick={cancelEditing}
              >
                CANCEL
              </button>
            )}
          </div>
        </form>
      )}

      {/* EVENT LIST */}

      <div className="admin-event-list">
        {events.length === 0 ? (
          <div className="no-events">
            <p>No events available.</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id}>
              <article className="admin-event">
                <div className="admin-event-main">
                  <span>{event.category}</span>

                  <h3>{event.title}</h3>

                  <p>{event.venue}</p>
                </div>

                <div className="admin-event-date">
                  <span>
                    {formatDate(event.event_date)}
                  </span>

                  <span>
                    {formatTime(event.event_time)}
                  </span>
                </div>

                <div className="admin-event-actions">
                  <button
                    className="participants-event-button"
                    onClick={() =>
                      viewParticipants(event)
                    }
                  >
                    {selectedEvent?.id === event.id
                      ? "HIDE"
                      : "PARTICIPANTS"}
                  </button>

                  <button
                    className="edit-event-button"
                    onClick={() =>
                      startEditing(event)
                    }
                  >
                    EDIT
                  </button>

                  <button
                    className="delete-event-button"
                    onClick={() =>
                      deleteEvent(event.id)
                    }
                  >
                    DELETE
                  </button>
                </div>
              </article>

              {/* PARTICIPANTS */}

              {selectedEvent?.id === event.id && (
                <div className="participants-panel">
                  <div className="participants-header">
                    <span>REGISTERED STUDENTS</span>

                    <strong>
                      {participants.length} participant
                      {participants.length !== 1
                        ? "s"
                        : ""}
                    </strong>
                  </div>

                  {participants.length === 0 ? (
                    <p className="no-participants">
                      No students have registered yet.
                    </p>
                  ) : (
                    <div className="participants-list">
                      {participants.map(
                        (participant, index) => (
                          <div
                            className="participant"
                            key={participant.id}
                          >
                            <span>
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <strong>
                              {participant.name}
                            </strong>

                            <p>
                              {participant.email}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Admin;