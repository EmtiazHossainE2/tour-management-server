const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Set Middle wares  */
app.use(cors());
app.use(express.json());

// Routes 
const tourRoute = require('./routes/v1/tour.router.js')

// Use v1 Api
app.use('/userRecord' , tourRoute)


/* Testing api  */
app.get('/', (req, res) => {
  res.send('Server is running')
})

/* Not Found Routes */
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "No Route Found " });
});

/* Server Error Routes */
app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ success: false, message: "Something Broken of your API" });
});

module.exports = app;