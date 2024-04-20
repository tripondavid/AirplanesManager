const db = require("../database/DatabaseManager");

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || password === undefined) {
    res.sendStatus(400);
  } else {
    try {
      db.addUser(username, password);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(400);
    }
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || password === undefined) {
    res.sendStatus(400);
  } else {
    if (db.findUser(username, password) === true) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
};

module.exports = {
  register,
  login,
};
