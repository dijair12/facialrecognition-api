const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ data: 'incorrect form submission' });
  }

  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*')
          .from('users')
          .where('email', '=', email)
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