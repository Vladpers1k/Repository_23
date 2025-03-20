const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()
const SECRET = process.env.JWT_SECRET || 'supersecretkey'

router.post('/login', (req, res) => {
  const { username } = req.body
  if (!username) return res.status(400).json({ error: 'Username required' })

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })

  res.cookie('token', token, { httpOnly: true })
  res.json({ message: 'Logged in successfully' })
})

router.get('/protected', (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' })
    res.json({ message: `Hello, ${decoded.username}!` })
  })
})

module.exports = router
