const express = require('express')
const app = express()

const Routes = require('./routes.js')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use("/", Routes)



app.listen(3000, () => {
    console.log(`server started`)
  })