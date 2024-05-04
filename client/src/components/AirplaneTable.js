import { useState } from "react";
import "./AirplaneTable.css";
import "./EditAirplane";
import EditAirplane from "./EditAirplane";
import FlightModal from "./FlightModal";

function AirplaneTable({
  airplanes,
  deleteHandler,
  updateHandler,
  startIndex,
  endIndex,
}) {
  const [updateId, setUpdateId] = useState(-1);
  //const slicedAirplanes = airplanes.slice(startIndex, endIndex);
  const [flightModal, setFlightModal] = useState(false);
  const [airplaneFlightsId, setAirplaneFlightsId] = useState(-1);

  const toggleModal = (airplaneId) => {
    if (flightModal === true) {
      setAirplaneFlightsId(-1);
    } else {
      setAirplaneFlightsId(airplaneId);
    }
    setFlightModal(!flightModal);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Model</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airplanes.map((airplane) =>
            airplane.id === updateId ? (
              <EditAirplane
                updateId={updateId}
                currModel={airplane.model}
                currCapacity={airplane.capacity}
                currType={airplane.type}
                setUpdateId={setUpdateId}
                onUpdateHandler={updateHandler}
              />
            ) : (
              <tr key={airplane.id}>
                <td>{airplane.model}</td>
                <td>{airplane.capacity}</td>
                <td>{airplane.type}</td>
                <td className="td-map">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => toggleModal(airplane.id)}
                  >
                    Modify Flights
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setUpdateId(airplane.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(airplane.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div>
        {flightModal && (
          <FlightModal
            toggleModal={toggleModal}
            airplaneFlightsId={airplaneFlightsId}
          />
        )}
      </div>
    </>
  );
}

export default AirplaneTable;
