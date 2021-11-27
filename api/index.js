import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

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
const TOKEN = 'Punks not dead!';

app.use((req, res, next) => {
  console.log(req.headers.authorization);

  function verifyUser(err, payload) {
    console.log(err);
    console.log(payload);

    if (err) next();
    else if (payload) {
      const user = USERS.find(u => u.login === payload.login);
      if (user) {
        req.user = user;
      }
      next();
    }
  }

  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      TOKEN,
      verifyUser
    );
  }

  next();
})

app.get('/', (req, res) => {
  res.send('Express API');
});

app.post('/auth', (req, res) => {
  const login = req.body?.login;
  const password = req.body?.password;

  if (!login || !password) {
    res.status(400).send('No login and password provided');
    return;
  }

  const user = USERS.find(u => u.login === login && u.password === password);

  if (!user) {
    res.status(400).send('No user with this login and password found.');
    return;
  }

  res.status(200).json({
    login: user.login,
    name: user.fullName,
    token: jwt.sign({ login: user.login, admin: user.admin }, TOKEN),
  });
});
app.get('/me', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

app.get('/admins', (req, res) => {
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
