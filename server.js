const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
require('./app/config/database.config');
const PORT = process.env.PORT || 3000;
const ApiRoute = require('./app/routes/userRoutes')



app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use('/api/v1', ApiRoute);

app.listen(PORT,()=>{
  console.log(`my app is running in this port ${PORT}`)
})