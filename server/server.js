const express = require("express");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const airplaneRoutes = require("./routes/airplanesRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "proba",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const limiter = rateLimit({
  windowMs: 5000,
  max: 50,
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (
    !req.cookies.userId &&
    req.path !== "/login" &&
    req.path !== "/register" &&
    req.path !== "/check/login"
  ) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

app.use("/", isLoggedIn, airplaneRoutes);

//app.use("/", airplaneRoutes);

app.listen(5000);
