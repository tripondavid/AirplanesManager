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

module.exports = {
  airplaneGet,
  airplanesGetSortedByCapacity,
  airplanesGetSortedByType,
  airplaneUpdate,
  airplaneAdd,
  airplaneDelete,
};
