if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({
   limit: '10mb',
   extended: false
}))

mongoose.connect(process.env.DB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('✅ Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT ?? 3000, () => {
   console.log(`👂 Listening at http://localhost:${process.env.PORT ?? 3000}`)
})