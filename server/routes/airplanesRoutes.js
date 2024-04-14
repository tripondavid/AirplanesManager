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

module.exports = router;
