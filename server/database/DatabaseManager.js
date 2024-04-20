const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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

async function getFlightsByAirplaneId(airplaneId) {
  const [rows] = await pool.query(`SELECT* FROM Flights WHERE airplaneId = ?`, [
    airplaneId,
  ]);
  return rows;
}

async function addFlight(airplaneId, destination, departureTime, arrivalTime) {
  await pool.query(
    `INSERT INTO Flights(airplaneId, destination, departureTime, arrivalTime) VALUES (?, ?, ?, ?)`,
    [airplaneId, destination, departureTime, arrivalTime]
  );

  return getFlightsByAirplaneId(airplaneId);
}

async function deleteFlight(flightId, airplaneId) {
  await pool.query(`DELETE FROM Flights WHERE id = ?`, [flightId]);

  return getFlightsByAirplaneId(airplaneId);
}

async function deleteAll() {
  //for test purposes

  await pool.query("DELETE FROM Airplanes");
  return getAirplanes();
}

//accounts related

async function findUser(username, password) {
  const [result] = await pool.query(
    `SELECT * FROM Users where username = ? AND password = ?`,
    [username, password]
  );
  if (result.length === 0) {
    return false;
  }
  return true;
}

async function getUserPassword(username) {
  const [result] = await pool.query(
    `SELECT password FROM Users where username = 4`,
    [username]
  );
  return result;
}

async function addUser(username, password) {
  const [result] = await pool.query(`SELECT * FROM Users where username = ?`, [
    username,
  ]);
  if (result.length !== 0) {
    return false;
  }
  await pool.query(`INSERT INTO Users (username, password) VALUES (?, ?)`, [
    username,
    password,
  ]);
  return true;
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
  getFlightsByAirplaneId,
  addFlight,
  deleteFlight,
  deleteAll,
  addUser,
  findUser,
  getUserPassword,
};
