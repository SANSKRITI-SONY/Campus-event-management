import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "./Dashboard.css";
import {formatDate, formatTime,} from "../utils/formatDate.js";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function getRegistrations() {
      const response = await fetch(
        `http://localhost:5000/api/registrations/${user.id}`
      );

      const data = await response.json();

      setRegistrations(data);
    }

    if (user) {
      getRegistrations();
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back,
              <br />
              <strong>{user?.name}</strong>
            </h1>

            <p>
              Manage your registrations and keep track
              of your upcoming campus events.
            </p>
          </div>

          <div className="dashboard-profile">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-details">
              <strong>{user?.name}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-box">
            <span>REGISTERED</span>
            <strong>{registrations.length}</strong>
          </div>

          <div className="stat-box">
            <span>UPCOMING</span>
            <strong>{registrations.length}</strong>
          </div>

          <div className="stat-box">
            <span>ROLE</span>
            <strong>STUDENT</strong>
          </div>
        </section>

        <section className="dashboard-events">
          <div className="dashboard-title">
            <span>YOUR ACTIVITY</span>
            <h2>MY EVENTS</h2>
          </div>

          {registrations.length === 0 ? (
            <div className="empty-events">
              <h3>No registrations yet.</h3>
              <p>
                Explore the latest campus events and
                register for something you’re interested in.
              </p>
            </div>
          ) : (
            <div className="dashboard-event-list">
              {registrations.map((event) => (
                <article
                  className="dashboard-event"
                  key={event.registration_id}
                >
                  <div className="dashboard-event-info">
                    <span>{event.category}</span>
                    <h3>{event.title}</h3>
                    <p>{event.venue}</p>
                  </div>

                  <div className="dashboard-event-date">
                    <strong>{formatDate(event.event_date)}</strong>
                    <span>{formatTime(event.event_time)}</span>
                  </div>

                  <div className="dashboard-event-arrow">
                    →
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Dashboard;