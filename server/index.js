import express from "express";
import cors from "cors";
import db from "./db.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// --------------------
// Test backend
// --------------------

app.get("/", (req, res) => {
  res.json({
    message: "Campus Events API is running",
  });
});


// --------------------
// Test database
// --------------------

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      message: "Database connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});


// --------------------
// Events
// --------------------

app.get("/api/events", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM events"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
});


app.post("/api/events", async (req, res) => {
  const {
    title,
    description,
    category,
    event_date,
    event_time,
    venue,
    capacity,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO events
       (title, description, category, event_date, event_time, venue, capacity)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        title,
        description,
        category,
        event_date,
        event_time,
        venue,
        capacity,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create event",
    });
  }
});


// --------------------
// Signup
// --------------------

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await db.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Signup failed",
    });
  }
});


// --------------------
// Login
// --------------------

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});


// --------------------
// Event registrations
// --------------------


app.get("/api/registrations/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      `SELECT
        registrations.id AS registration_id,
        events.id AS event_id,
        events.title,
        events.category,
        events.event_date,
        events.event_time,
        events.venue
       FROM registrations
       JOIN events
       ON registrations.event_id = events.id
       WHERE registrations.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch registrations",
    });
  }
});

app.post("/api/registrations", async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO registrations (user_id, event_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, event_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message:
          "You are already registered for this event.",
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});


app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete event",
    });
  }
});

app.put("/api/events/:id", async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    category,
    event_date,
    event_time,
    venue,
    capacity,
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE events
       SET
         title = $1,
         description = $2,
         category = $3,
         event_date = $4,
         event_time = $5,
         venue = $6,
         capacity = $7
       WHERE id = $8
       RETURNING *`,
      [
        title,
        description,
        category,
        event_date,
        event_time,
        venue,
        capacity,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update event",
    });
  }
});

app.get("/api/events/:eventId/participants", async (req, res) => {
  const { eventId } = req.params;

  try {
    const result = await db.query(
      `SELECT
        users.id,
        users.name,
        users.email
       FROM registrations
       JOIN users
       ON registrations.user_id = users.id
       WHERE registrations.event_id = $1
       ORDER BY users.name`,
      [eventId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch participants",
    });
  }
});

// --------------------
// Start server
// --------------------

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});