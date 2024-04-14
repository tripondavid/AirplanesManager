const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "FlightManager",
  })
  .promise();

async function getAirplanes() {
  const [rows] = await pool.query("SELECT * FROM Airplanes");
  return rows;
}

async function getAirplaneById(id) {
  const [row] = await pool.query(`SELECT * FROM Airplanes WHERE id = ?`, [id]);
  return row;
}

async function getAirplanesSortedByCapacity() {
  const [rows] = await pool.query("SELECT * FROM Airplanes ORDER BY capacity");
  return rows;
}

async function getAirplanesSortedByType() {
  const [rows] = await pool.query("SELECT * FROM Airplanes ORDER BY type");
  return rows;
}

async function getFlights() {
  const [rows] = await pool.query("SELECT * FROM Flights");
  return rows;
}

async function addAirplane(model, capacity, type) {
  await pool.query(
    `INSERT INTO Airplanes(model, capacity, type) VALUES (?, ?, ?)`,
    [model, capacity, type]
  );
  return getAirplanes();
}

async function updateAirplane(id, model, capacity, type) {
  await pool.query(
    `UPDATE Airplanes SET model = ?, capacity = ?, type = ? WHERE id = ?`,
    [model, capacity, type, id]
  );
  return getAirplanes();
}

async function deleteAirplane(id) {
  await pool.query(`DELETE FROM Airplanes WHERE id = ?`, [id]);

  return getAirplanes();
}

module.exports = {
  getAirplanes,
  getAirplaneById,
  getFlights,
  getAirplanesSortedByCapacity,
  getAirplanesSortedByType,
  addAirplane,
  updateAirplane,
  deleteAirplane,
};