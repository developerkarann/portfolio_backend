require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const Database = require('./database')
const port = process.env.PORT || 5000

Database();

app.use(cors({
  origin: true,
  // origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json())

app.use('/api', require('./routes/Contact'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/hello', (req, res) => {
  res.send('Hello World, This is Karan !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
