const express = require ("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("api is working fine ")
})

app.listen(3000,()=>{
    console.log(`api is working fineeee`)
})