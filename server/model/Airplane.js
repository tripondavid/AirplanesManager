class Airplane {
  constructor(id, model, capacity, type) {
    this._id = id;
    this._model = model;
    this._capacity = capacity;
    this._type = type;
  }

  get id() {
    return this._id;
  }

  get model() {
    return this._model;
  }

  get capacity() {
    return this._capacity;
  }

  get type() {
    return this._type;
  }

  set id(newId) {
    this._id = newId;
  }

  set model(newModel) {
    this._model = newModel;
  }

  set capacity(newCapacity) {
    this._capacity = newCapacity;
  }

  set type(newType) {
    this._type = newType;
  }
}

module.exports = Airplane;
