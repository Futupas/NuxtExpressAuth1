'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const USERS = [
  {
    login: 'u1',
    password: '1',
    fullName: 'Egor',
    admin: true,
  }, {
    login: 'u2',
    password: '1',
    fullName: 'Misha',
    admin: false,
  }, {
    login: 'u3',
    password: '1',
    fullName: 'Anton',
    admin: false,
  }
];
const TOKEN = 'Punks not dead!'; // Secret (private) key
const APP_PORT = 3000;

const app = express();
app.use(express.static('static_nuxt'));
app.use(express.json());
app.use((req, res, next) => {
  function verifyUser(err, payload) {
    if (!err && payload) {
      req.user = USERS.find(u => u.login === payload.login);
    }
  }

  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1], // 'Bearer tra.tatatataa.taa'
      TOKEN,
      verifyUser
    );
  }

  next();
});

// GET /api
app.get('/api', (req, res) => {
  res.send('Express API');
});

// POST /api/auth
app.post('/api/auth', (req, res) => {
  const login = req.body?.login;
  const password = req.body?.password;

  const user = USERS.find(u => u.login === login && u.password === password);

  if (!user) {
    res.status(401).send('No user with provided credentials found.');
    return;
  }

  res.status(200).json({
    login: user.login,
    name: user.fullName,
    token: jwt.sign({ login: user.login, admin: user.admin }, TOKEN, { expiresIn: '1h' }),
  });
});

// GET /api/me
app.get('/api/me', (req, res) => {
  if (req.user) {
    res.status(200).json({
      login: req.user.login,
      fullName: req.user.fullName,
      admin: req.user.admin,
    });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

// GET /api/secret
app.get('/api/secret', (req, res) => {
  if (req.user?.admin) {
    res.status(200).json({
      fbiControl: true,
      freeNavalny: false,
      kosovoIsAState: {
        problem: 'yes'
      },
    });
  } else {
    res.status(401).send();
  }
});

// GET /api/tin
app.get('/api/tin', (req, res) => {
  res.send('1234567890');
});

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
