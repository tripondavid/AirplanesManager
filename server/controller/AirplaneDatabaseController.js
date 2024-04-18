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
  const model = req.body.airplane.model;
  const capacity = parseInt(req.body.airplane.capacity);
  const type = req.body.airplane.type;
  const airplanesWithUpdatedPlane = await db.updateAirplane(
    id,
    model,
    capacity,
    type
  );

  res.send(airplanesWithUpdatedPlane);
};

const airplaneAdd = async (req, res) => {
  const airplane = req.body.airplane;
  const model = airplane.model;
  const capacity = airplane.capacity;
  const type = airplane.type;
  const airplanes = await db.addAirplane(model, capacity, type);

  res.send(airplanes);
};

const airplaneDelete = async (req, res) => {
  const id = parseInt(req.params.id.trim());
  const airplanes = await db.deleteAirplane(id);

  res.send(airplanes);
};

const flightsGetById = async (req, res) => {
  const airplaneId = parseInt(req.params.airplaneId.trim());
  const flights = await db.getFlightsByAirplaneId(airplaneId);

  res.send(flights);
};

const flightAdd = async (req, res) => {
  const flight = req.body.flight;
  const airplaneId = flight.airplaneId;
  const destination = flight.destination;
  const departureTime = flight.departureTime;
  const arrivalTime = flight.arrivalTime;
  const flights = await db.addFlight(
    airplaneId,
    destination,
    departureTime,
    arrivalTime
  );

  res.send(flights);
};

const flightDelete = async (req, res) => {
  const flightId = req.params.id;
  const airplaneId = req.body.airplaneFlightsId;

  const flights = await db.deleteFlight(flightId, airplaneId);

  res.send(flights);
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
};
