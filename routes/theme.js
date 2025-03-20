const express = require('express')
const router = express.Router()

router.post('/set', (req, res) => {
  const { theme } = req.body
  if (theme === 'light' || theme === 'dark') {
    res.cookie('theme', theme, { maxAge: 3600000 })
    res.redirect('/')
  } else {
    res.redirect('/')
  }
})

module.exports = router
