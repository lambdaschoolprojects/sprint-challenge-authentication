const axios = require('axios');
const bcrypt = require('bcrypt');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig');
const tokenService = require("../auth/tokenService");

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

/**
 * Endpoint to register a new user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function register(req, res) {
  // implement user registration
  let { password } = req.body;
  let user;

  password = bcrypt.hashSync(password, 10);
  user = { ...req.body, password };

  try {
    const result = await db('users').insert(user);
    if (result)
      return res.status(201).json({ message: "User created" });

    return res.status(400).json({ message: "Something went wrong." });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

/**
 * Endpoint for logging in a user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function login(req, res) {
  // implement user login
  const { username, password } = req.body;

  try {
    const user = await db('users').where({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenService.generateToken(user);
      res.status(200).json({
        message: "Login successful",
        token
      });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
