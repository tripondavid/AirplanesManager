const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Import your routes
const airplaneRoutes = require("./routes/airplanesRoutes");

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
  it("POST / should respond with 200", async () => {
    var response = await request(app).get("/");
    var airplanes = response.body;
    const airplaneToModify = airplanes[2];
    expect(
      airplaneToModify.id === 2 &&
        airplaneToModify.model === "Gulfstream" &&
        airplaneToModify.capacity === 19 &&
        airplaneToModify.type === "G800"
    ).toBe(true);
    const id = 2;
    const model = "Boeing";
    const capacity = 20;
    const type = "999";
    response = await request(app).post(
      `/update/${id}/${model}/${capacity}/${type}`
    );
    expect(response.status).toBe(200);
    airplanes = response.body;
    const airplaneModified = airplanes[2];
    expect(
      airplaneModified.id === 2 &&
        airplaneModified.model === "Boeing" &&
        airplaneModified.capacity === 20 &&
        airplaneModified.type === "999"
    ).toBe(true);
  });
});
