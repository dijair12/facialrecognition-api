const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '870547',
    database: 'smartbrain',
  }
});


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

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
    res.json(database.users[0])
  } else {
    res.status(400).json({ message: "error loggin in" })
  }
})

app.post('/register', (req, res) => {

  const { name, email, password } = req.body;

  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0])
    })
    .catch(err => {
      res.status(400).json({ error: 'unable register' })
    })

})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db
    .select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json({ data: { err: 'not found user' } })
      }
    })
    .catch(err => {
      res.status(400).json({ data: { err: 'error getting user' } })
    })


})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries)
    }
  })

  if (!found) {
    res.status(404).json("Nopp")
  }
})

app.listen(3001, () => [
  console.log('app is running on port 3001')
])