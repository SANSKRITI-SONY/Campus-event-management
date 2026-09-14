import Navbar from "../components/Navbar.jsx";
import Admin from "../components/Admin.jsx";
import "./AdminPage.css";

function AdminPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <section className="admin-welcome">
          <div>
            <span className="admin-eyebrow">
              ADMIN DASHBOARD
            </span>

            <h1>
              Welcome back,
              <br />
              <strong>{user?.name}</strong>
            </h1>

            <p>
              Manage campus events and registrations
              from one place.
            </p>
          </div>
        </section>

        <section className="admin-stats">
          <div className="admin-stat">
            <span>TOTAL EVENTS</span>
            <strong>3</strong>
          </div>

          <div className="admin-stat">
            <span>UPCOMING EVENTS</span>
            <strong>3</strong>
          </div>

          <div className="admin-stat">
            <span>REGISTRATIONS</span>
            <strong>—</strong>
          </div>
        </section>

        <Admin />
      </main>
    </>
  );
}

export default AdminPage;