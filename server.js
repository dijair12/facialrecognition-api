const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({
  extends: true
}));
app.use(bodyParser.json());
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'ace',
      email: 'ace@gmail.com',
      password: 'ace123',
      entries: 0,
      joined: new Date()
    },
    {
      id: '456',
      name: 'may',
      email: 'may@gmail.com',
      password: 'may123',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '123',
      hash: '',
      email: 'ace@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.json(database.users)
})

app.post('/signin', (req, res) => {

  bcrypt.compare("lee123", "$2a$10$r9BKciRy2oW8BeIUfnTf4ea4Vr1qzHIl3SpgpE3hGIZQDPjh/KAsu", function (err, result) {
    console.log('true', result)
  });
  bcrypt.compare("le123", "$2a$10$r9BKciRy2oW8BeIUfnTf4ea4Vr1qzHIl3SpgpE3hGIZQDPjh/KAsu", function (err, result) {
    console.log('false', result)
  });

  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json("success")
  } else {
    res.status(400).json({ message: "error loggin in" })
  }
})

app.post('/register', (req, res) => {

  const { name, email, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash)
  });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })

  res.json(database.users[database.users.length - 1])

})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })

  if (!found) {
    res.status(404).json("Oops")
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      res.json(user.entries)
    }
  })

  if (!found) {
    res.status(404).json("Nopp")
  }
})

app.listen(3001, () => [
  console.log('app is running on port 3001')
])