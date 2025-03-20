require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const authRoutes = require('./routes/auth')
const themeRoutes = require('./routes/theme')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index', { theme: req.cookies.theme || 'light' })
})

app.use('/auth', authRoutes)
app.use('/theme', themeRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
