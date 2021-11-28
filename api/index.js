'use strict';

import express from 'express';
import jwt from 'jsonwebtoken';
import USERS from './users';
const TOKEN = 'Punks not dead!'; // Secret (private) key

const app = express();
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
app.get('/', (req, res) => {
  res.send('Express API');
});

// POST /api/auth
app.post('/auth', (req, res) => {
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
    token: jwt.sign({ login: user.login, admin: user.admin }, TOKEN, { expiresIn: '1m' }),
  });
});

// GET /api/me
app.get('/me', (req, res) => {
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
app.get('/secret', (req, res) => {
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

export default app;
