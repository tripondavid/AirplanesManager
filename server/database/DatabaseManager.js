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
  let insertedAirplane;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    await connection.query(
      `INSERT INTO Airplanes(model, capacity, type) VALUES (?, ?, ?)`,
      [model, capacity, type]
    );
    const [result] = await connection.query("SELECT LAST_INSERT_ID() as id");
    const lastInsertId = result[0].id;

    await connection.commit();

    insertedAirplane = await getAirplaneById(lastInsertId);
  } catch (err) {
    console.log("error add2");
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }

  return insertedAirplane;
}

async function updateAirplane(id, model, capacity, type) {
  await pool.query(
    `UPDATE Airplanes SET model = ?, capacity = ?, type = ? WHERE id = ?`,
    [model, capacity, type, id]
  );
  return getAirplaneById(id);
}

async function deleteAirplane(id) {
  let affectedRows = 0;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      `DELETE FROM Airplanes WHERE id = ?`,
      [id]
    );
    affectedRows = result.affectedRows;

    await connection.commit();
  } catch (error) {
    console.error("Error deleting airplane:", error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return affectedRows; //TODO: change in controller the behavior
}

async function getFlightsByAirplaneId(airplaneId) {
  const [rows] = await pool.query(`SELECT* FROM Flights WHERE airplaneId = ?`, [
    airplaneId,
  ]);
  return rows;
}

async function addFlight(airplaneId, destination, departureTime, arrivalTime) {
  let insertedFlight;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    await connection.query(
      `INSERT INTO Flights(airplaneId, destination, departureTime, arrivalTime) VALUES (?, ?, ?, ?)`,
      [airplaneId, destination, departureTime, arrivalTime]
    );
    const [result] = await connection.query("SELECT LAST_INSERT_ID() as id");
    const lastInsertId = result[0].id;

    await connection.commit();

    insertedFlight = await getFlightById(lastInsertId);
  } catch (err) {
    console.log("error add2");
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }

  return insertedFlight;
}

async function getFlightById(flightId) {
  const [row] = await pool.query(`SELECT * FROM Flights WHERE id = ?`, [
    flightId,
  ]);
  return row;
}

async function deleteFlight(flightId) {
  let affectedRows = 0;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      `DELETE FROM Flights WHERE id = ?`,
      [flightId]
    );
    affectedRows = result.affectedRows;

    await connection.commit();
  } catch (error) {
    console.error("Error deleting flight:", error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return affectedRows;
}

//for test purposes
async function deleteAll() {
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
  const [result] = await pool.query(`SELECT * FROM Users where username = ?`, [
    username,
  ]);
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
