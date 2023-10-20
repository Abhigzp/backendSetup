const mongoose = require ('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/appdb')
  .then(() => {
    console.log('data base Connected!')
  } )
  .catch((error)=>{
    console.log(` database not connected,${error}`)
  })