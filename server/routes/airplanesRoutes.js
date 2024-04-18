const express = require("express");
const router = express.Router();
const airplaneController = require("../controller/AirplaneController");
const airplaneDatabaseController = require("../controller/AirplaneDatabaseController");

router.get("/", airplaneDatabaseController.airplaneGet);

router.post("/add/plane", airplaneDatabaseController.airplaneAdd);

router.get(
  "/sort/capacity",
  airplaneDatabaseController.airplanesGetSortedByCapacity
);

router.get("/sort/type", airplaneDatabaseController.airplanesGetSortedByType);

router.put("/update/:id", airplaneDatabaseController.airplaneUpdate);

router.delete("/delete/:id", airplaneDatabaseController.airplaneDelete);

router.get("/flights/:airplaneId", airplaneDatabaseController.flightsGetById);

router.post("/add/flight", airplaneDatabaseController.flightAdd);

router.delete("/delete/flight/:id", airplaneDatabaseController.flightDelete);

router.delete("/deleteAll", airplaneDatabaseController.deleteAll); //test purposes

module.exports = router;
