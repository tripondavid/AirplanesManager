class Flight {
  constructor(id, airplaneId, departureTime, arrivalTime, destination) {
    this._id = id;
    this._airplaneId = airplaneId;
    this._departureTime = departureTime;
    this._arrivalTime = arrivalTime;
    this._destination = destination;
  }

  get id() {
    return this._id;
  }

  get airplaneId() {
    return this._airplaneId;
  }

  get departureTime() {
    return this._departureTime;
  }

  get arrivalTime() {
    return this._arrivalTime;
  }

  get destination() {
    return this._destination;
  }
}
