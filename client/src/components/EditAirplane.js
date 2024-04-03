import { ChangeEvent, useState } from "react";
import "./EditAirplane.css";

function EditAirplane({
  updateId,
  currModel,
  currCapacity,
  currType,
  setUpdateId,
  onUpdateHandler,
}) {
  const [updateModel, setUpdateModel] = useState(currModel);
  const [updateCapacity, setUpdateCapacity] = useState(currCapacity);
  const [updateType, setUpdateType] = useState(currType);

  const handleChangeModel = (event) => {
    setUpdateModel(event.target.value);
  };

  const handleChangeCapacity = (event) => {
    const floatNumber = parseFloat(event.target.value);
    setUpdateCapacity(floatNumber);
  };

  const handleChangeType = (event) => {
    setUpdateType(event.target.value);
  };

  const SaveAndClose = (setUpdateId) => {
    onUpdateHandler(updateId, updateModel, updateCapacity, updateType);
    setUpdateId(-1);
  };

  const Close = (setUpdateId) => {
    setUpdateId(-1);
  };

  const handleNegativeValue = (event) => {
    if (event.key === "-") event.preventDefault();
  };

  return (
    <tr key={updateId}>
      <td>
        <input
          type="text"
          defaultValue={currModel}
          placeholder={currModel}
          onChange={handleChangeModel}
        ></input>
      </td>
      <td>
        <input
          type="number"
          defaultValue={currCapacity}
          placeholder={currCapacity.toString()}
          onKeyDown={handleNegativeValue}
          onChange={handleChangeCapacity}
        ></input>
      </td>
      <td>
        <input
          type="text"
          defaultValue={currType}
          placeholder={currType}
          onChange={handleChangeType}
        ></input>
      </td>
      <td className="edit-style">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => SaveAndClose(setUpdateId)}
        >
          Save & Close
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => Close(setUpdateId)}
        >
          Close
        </button>
      </td>
    </tr>
  );
}

export default EditAirplane;
