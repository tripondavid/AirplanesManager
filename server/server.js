const express = require("express");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const airplaneRoutes = require("./routes/airplanesRoutes");

const corsOptions = {
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization",
};

const limiter = rateLimit({
  windowMs: 5000,
  max: 50,
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", airplaneRoutes);

app.listen(5000);
