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
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});

describe("Airplane Routes", () => {
  it("POST /delete/${airplaneId} should respond with 200", async () => {
    const airplaneId = 0;
    var response = await request(app).delete(`/delete/${airplaneId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    response = await request(app).delete(`/delete/${airplaneId}`);
    expect(response.status).toBe(404);
  });
});
