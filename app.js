
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const getRoutes = require('./routes/routers');

app.use(bodyParser.json());
app.use('/',getRoutes);

app.listen(8080,()=>{
    console.log("runnnin on port :8080");
});

