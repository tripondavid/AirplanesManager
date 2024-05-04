import { useState, useEffect } from "react";
import "./MainWindow.css";
import "./AirplaneTable";
import AirplaneTable from "./AirplaneTable";
import PieChart from "./PieChart";

function MainWindow() {
  const inputs = document.querySelectorAll("input");
  const [airplanes, setAirplanes] = useState([{}]);
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [type, setType] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await checkLoginStatus();
      if (loggedIn) {
        refreshAirplanesList();
      }
    };

    fetchData();
  }, [loggedIn]);

  const checkLoginStatus = async () => {
    fetch("/check/login", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn !== true) {
          window.location.href = "/login";
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
  };

  const refreshAirplanesList = async () => {
    fetch("http://localhost:5000", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (endIndex === 0) {
          setEndIndex(pageSize < data.length ? pageSize : data.length);
        }
        setAirplanes(data);
      });
  };

  const handleChangeModel = (event) => {
    setModel(event.target.value);
  };

  const handleChangeCapacity = (event) => {
    const floatNumber = parseFloat(event.target.value);
    setCapacity(floatNumber);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleNegativeValue = (event) => {
    if (event.key === "-") event.preventDefault();
  };

  const handleAddPlane = () => {
    fetch("/add/plane", {
      method: "POST",
      body: JSON.stringify({
        model: model,
        capacity: capacity,
        type: type,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(refreshAirplanesList);

    inputs.forEach((input) => (input.value = ""));
  };

  const handleDelete = (airplaneId) => {
    fetch(`/delete/${airplaneId}`, {
      method: "DELETE",
      body: JSON.stringify({
        airplaneId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(refreshAirplanesList);
  };

  const handleUpdate = (updateId, updateModel, updateCapacity, updateType) => {
    fetch(`/update/${updateId}`, {
      method: "PUT",
      body: JSON.stringify({
        model: updateModel,
        capacity: updateCapacity,
        type: updateType,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(refreshAirplanesList);
  };

  const handleSort = () => {
    fetch("/sort/capacity", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAirplanes(data));
  };

  const handleSortByType = () => {
    fetch("/sort/type", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAirplanes(data));
  };

  const handlePrevPage = () => {
    const updateStartIndex = startIndex - pageSize;
    setStartIndex(updateStartIndex);
    const updateEndIndex = updateStartIndex + pageSize;
    setEndIndex(updateEndIndex);
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    const updateStartIndex = startIndex + pageSize;
    setStartIndex(updateStartIndex);
    const updateEndIndex =
      endIndex + pageSize < airplanes.length
        ? endIndex + pageSize
        : airplanes.length;
    setEndIndex(updateEndIndex);
    setPageNumber(pageNumber + 1);
  };

  const handlePageSize = (event) => {
    const size = parseInt(event.target.value);
    setStartIndex(0);
    setPageNumber(1);
    setPageSize(size);
    const updateEndIndex = size < airplanes.length ? size : airplanes.length;
    setEndIndex(updateEndIndex);
  };

  const updateButtonStatus = () => {
    if (startIndex > 0) {
      setIsPrevDisabled(false);
    } else {
      setIsPrevDisabled(true);
    }
    if (endIndex >= airplanes.length) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  };

  useEffect(() => updateButtonStatus());

  return (
    <>
      <div className="input-div">
        <div>
          <label>Airplane Model:</label>
          <input
            type="text"
            className="input-style"
            placeholder="Airplane Model..."
            onKeyDown={handleNegativeValue}
            onChange={handleChangeModel}
          />
        </div>

        <div>
          <label>Airplane Capacity:</label>
          <input
            type="number"
            className="input-style"
            placeholder="Airplane Capacity..."
            onChange={handleChangeCapacity}
          />
        </div>

        <div>
          <label>Airplane Type:</label>
          <input
            type="text"
            className="input-style"
            placeholder="Airplane Type..."
            onChange={handleChangeType}
          />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddPlane}
        >
          Insert the Airplane
        </button>

        <button type="button" className="btn btn-warning" onClick={handleSort}>
          Sort by Capacity
        </button>

        <button
          type="button"
          className="btn btn-warning"
          onClick={handleSortByType}
        >
          Sort by Type
        </button>
      </div>

      <div className="airplane-table">
        <AirplaneTable
          airplanes={airplanes}
          deleteHandler={handleDelete}
          updateHandler={handleUpdate}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>

      {/*
      <div className="pagination-div">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNextPage}
          disabled={isNextDisabled}
        >
          Next
        </button>
        <p className="font-weight-light">Page: {pageNumber}</p>
        <select role="select" onChange={(event) => handlePageSize(event)}>
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
      </div>
  */}

      <div id="pie-chart" style={{ width: 700 }}>
        <PieChart airplanes={airplanes} />
      </div>
    </>
  );
}

export default MainWindow;
