const db = require("../database/DatabaseManager");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || password === undefined) {
    res.sendStatus(400);
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        res.sendStatus(400); //think about a better response
        return;
      }

      if (db.addUser(username, hash) === true) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || password === undefined) {
    res.sendStatus(400);
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        res.sendStatus(400); //think about a better response
        return;
      }

      if (db.findUser(username, hash) === true) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  }
};

module.exports = {
  register,
  login,
};
