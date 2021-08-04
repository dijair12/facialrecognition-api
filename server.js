const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extends: true
}));
app.use(bodyParser.json());

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
      password: 'ace456',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.json('This is working')
})

app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password){
      res.json({message: "success"})
    }else{
      res.status(400).json({message: "error loggin in"})
    }
})

app.post('/register', (req, res) => {

  const {name, email, password} = req.body;

  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })

  res.json(database.users[database.users.length-1])

})

app.listen(3000, ()=> [
  console.log('app is running on port 3000')
])