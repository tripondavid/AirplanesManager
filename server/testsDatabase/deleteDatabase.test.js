const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Import your routes
const airplaneRoutes = require("../routes/airplanesRoutes");

// Create a new instance of Express application
const app = express();

// Add middleware
app.use(
  cors({
    methods: "GET,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Use your routes
app.use("/", airplaneRoutes);

describe("Airplane Routes", () => {
  it("GET / should respond with 200", async () => {
    await request(app).delete("/deleteAll");
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});

describe("Airplane Routes", () => {
  it("POST /add/plane should respond with 200", async () => {
    await request(app).delete("/deleteAll");
    const airplane = { model: "Cessna", capacity: 2, type: "Type A" };
    const response = await request(app).post("/add/plane").send({ airplane });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    const airplaneId = response.body[0].id;
    const response2 = await request(app).delete(`/delete/${airplaneId}`);
    expect(response2.status).toBe(200);
    expect(response2.body.length).toBe(0);
  });
});
