const express = require ("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("api is working fine node is working  ")
})

app.listen(3000,()=>{
    console.log(`api is working fine on 3000` )
})