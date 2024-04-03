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
    var ok = false;
    const airplanes = response.body;
    for (let i = 0; i < airplanes.length - 1; i++) {
      if (airplanes[i].type > airplanes[i + 1].type) {
        ok = true;
        break;
      }
    }
    expect(ok).toBe(true);
  });
});

describe("Airplane Routes", () => {
  it("POST / should respond with 200", async () => {
    const response = await request(app).post("/sort/type");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    const airplanes = response.body.length;
    for (let i = 0; i < airplanes.length - 1; i++) {
      expect(airplanes[i].type <= airplanes[i + 1].type).toBe(true);
    }
  });
});
