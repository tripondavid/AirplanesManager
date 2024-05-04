import { useEffect, useState } from "react";
import "./FlightModal.css";

function FlightModal({ toggleModal, airplaneFlightsId }) {
  const inputs = document.querySelectorAll("input");
  const [flights, setFlights] = useState([{}]);
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  useEffect(() => {
    refreshFlights();
  }, []);

  const refreshFlights = () => {
    fetch(`http://localhost:5000/flights/${airplaneFlightsId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setFlights(data);
      });
  };

  const handleChangeDestination = (event) => {
    setDestination(event.target.value);
  };

  const handleChangeDepartureTime = (event) => {
    setDepartureTime(event.target.value);
  };

  const handleChangeArrivalTime = (event) => {
    setArrivalTime(event.target.value);
  };

  const handleAddFlight = () => {
    fetch("/add/flight", {
      method: "POST",
      body: JSON.stringify({
        airplaneId: airplaneFlightsId,
        destination: destination,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(refreshFlights);

    inputs.forEach((input) => (input.value = ""));
  };

  const handleDeleteFlight = (flightId) => {
    fetch(`/delete/flight/${flightId}`, {
      method: "DELETE",
      body: JSON.stringify({
        flightId,
        airplaneFlightsId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(refreshFlights);
  };

  return (
    <>
      <div className="flight-modal">
        <div className="flight-overlay"></div>
        <div className="flight-modal-content">
          <div className="input-flight">
            <input
              type="text"
              className="input-style"
              placeholder="Destination..."
              onChange={handleChangeDestination}
            />
            <input
              type="text"
              className="input-style"
              placeholder="Departure Time..."
              onChange={handleChangeDepartureTime}
            />
            <input
              type="text"
              className="input-style"
              placeholder="Arrival Time..."
              onChange={handleChangeArrivalTime}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddFlight}
            >
              Add
            </button>
          </div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id}>
                    <td>{flight.destination}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.arrivalTime}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteFlight(flight.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            id="flight-close-modal"
            onClick={toggleModal}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default FlightModal;
