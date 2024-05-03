const db = require("../database/DatabaseManager");

const airplaneGet = async (req, res) => {
  const airplanes = await db.getAirplanes();
  res.send(airplanes);
};

const airplanesGetSortedByCapacity = async (req, res) => {
  const airplanesSortedByCapacity = await db.getAirplanesSortedByCapacity();
  res.send(airplanesSortedByCapacity);
};

const airplanesGetSortedByType = async (req, res) => {
  const airplanesSortedByType = await db.getAirplanesSortedByType();
  res.send(airplanesSortedByType);
};

const airplaneUpdate = async (req, res) => {
  const id = parseInt(req.params.id);
  const model = req.body.model;
  const capacity = parseInt(req.body.capacity);
  const type = req.body.type;
  const updatedPlane = await db.updateAirplane(id, model, capacity, type);

  res.send(updatedPlane);
};

const airplaneAdd = async (req, res) => {
  const model = req.body.model;
  const capacity = req.body.capacity;
  const type = req.body.type;
  const addedAirplane = await db.addAirplane(model, capacity, type);

  res.send(addedAirplane);
};

const airplaneDelete = async (req, res) => {
  const id = parseInt(req.params.id.trim());
  const numberOfAffectedRows = await db.deleteAirplane(id);

  if (numberOfAffectedRows > 0) {
    res.send({ id: id });
  } else {
    res.sendStatus(404);
  }
};

const flightsGetById = async (req, res) => {
  const airplaneId = parseInt(req.params.airplaneId.trim());
  const flights = await db.getFlightsByAirplaneId(airplaneId);

  res.send(flights);
};

const flightAdd = async (req, res) => {
  const airplaneId = req.body.airplaneId;
  const destination = req.body.destination;
  const departureTime = req.body.departureTime;
  const arrivalTime = req.body.arrivalTime;
  const addedFlight = await db.addFlight(
    airplaneId,
    destination,
    departureTime,
    arrivalTime
  );

  res.send(addedFlight);
};

const flightDelete = async (req, res) => {
  const flightId = req.params.id;

  const numberOfAffectedRows = await db.deleteFlight(flightId, airplaneId);

  if (numberOfAffectedRows > 0) {
    res.send({ id: flightId });
  } else {
    res.sendStatus(404);
  }
};

const deleteAll = async (req, res) => {
  await db.deleteAll();
  res.send(200);
};

module.exports = {
  airplaneGet,
  airplanesGetSortedByCapacity,
  airplanesGetSortedByType,
  airplaneUpdate,
  airplaneAdd,
  airplaneDelete,
  flightsGetById,
  flightAdd,
  flightDelete,
  deleteAll,
};
