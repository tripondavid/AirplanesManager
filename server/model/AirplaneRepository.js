class AirplaneRepository {
  constructor() {
    this._airplanes = [];
  }
  addAirplane(airplane) {
    this._airplanes.push(airplane);
  }
  deleteAirplaneById(id) {
    this._airplanes = this.airplanes.filter((airplane) => airplane.id !== id);
  }
  containsAirplaneWithId(id) {
    for (let i = 0; i < this._airplanes.length; i++) {
      if (this._airplanes[i].id === id) {
        return true;
      }
    }
    return false;
  }
  get airplanes() {
    return this._airplanes;
  }
  set airplanes(newAirplanes) {
    this._airplanes = newAirplanes;
  }
  updateAirplaneById(id, newModel, newCapacity, newType) {
    for (let i = 0; i < this._airplanes.length; i++) {
      if (this._airplanes[i].id === id) {
        this._airplanes[i].model = newModel;
        this._airplanes[i].capacity = newCapacity;
        this._airplanes[i].type = newType;
        break;
      }
    }
  }
}

module.exports = AirplaneRepository;
