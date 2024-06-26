const db = require("../database/DatabaseManager");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (
    username === undefined ||
    password === undefined ||
    username === "" ||
    password === ""
  ) {
    res.sendStatus(400);
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err === true) {
        console.log(err);
        res.sendStatus(400); //TODO: think about a better response
        return;
      }
      db.addUser(username, hash).then((success) => {
        if (success) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      });
    });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (
    username === undefined ||
    password === undefined ||
    username === "" ||
    password === ""
  ) {
    res.sendStatus(400);
  } else {
    db.getUserPassword(username).then((result) => {
      if (result.length === 0) {
        res.sendStatus(404);
        return;
      }
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      });
    });
  }
};

const checkLogin = async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

module.exports = {
  register,
  login,
  checkLogin,
};
