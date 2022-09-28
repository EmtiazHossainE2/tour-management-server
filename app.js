const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

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