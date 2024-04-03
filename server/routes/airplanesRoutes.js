const express = require("express");
const router = express.Router();
const airplaneController = require("../controller/AirplaneController");

router.get("/", airplaneController.airplaneGet);

router.post("/add/plane", airplaneController.airplanePost);

router.post("/sort", airplaneController.airplaneSort);

router.post("/sort/type", airplaneController.airplaneSortByType);

router.post(
  "/update/:id/:model/:capacity/:type",
  airplaneController.airplaneUpdate
);

router.delete("/delete/:id", airplaneController.airplaneDelete);

module.exports = router;
