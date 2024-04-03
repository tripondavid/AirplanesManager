const express = require("express");
const cors = require("cors");
const app = express();
const airplaneRoutes = require("./routes/airplanesRoutes");

const corsOptions = {
  methods: "GET,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", airplaneRoutes);

app.listen(5000);
