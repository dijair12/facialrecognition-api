const handleSignin = (req, res, db, bcrypt) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json({ data: { critics: 'unable to get user' } }))
      } else {
        res.status(400).json({ data: { critics: 'wrong credentials' } })
      }
    })
    .catch(err => res.status(400).json({ data: { critics: err } }))
}

module.exports = {
  handleSignin: handleSignin
}