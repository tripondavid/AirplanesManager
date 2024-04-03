const Airplane = require("../model/Airplane");
const AirplaneRepository = require("../model/AirplaneRepository");

const airplaneRepository = new AirplaneRepository();
var maxLength = 0;
populateAirplaneRepo();

const airplaneGet = (req, res) => {
  const airplanesToSend = prepareArrayListForSend();
  res.send(airplanesToSend);
};

const airplanePost = (req, res) => {
  const airplane = req.body.airplane;
  const newAirplane = new Airplane(
    maxLength,
    airplane.model,
    airplane.capacity,
    airplane.type
  );
  addAirplane(newAirplane);
  const airplanesToSend = prepareArrayListForSend();
  res.send(airplanesToSend);
};

const airplaneSort = (req, res) => {
  sortList();
  const airplanesToSend = prepareArrayListForSend();
  res.send(airplanesToSend);
};

const airplaneSortByType = (req, res) => {
  sortByType();
  const airplanesToSend = prepareArrayListForSend();
  res.send(airplanesToSend);
};

const airplaneDelete = (req, res) => {
  const id = parseInt(req.params.id.trim());
  if (airplaneRepository.containsAirplaneWithId(id) === false) {
    res.sendStatus(404);
    return;
  }
  deleteAirplane(id);
  const airplanesToSend = prepareArrayListForSend();
  res.send(airplanesToSend);
};

const airplaneUpdate = (req, res) => {
  const id = parseInt(req.params.id.trim());
  if (airplaneRepository.containsAirplaneWithId(id) === false) {
    res.sendStatus(404);
    return;
  }
  const model = req.params.model.trim();
  const capacity = parseInt(req.params.capacity.trim());
  const type = req.params.type.trim();

  airplaneRepository.updateAirplaneById(id, model, capacity, type);
  const airplanesToSend = prepareArrayListForSend();
  res.send(airplanesToSend);
};

const addAirplane = (newAirplane) => {
  airplaneRepository.addAirplane(newAirplane);
  maxLength += 1;
};

const deleteAirplane = (id) => {
  airplaneRepository.deleteAirplaneById(id);
};

function sortList() {
  const sortedAirplanes = airplaneRepository.airplanes.sort(
    (a, b) => a.capacity - b.capacity
  );
  airplaneRepository.airplanes = sortedAirplanes;
}

function sortByType() {
  const sortedAirplanes = airplaneRepository.airplanes.sort((a, b) =>
    a.type.localeCompare(b.type)
  );
  airplaneRepository.airplanes = sortedAirplanes;
}

function prepareArrayListForSend() {
  const airplanes = airplaneRepository.airplanes;
  return airplanes.map((airplane) => ({
    id: airplane.id,
    model: airplane.model,
    capacity: airplane.capacity,
    type: airplane.type,
  }));
}

function populateAirplaneRepo() {
  const airplane1 = new Airplane(0, "Airbus", 230, "A320");
  const airplane2 = new Airplane(1, "Boeing", 368, "777");
  const airplane3 = new Airplane(2, "Gulfstream", 19, "G800");
  maxLength = 3;
  airplaneRepository.addAirplane(airplane1);
  airplaneRepository.addAirplane(airplane2);
  airplaneRepository.addAirplane(airplane3);
}

module.exports = {
  airplaneGet,
  airplanePost,
  airplaneDelete,
  airplaneSort,
  airplaneUpdate,
  airplaneSortByType,
};
