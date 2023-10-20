const mongoose = require ('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB_PORT)
  .then(() => {
    console.log('data base Connected!')
  } )
  .catch((error)=>{
    console.log(` database not connected,${error}`)
  })